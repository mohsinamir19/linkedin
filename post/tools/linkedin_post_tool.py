import asyncio
import json
import os
from playwright.async_api import async_playwright

async def safe_click(page, selector, description="", timeout=5000):
    """Safely clicks a button and logs the action."""
    try:
        button = await page.wait_for_selector(selector, timeout=timeout)
        text = await button.inner_text()
        aria_label = await button.get_attribute("aria-label")
        print(f"DEBUG: Clicking [{description}] -> Text: '{text}', Aria-label: '{aria_label}'")
        await button.click()
        await asyncio.sleep(1)
        return button
    except Exception as e:
        print(f"⚠️ Could not click [{description}] ({selector}): {e}")
        return None

async def wait_for_modal_ready(page, description="modal", timeout=10000):
    """Wait for modal to be stable and ready for interaction."""
    print(f"⏳ Waiting for {description} to be ready...")
    await asyncio.sleep(2)
    try:
        await page.wait_for_load_state("networkidle", timeout=timeout)
    except:
        pass

async def linkedin_post_tool(caption_text: str, file_path: str):
    cookies_path = r"D:\linkedin\cookies.json"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,
            args=['--disable-blink-features=AutomationControlled']
        )

        # CHECK IF COOKIES EXIST
        if not os.path.exists(cookies_path):
            print(f"❌ Cookie file not found at {cookies_path}")
            return

        # Initialize context with the storage state (Cookies + Local Storage)
        context = await browser.new_context(
            storage_state=cookies_path,
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ignore_https_errors=True
        )

        page = await context.new_page()

        try:
            # --- Skip Login, go straight to Feed ---
            print("🏠 Opening LinkedIn feed using saved cookies...")
            await page.goto("https://www.linkedin.com/feed/", wait_until="domcontentloaded")
            await asyncio.sleep(3)

            # Check if we are actually logged in
            if "login" in page.url:
                print("⚠️ Cookies might be expired. Redirected to login page.")
                return

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
                        break
                except:
                    continue
            
            # --- Wait for return to main post modal ---
            await wait_for_modal_ready(page, "main post modal")
            
            # --- Click POST ---
            print("📤 Clicking POST button...")
            await asyncio.sleep(1) 
            
            post_button_selectors = [
                "button.share-actions__primary-action:has-text('Post')",
                "button:has-text('Post'):not(:has-text('Repost'))",
                "button[aria-label*='Post']"
            ]
            
            post_clicked = False
            for selector in post_button_selectors:
                try:
                    post_button = await page.wait_for_selector(selector, timeout=5000, state="visible")
                    if post_button and not await post_button.is_disabled():
                        await safe_click(page, selector, "POST button")
                        post_clicked = True
                        print("✅ POST clicked")
                        break
                except:
                    continue
            
            if not post_clicked:
                raise Exception("Could not find or click POST button")

            # --- Confirm post success ---
            print("⏳ Verifying post submission...")
            await asyncio.sleep(5)
            print("🎉 Process finished. Please verify post manually.")

        except Exception as e:
            print(f"❌ Error occurred: {e}")
            await page.screenshot(path="linkedin_error.png")
            raise

        finally:
            print("🔚 Closing browser...")
            await browser.close()

# To run:
# asyncio.run(linkedin_post_tool("Your Caption Here", "C:/path/to/image.png"))