# tools/linkedin_search_tool.py
import os
import asyncio
from dataclasses import asdict
from playwright.async_api import async_playwright
from agents import function_tool
from schemas import SearchRequest, RawLinkedInProfile


@function_tool
async def linkedin_search_tool(request: SearchRequest) -> list[dict]:
    """
    Search LinkedIn people results and return raw profiles.
    """

    EMAIL = os.getenv("LINKEDIN_EMAIL")
    PASSWORD = os.getenv("LINKEDIN_PASSWORD")

    filters = request.filters
    limit = request.limit
    profiles: list[RawLinkedInProfile] = []

    search_query = f"{filters.job_title} {filters.location} {' '.join(filters.keywords)}"
    search_url = (
        "https://www.linkedin.com/search/results/people/"
        f"?keywords={search_query.replace(' ', '%20')}"
    )

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()

        # Login
        await page.goto("https://www.linkedin.com/login")
        await page.fill("#username", EMAIL)
        await page.fill("#password", PASSWORD)
        await page.click("button[type='submit']")
        await page.wait_for_load_state("networkidle")

        # Search
        await page.goto(search_url)
        await page.wait_for_timeout(5000)

        results = await page.query_selector_all(
            'div[data-view-name="people-search-result"]'
        )

        for item in results[:limit]:
            try:
                name_el = await item.query_selector(
                    'a[data-view-name="search-result-lockup-title"]'
                )
                if not name_el:
                    continue

                name = (await name_el.inner_text()).strip()
                url = await name_el.get_attribute("href")

                headline_el = await item.query_selector("p")
                location_el = await item.query_selector("p:last-of-type")

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
            except:
                continue

        await browser.close()

    # 🔑 IMPORTANT: tools must return JSON-serializable objects
    return [asdict(p) for p in profiles]
