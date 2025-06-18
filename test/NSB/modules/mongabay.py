# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website and transforming the base URL
URL = "https://news.mongabay.com/?s=&formats=post+custom_story"
base_URL = URL.split('.com')[0] + ".com"
print(base_URL)

def run (playwright: Playwright):
    # TODO switch to headless=true
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()
    page.goto(URL)

    # locating pages
    pages = page.locator('div[class="article--container pv--8"]').locator('a').all()
    print(pages)

    for article in pages:
        # article_url gets the href of the article and the article_page has the base url
        article_page = browser.new_page(base_url=base_URL)
        article_url = article.get_attribute("href")

        # Check if url exists
        if article_url is not None:
            article_page.goto(article_url)
        else:
            article_page.close()

        # retrieving the title, date, author and text of the article
        article_title = article_page.locator('div[class="container in-column gap--16 article-headline"]').locator('h1').nth(0).text_content()
        article_date = article_page.locator('div[class="about-author gap--16"]').locator('span[class="date"]').text_content()
        article_author = article_page.locator('div[class="about-author gap--16"]').locator('span[class="bylines"]').text_content()
        article_text = article_page.locator('div[class="inner"]').locator('article').text_content().split('FEEDBACK:', 1)[0].split('(jQuery);', 1)[1]

        print(
            "title: ", article_title, "\n",
            "date: ", article_date, "\n",  
            "author: ", article_author,"\n",
            "article: ", article_text, "\n",  
        )

        # close the page
        article_page.close()

    # close browser
    browser.close()

# playwright contextb
with sync_playwright() as playwright:
    run(playwright)

    