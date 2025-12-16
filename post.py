import asyncio
from playwright.async_api import async_playwright

async def safe_click(page, selector, description="", timeout=5000):
    """
    Safely clicks a button and logs the action.
    """
    try:
        button = await page.wait_for_selector(selector, timeout=timeout)
        text = await button.inner_text()
        aria_label = await button.get_attribute("aria-label")
        print(f"DEBUG: Clicking [{description}] -> Text: '{text}', Aria-label: '{aria_label}'")
        await button.click()
        await asyncio.sleep(1)  # small delay after click
        return button
    except Exception as e:
        print(f"⚠️ Could not click [{description}] ({selector}): {e}")
        return None

async def wait_for_modal_ready(page, description="modal", timeout=10000):
    """
    Wait for modal to be stable and ready for interaction.
    """
    print(f"⏳ Waiting for {description} to be ready...")
    await asyncio.sleep(2)  # Allow modal animation to complete
    try:
        await page.wait_for_load_state("networkidle", timeout=timeout)
    except:
        pass  # Continue even if networkidle times out

async def linkedin_post(email: str, password: str, caption_text: str, file_path: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,
            args=['--disable-blink-features=AutomationControlled']
        )

        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ignore_https_errors=True
        )

        page = await context.new_page()

        try:
            # --- Login ---
            print("🔐 Logging in...")
            await page.goto("https://www.linkedin.com/login", wait_until="domcontentloaded")
            await page.fill("input#username", email)
            await page.fill("input#password", password)
            await safe_click(page, "button[type='submit']", "Login button")
            await page.wait_for_load_state("networkidle", timeout=60000)
            await asyncio.sleep(2)

            # --- Navigate to feed ---
            print("🏠 Opening feed...")
            await page.goto("https://www.linkedin.com/feed/", wait_until="domcontentloaded")
            await asyncio.sleep(3)

            # --- Start post modal ---
            print("✏️ Starting a new post...")
            start_post_selectors = [
                "button.share-box-feed-entry__trigger",
                "button[aria-label*='Start a post']",
                "button:has-text('Start a post')"
            ]
            for selector in start_post_selectors:
                try:
                    await page.wait_for_selector(selector, timeout=5000)
                    await safe_click(page, selector, "Start post")
                    break
                except:
                    continue
            else:
                await page.screenshot(path="linkedin_debug.png")
                raise Exception("Could not find 'Start a post' button.")
            
            await wait_for_modal_ready(page, "post modal")

            # --- Add caption ---
            print("📝 Adding caption text...")
            caption_area = await page.wait_for_selector("div.ql-editor", timeout=5000)
            await caption_area.click()
            await caption_area.fill(caption_text)
            await asyncio.sleep(1)

            # --- Upload media ---
            print(f"🖼 Uploading media: {file_path}")
            media_button_selector = "button[aria-label*='Add a photo'], button[aria-label*='Add media']"
            async with page.expect_file_chooser() as fc_info:
                await safe_click(page, media_button_selector, "Media button")
            file_chooser = await fc_info.value
            await file_chooser.set_files(file_path)
            print("✅ Media file set")

            # --- HANDLE MEDIA EDITOR MODAL ---
            print("🎨 Waiting for media editor...")
            await asyncio.sleep(2)
            
            # Wait for media editor to appear
            editor_selectors = [
                "button:has-text('Next')",
                "button:has-text('Done')",
                "button[aria-label*='Next']",
                "button[aria-label*='Done']"
            ]
            
            editor_button = None
            for selector in editor_selectors:
                try:
                    editor_button = await page.wait_for_selector(selector, timeout=5000, state="visible")
                    if editor_button:
                        button_text = await editor_button.inner_text()
                        print(f"✅ Media editor opened, found button: '{button_text}'")
                        await safe_click(page, selector, f"Media editor {button_text} button")
                        print(f"✅ Clicked {button_text} button in media editor")
                        break
                except:
                    continue
            
            if not editor_button:
                print("⚠️ No media editor button found, checking if preview is visible...")
                # Check if we're already back at main modal
                try:
                    await page.wait_for_selector(
                        "div.share-media-preview, img[alt*='preview']",
                        timeout=5000,
                        state="visible"
                    )
                    print("✅ Media preview visible in main modal")
                except:
                    print("❌ Could not confirm media editor or preview")
                    await page.screenshot(path="linkedin_media_editor_error.png")
            
            # --- Wait for return to main post modal ---
            print("⏳ Waiting for main post modal...")
            await wait_for_modal_ready(page, "main post modal")
            
            # Verify we're back at the main modal with media preview
            try:
                await page.wait_for_selector(
                    "div.share-media-preview, img[alt*='preview']",
                    timeout=10000,
                    state="visible"
                )
                print("✅ Back at main post modal with media preview")
            except:
                print("⚠️ Could not verify media preview in main modal")

            # --- SKIP VISIBILITY SETTING (temporary) ---
            # LinkedIn defaults to "Anyone" in most cases
            # Uncomment below if you need to set visibility explicitly
            """
            print("🔓 Setting visibility to 'Anyone'...")
            visibility_selector = "button[aria-label*='Who can see your post']"
            try:
                visibility_button = await page.query_selector(visibility_selector)
                if visibility_button:
                    await safe_click(page, visibility_selector, "Visibility dropdown")
                    await asyncio.sleep(1)
                    
                    anyone_option = await page.query_selector("li:has-text('Anyone'), span:has-text('Anyone')")
                    if anyone_option:
                        await safe_click(page, "li:has-text('Anyone'), span:has-text('Anyone')", "Select Anyone")
                        print("✅ Visibility set to Anyone")
                        await asyncio.sleep(1)
            except Exception as e:
                print(f"⚠️ Could not set visibility: {e}")
            """

            # --- Click POST ---
            print("📤 Clicking POST button...")
            await asyncio.sleep(1)  # Brief pause before final action
            
            post_button_selectors = [
                "button.share-actions__primary-action:has-text('Post')",
                "button:has-text('Post'):not(:has-text('Repost'))",
                "button[aria-label*='Post']"
            ]
            
            post_clicked = False
            for selector in post_button_selectors:
                try:
                    post_button = await page.wait_for_selector(selector, timeout=5000, state="visible")
                    if post_button:
                        # Verify button is enabled
                        is_disabled = await post_button.is_disabled()
                        if not is_disabled:
                            await safe_click(page, selector, "POST button")
                            post_clicked = True
                            print("✅ POST clicked")
                            break
                        else:
                            print(f"⚠️ POST button found but disabled: {selector}")
                except:
                    continue
            
            if not post_clicked:
                await page.screenshot(path="linkedin_post_button_error.png")
                raise Exception("Could not find or click POST button")

            # --- Confirm post success ---
            print("⏳ Verifying post submission...")
            await asyncio.sleep(2)
            
            success = False
            try:
                # Look for success toast notification
                await page.wait_for_selector(
                    "div[role='alert']:has-text('post'), div.artdeco-toast-item--visible",
                    timeout=10000
                )
                print("🎉 Post confirmed by LinkedIn toast notification")
                success = True
            except:
                print("⚠️ No toast notification, checking if modal closed...")
                try:
                    # Check if post modal is gone
                    await page.wait_for_selector(
                        "[role='dialog']",
                        state="detached",
                        timeout=10000
                    )
                    print("✅ Modal closed, post likely successful")
                    success = True
                except:
                    print("❌ Modal still open, post may have failed")
                    await page.screenshot(path="linkedin_post_final_state.png")
            
            if success:
                # Additional verification: check feed for new post
                await asyncio.sleep(3)
                print("🔍 Checking feed for new post...")
                await page.reload(wait_until="domcontentloaded")
                await asyncio.sleep(2)
                print("✅ Feed reloaded. Please verify post manually.")

        except Exception as e:
            print(f"❌ Error occurred: {e}")
            await page.screenshot(path="linkedin_error.png")
            print("Error screenshot saved as linkedin_error.png")
            raise

        finally:
            print("🔚 Closing browser in 5 seconds...")
            await asyncio.sleep(5)
            await browser.close()


# Example usage
asyncio.run(
    linkedin_post(
        email="mohsinamir6789@gmail.com",
        password="silpi123456",
        caption_text="Hello LinkedIn, this is my automated post 🚀",
        file_path=r"C:\Users\sbato\OneDrive\Desktop\linkedin\backend\linkedin_error.png"
    )
)
