import asyncio
from dataclasses import dataclass, field
from typing import List
from playwright.async_api import async_playwright

# ----------------------------
# Data Models
# ----------------------------

@dataclass
class SearchFilters:
    job_title: str
    location: str
    keywords: List[str] = field(default_factory=list)
    industry: str = ""

@dataclass
class SearchRequest:
    filters: SearchFilters
    limit: int = 10

@dataclass
class RawLinkedInProfile:
    name: str
    title: str
    company: str
    headline: str
    summary: str
    skills: List[str]
    location: str
    linkedin_url: str
    last_active_days: int
    mutual_connections: int
    industry: str
    company_size: str

# ----------------------------
# Scraper Function
# ----------------------------

async def linkedin_search_tool(request: SearchRequest, email: str, password: str) -> List[RawLinkedInProfile]:
    filters = request.filters
    limit = request.limit
    profiles: List[RawLinkedInProfile] = []

    search_query = f"{filters.job_title} {filters.location} {' '.join(filters.keywords)}"
    search_url = f"https://www.linkedin.com/search/results/people/?keywords={search_query.replace(' ', '%20')}"

    print("🔍 Searching:", search_query)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        # ---------- LOGIN ----------
        await page.goto("https://www.linkedin.com/login", wait_until="domcontentloaded")
        await page.fill("#username", email)
        await page.fill("#password", password)
        await page.click("button[type='submit']")
        await page.wait_for_load_state("networkidle")
        print("✅ Logged in")

        # ---------- SEARCH ----------
        await page.goto(search_url, timeout=60000)
        await page.wait_for_timeout(5000)

        while len(profiles) < limit:
            # Scroll to bottom to load more results
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(3000)

            # Select all profile containers
            results = await page.query_selector_all('div[data-view-name="people-search-result"]')
            print(f"🔎 Found {len(results)} profile cards on page")

            for item in results:
                if len(profiles) >= limit:
                    break
                try:
                    # Name + URL
                    name_el = await item.query_selector('a[data-view-name="search-result-lockup-title"]')
                    if not name_el:
                        continue
                    name = (await name_el.inner_text()).strip()
                    linkedin_url = await name_el.get_attribute("href")

                    # Headline - first div after name
                    headline_el = await item.query_selector('div:nth-of-type(2)')
                    headline = (await headline_el.inner_text()).strip() if headline_el else ""

                    # Location - usually last p or div in container
                    location_el = await item.query_selector('p, div')
                    location = (await location_el.inner_text()).strip() if location_el else ""

                    profiles.append(
                        RawLinkedInProfile(
                            name=name,
                            title=filters.job_title,
                            company="",
                            headline=headline,
                            summary="",
                            skills=[],
                            location=location,
                            linkedin_url=linkedin_url,
                            last_active_days=999,
                            mutual_connections=0,
                            industry=filters.industry,
                            company_size=""
                        )
                    )

                    print(f"✅ {name} | {linkedin_url}")

                except Exception as e:
                    print("⚠️ Error parsing profile:", e)
                    continue

            # Try next page button
            next_btn = await page.query_selector("button[aria-label='Next']")
            if next_btn:
                await next_btn.click()
                await page.wait_for_timeout(4000)
            else:
                break

        await browser.close()
    return profiles

# ----------------------------
# MAIN ENTRY POINT
# ----------------------------

async def main():
    EMAIL = "mohsinamir6789@gmail.com"
    PASSWORD = "silpi123456"

    request = SearchRequest(
        filters=SearchFilters(
            job_title="AI Engineer",
            location="Pakistan",
            keywords=["Python", "ML"],
            industry="Software"
        ),
        limit=5
    )

    results = await linkedin_search_tool(request, EMAIL, PASSWORD)

    print("\n🎯 FINAL RESULTS")
    for r in results:
        print(f"- {r.name} | {r.location} | {r.linkedin_url}")

if __name__ == "__main__":
    asyncio.run(main())
