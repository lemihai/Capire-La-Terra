# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website and transforming the base URL
URL = "https://www.aljazeera.com/climate-crisis"
base_URL = URL.split('.com')[0] + ".com"
print(base_URL)

def run (playwright: Playwright):
    # TODO switch to headless=true
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()
    page.goto(URL)

    # locating pages
    pages = page.locator('a[class="u-clickable-card__link"]').all()
    print(pages)

    for article in pages: 
        # article_url gets the href of the article and the article_page has the base url
        article_page = browser.new_page(base_url=base_URL)
        article_url = article.get_attribute("href")
        print(article_url)
        # Check if url exists
        if article_url is not None:
            article_page.goto(article_url)
        else:
            article_page.close()

        # retrieving the title, date, author and text of the article
        article_title = article_page.locator('h1').filter(has_not_text="AL JAZEERA PODCASTS").text_content(timeout=10000)
        article_date = article_page.locator('div[class="article-dates"]').locator('span[aria-hidden="true"]').text_content()
        # try getting getting the author if he exists, if not return null
        try:
            article_author = article_page.locator('a[class="author-link"]').text_content(timeout=5000)
        except:
            article_author=""
        # Try getting the article body if it exists, if not return null
        try:
            article_text = article_page.locator('div[class="wysiwyg wysiwyg--all-content css-ibbk12"]').text_content() 
        except:
            article_text= ""

        # TODO if article text is null then discard it

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