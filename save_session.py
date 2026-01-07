import json
from pathlib import Path
from playwright.async_api import async_playwright

COOKIES_PATH = Path(r"C:\Users\sbato\OneDrive\Desktop\linkedin\cookies.json")

async def save_cookies_example():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        # Navigate and login manually
        await page.goto("https://www.linkedin.com/login")
        print("Log in manually and press Enter...")
        input()  # wait for manual login

        # Save cookies in correct format
        cookies = await context.cookies()
        # Ensure all cookies have required fields
        cleaned_cookies = [
            {
                "name": c["name"],
                "value": c["value"],
                "domain": c["domain"],
                "path": c.get("path", "/"),
                "expires": c.get("expires", -1),
                "httpOnly": c.get("httpOnly", False),
                "secure": c.get("secure", True),
                "sameSite": c.get("sameSite", "Lax")
            } for c in cookies
        ]

        with open(COOKIES_PATH, "w") as f:
            json.dump(cleaned_cookies, f, indent=4)
        print(f"Cookies saved to {COOKIES_PATH}")

async def load_cookies_example():
    if not COOKIES_PATH.exists():
        print("Cookies file not found!")
        return

    with open(COOKIES_PATH, "r") as f:
        cookies = json.load(f)

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=False)
        context = await browser.new_context()
        # Add cookies
        await context.add_cookies(cookies)
        page = await context.new_page()
        await page.goto("https://www.linkedin.com/feed")
        print("Logged in using cookies!")

# Usage:
import asyncio
asyncio.run(save_cookies_example())
asyncio.run(load_cookies_example())
