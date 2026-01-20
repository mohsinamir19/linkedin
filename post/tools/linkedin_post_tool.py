import asyncio
import os
from playwright.async_api import async_playwright

# Define your cookie path
COOKIES_PATH = r"C:\Users\sbato\OneDrive\Desktop\linkedin\cookies.json"

async def safe_click(page, selector, description="", timeout=5000):
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
    print(f"⏳ Waiting for {description} to be ready...")
    await asyncio.sleep(2)
    try:
        await page.wait_for_load_state("networkidle", timeout=timeout)
    except:
        pass

async def linkedin_post_tool(email: str, password: str, caption_text: str, file_path: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=['--disable-blink-features=AutomationControlled']
        )

        # --- SESSION MANAGEMENT ---
        # Check if cookies exist
        storage_state = COOKIES_PATH if os.path.exists(COOKIES_PATH) else None
        
        if storage_state:
            print("🍪 Found existing cookies. Attempting to bypass login...")
        else:
            print("🆕 No cookies found. Manual login required.")

        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ignore_https_errors=True,
            storage_state=storage_state  # Load cookies here
        )

        page = await context.new_page()

        try:
            # --- Login Logic ---
            await page.goto("https://www.linkedin.com/feed/", wait_until="domcontentloaded")
            await asyncio.sleep(2)

            # Check if we are actually logged in by looking for the 'Start a post' button
            # or if we are redirected to the login page
            if "login" in page.url or await page.query_selector("input#username"):
                print("🔐 Cookies expired or missing. Logging in with credentials...")
                await page.goto("https://www.linkedin.com/login")
                await page.fill("input#username", email)
                await page.fill("input#password", password)
                await safe_click(page, "button[type='submit']", "Login button")
                await page.wait_for_load_state("networkidle")
                
                # Save cookies for next time
                os.makedirs(os.path.dirname(COOKIES_PATH), exist_ok=True)
                await context.storage_state(path=COOKIES_PATH)
                print(f"✅ Login successful. Cookies saved to {COOKIES_PATH}")
            else:
                print("✅ Successfully logged in via cookies!")

            # --- Start post modal ---
            print("✏️ Starting a new post...")
            start_post_selectors = [
                "button.share-box-feed-entry__trigger",
                "button[aria-label*='Start a post']",
                "button:has-text('Start a post')"
            ]
            
            for selector in start_post_selectors:
                if await page.query_selector(selector):
                    await safe_click(page, selector, "Start post")
                    break
            else:
                raise Exception("Could not find 'Start a post' button.")
            
            await wait_for_modal_ready(page, "post modal")

            # --- Add caption ---
            print("📝 Adding caption text...")
            caption_area = await page.wait_for_selector("div.ql-editor", timeout=5000)
            await caption_area.click()
            await caption_area.fill(caption_text)

            # --- Upload media ---
            print(f"🖼 Uploading media: {file_path}")
            media_button_selector = "button[aria-label*='Add a photo'], button[aria-label*='Add media']"
            async with page.expect_file_chooser() as fc_info:
                await safe_click(page, media_button_selector, "Media button")
            file_chooser = await fc_info.value
            await file_chooser.set_files(file_path)

            # --- Handle Media Editor (Next/Done) ---
            await asyncio.sleep(2)
            editor_selectors = ["button:has-text('Next')", "button:has-text('Done')"]
            for selector in editor_selectors:
                if await page.query_selector(selector):
                    await safe_click(page, selector, "Media Editor Proceed")
                    break

            # --- Click POST ---
            print("📤 Clicking POST button...")
            await wait_for_modal_ready(page, "main post modal")
            post_button_selectors = [
                "button.share-actions__primary-action:has-text('Post')",
                "button:has-text('Post'):not(:has-text('Repost'))"
            ]
            
            for selector in post_button_selectors:
                btn = await page.query_selector(selector)
                if btn and not await btn.is_disabled():
                    await safe_click(page, selector, "POST button")
                    print("✅ POST clicked")
                    break

            # Wait for success
            await asyncio.sleep(3)
            
        except Exception as e:
            print(f"❌ Error occurred: {e}")
            await page.screenshot(path="linkedin_error.png")
            raise

        finally:
            await browser.close()