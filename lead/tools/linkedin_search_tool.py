import os
import asyncio
from dataclasses import asdict
from playwright.async_api import async_playwright
from agents import function_tool
from lead.schemas import SearchRequest, RawLinkedInProfile

@function_tool
async def linkedin_search_tool(request: SearchRequest) -> list[dict]:
    """
    Search LinkedIn people results and return raw profiles with detailed logging.
    """
    print("🚀 [START] Starting LinkedIn Search Tool...")
    
    EMAIL = os.getenv("LINKEDIN_EMAIL")
    PASSWORD = os.getenv("LINKEDIN_PASSWORD")

    if not EMAIL or not PASSWORD:
        print("❌ [ERROR] Missing LinkedIn credentials in environment variables.")
        return []

    filters = request.filters
    limit = request.limit
    profiles: list[RawLinkedInProfile] = []

    search_query = f"{filters.job_title} {filters.location} {' '.join(filters.keywords)}"
    search_url = (
        "https://www.linkedin.com/search/results/people/"
        f"?keywords={search_query.replace(' ', '%20')}"
    )

    async with async_playwright() as p:
        print("🌐 [BROWSER] Launching Chromium...")
        # Added extra args to look more "human"
        browser = await p.chromium.launch(
            headless=False,
            args=["--disable-blink-features=AutomationControlled"] 
        )
        
        # Adding a User Agent is critical for LinkedIn
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        try:
            # --- LOGIN PHASE ---
            print("🔐 [LOGIN] Navigating to login page...")
            await page.goto("https://www.linkedin.com/login", wait_until="domcontentloaded")
            
            print(f"📧 [LOGIN] Filling email: {EMAIL}")
            await page.fill("#username", EMAIL)
            await page.fill("#password", PASSWORD)
            
            print("🖱️ [LOGIN] Clicking Submit...")
            await page.click("button[type='submit']")

            # Check if we hit a verification/security wall
            print("⏳ [LOGIN] Waiting for feed or security check...")
            try:
                # We wait for the 'Feed' icon or the search bar to appear
                await page.wait_for_selector(".global-nav__primary-link", timeout=15000)
                print("✅ [LOGIN] Login successful!")
            except:
                print("⚠️ [WARNING] Login timeout. You might be seeing a CAPTCHA or 'Security Check'. Check the browser window!")
                # Give user time to solve CAPTCHA manually if needed
                await asyncio.sleep(10) 

            # --- SEARCH PHASE ---
            print(f"🔍 [SEARCH] Navigating to: {search_url}")
            await page.goto(search_url, wait_until="domcontentloaded")
            
            print("⏳ [SEARCH] Waiting for results to load...")
            # Instead of a fixed timeout, we wait for the result container
            try:
                await page.wait_for_selector('div[data-view-name="people-search-result"]', timeout=10000)
                print("✅ [SEARCH] Results detected on page.")
            except:
                print("❌ [ERROR] No results found or page failed to load results container.")
                await page.screenshot(path="debug_search_fail.png")
                return []

            # --- SCRAPING PHASE ---
            results = await page.query_selector_all('div[data-view-name="people-search-result"]')
            print(f"📊 [SCRAPE] Found {len(results)} raw results. Processing up to {limit}...")

            for i, item in enumerate(results[:limit]):
                try:
                    name_el = await item.query_selector('a[data-view-name="search-result-lockup-title"]')
                    if not name_el:
                        continue

                    full_text = (await name_el.inner_text()).strip()
                    # Name is usually the first line
                    name = full_text.split('\n')[0]
                    url = await name_el.get_attribute("href")

                    headline_el = await item.query_selector(".entity-result__primary-subtitle")
                    location_el = await item.query_selector(".entity-result__secondary-subtitle")

                    print(f"👤 [SCRAPE] Found Profile {i+1}: {name}")

                    profiles.append(
                        RawLinkedInProfile(
                            name=name,
                            title=filters.job_title,
                            company="",
                            headline=(await headline_el.inner_text()).strip() if headline_el else "",
                            summary="",
                            skills=[],
                            location=(await location_el.inner_text()).strip() if location_el else "",
                            linkedin_url=url,
                            last_active_days=999,
                            mutual_connections=0,
                            industry=filters.industry,
                            company_size=""
                        )
                    )
                except Exception as e:
                    print(f"⚠️ [SCRAPE] Skipping an item due to error: {e}")
                    continue

        except Exception as e:
            print(f"❌ [FATAL ERROR] Tool crashed: {e}")
            await page.screenshot(path="fatal_error.png")
        finally:
            print("🏁 [END] Closing browser...")
            await browser.close()

    return [asdict(p) for p in profiles]