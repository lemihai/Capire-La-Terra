# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website and transforming the base URL
URL = "https://www.euronews.com/green"
base_URL = URL
print(base_URL)

def run (playwright: Playwright):
    # TODO switch to headless=true
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()
    page.goto(URL)

    # locating pages
    pages = page.locator('div[class="o-site-main--article-with-wallpaper__container"]').locator('article').locator('a[class="m-object__title__link   "]').all()
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
        # The headers are random
        article_title = article_url.split('/')[-1].replace('-', ' ')
        article_date = article_page.locator('div[class="c-article-publication-date"]').nth(1).locator('time').first.text_content().split("-", 1)[0]
        article_author = article_page.locator('div[class="c-article-contributors c-article-contributors--green"]').nth(1).text_content()
        article_text = article_page.locator('div[class="c-article-content c-article-content--green js-article-content poool-content"]').nth(1).text_content() 

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