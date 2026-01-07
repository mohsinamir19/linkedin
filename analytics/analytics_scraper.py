"""
LinkedIn Analytics Scraper (2026-safe)
- Uses cookies (manual login once)
- Navigates via /in/me/recent-activity/all/
- Expands "See more"
- Collects post text, likes, comments, reposts, media links
- Collects post URL and human-readable timestamp
"""

import asyncio
import json
import hashlib
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Dict, Optional

from playwright.async_api import async_playwright, Page

# Import your time extractor
from utility.time_extractor import get_date


def log(message: str):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] {message}")


class LinkedInAnalyticsScraper:
    def __init__(
        self,
        cookies_path: str = r"C:\Users\sbato\OneDrive\Desktop\linkedin\cookies.json",
        output_path: str = "analytics.json",
    ):
        self.cookies_path = Path(cookies_path)
        self.output_path = Path(output_path)

    # ---------------------------
    # Session Handling
    # ---------------------------
    async def load_cookies(self, context) -> bool:
        try:
            cookies = json.loads(self.cookies_path.read_text())
            await context.add_cookies(cookies)
            log(f"Loaded {len(cookies)} cookies")
            return True
        except Exception as e:
            log(f"Cookie load failed: {e}")
            return False

    # ---------------------------
    # Navigation
    # ---------------------------
    async def navigate_to_posts(self, page: Page) -> bool:
        try:
            await page.goto(
                "https://www.linkedin.com/in/me/recent-activity/all/",
                wait_until="networkidle",
            )
            log("Opened posts via /in/me/recent-activity/all/")
            return True
        except Exception as e:
            log(f"Navigation failed: {e}")
            return False

    # ---------------------------
    # Helpers
    # ---------------------------
    def _parse_count(self, text: str) -> int:
        try:
            text = text.replace(",", "").lower()
            digits = "".join(c for c in text if c.isdigit() or c == ".")
            return int(float(digits)) if digits else 0
        except:
            return 0

    # ---------------------------
    # Post Extraction
    # ---------------------------
    async def extract_post(self, post) -> Optional[Dict]:
        try:
            # ✅ Unique ID
            urn = await post.get_attribute("data-urn")
            if not urn:
                return None
            post_id = hashlib.sha1(urn.encode()).hexdigest()[:12]

            # Reconstruct post URL
            activity_id = urn.split(":")[-1]
            post_url = f"https://www.linkedin.com/posts/activity-{activity_id}"

            # Expand "See more"
            see_more = await post.query_selector('button:has-text("See more")')
            if see_more:
                await see_more.click()
                await asyncio.sleep(0.2)

            # Content
            text_el = await post.query_selector('span[dir="ltr"]')
            content = await text_el.inner_text() if text_el else ""

            # Timestamp (ISO format)
            time_el = await post.query_selector("time")
            posted_time_iso = await time_el.get_attribute("datetime") if time_el else ""

            # Human-readable timestamp via time_extractor
            posted_time_human = get_date(post_url)

            # ---------------------------
            # Engagement counts
            # ---------------------------
            likes = comments = reposts = 0

            # Likes
            like_el = await post.query_selector(
                'li.social-details-social-counts__reactions button span.social-details-social-counts__social-proof-fallback-number'
            )
            if like_el:
                likes = self._parse_count(await like_el.inner_text())

            # Comments
            comment_el = await post.query_selector(
                'li.social-details-social-counts__comments button span'
            )
            if comment_el:
                comments = self._parse_count(await comment_el.inner_text())

            # Reposts
            repost_el = await post.query_selector(
                'li.social-details-social-counts__item button span:has-text("repost")'
            )
            if repost_el:
                reposts = self._parse_count(await repost_el.inner_text())

            # Media (image or video)
            media_url = None
            media = await post.query_selector("video, img")
            if media:
                media_url = await media.get_attribute("src")

            return {
                "post_id": post_id,
                "post_url": post_url,
                "posted_time_iso": posted_time_iso,
                "posted_time_human": posted_time_human,
                "likes": likes,
                "comments": comments,
                "reposts": reposts,
                "content_preview": content[:200],
                "media_url": media_url,
            }

        except Exception as e:
            log(f"Post extraction error: {e}")
            return None

    # ---------------------------
    # Scroll & Collect
    # ---------------------------
    async def collect_posts(self, page: Page, limit: int = 20) -> List[Dict]:
        collected = []
        seen_ids = set()
        scrolls = 0

        while len(collected) < limit and scrolls < 25:
            posts = await page.query_selector_all('div[data-urn][role="article"]')
            log(f"Scroll #{scrolls + 1} → DOM posts found: {len(posts)}")

            for post in posts:
                data = await self.extract_post(post)
                if not data:
                    continue

                if data["post_id"] in seen_ids:
                    continue

                seen_ids.add(data["post_id"])
                collected.append(data)
                log(f"Collected post {data['post_id']}")

                if len(collected) >= limit:
                    break

            # Scroll down
            await page.evaluate("window.scrollBy(0, document.body.scrollHeight)")
            await asyncio.sleep(2)
            scrolls += 1

        log(f"Finished collection → total posts: {len(collected)}")
        return collected

    # ---------------------------
    # Save
    # ---------------------------
    def save(self, posts: List[Dict]) -> bool:
        try:
            payload = {
                "last_updated": datetime.now(timezone.utc).isoformat(),
                "posts": posts,
            }
            self.output_path.write_text(json.dumps(payload, indent=2))
            log(f"Saved analytics to {self.output_path}")
            return True
        except Exception as e:
            log(f"Save failed: {e}")
            return False

    # ---------------------------
    # Main Runner
    # ---------------------------
    async def run(self, max_posts: int = 20) -> bool:
        log("Starting LinkedIn Analytics Scraper")

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=False)
            context = await browser.new_context(viewport={"width": 1280, "height": 800})

            if not await self.load_cookies(context):
                return False

            page = await context.new_page()

            try:
                if not await self.navigate_to_posts(page):
                    return False

                posts = await self.collect_posts(page, max_posts)

                if not posts:
                    log("No posts found. Exiting.")
                    return False

                return self.save(posts)

            finally:
                await browser.close()
                log("Browser closed")


# ---------------------------
# Entrypoint
# ---------------------------
async def main():
    scraper = LinkedInAnalyticsScraper()
    await scraper.run(max_posts=20)


if __name__ == "__main__":
    asyncio.run(main())
