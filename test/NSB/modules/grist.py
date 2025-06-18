# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website and transforming the base URL
URL = "https://grist.org/"
base_URL = URL.split('.org')[0] + ".org"
print(base_URL)

def run (playwright: Playwright):
    # TODO switch to headless=true
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()

    # locating pages
    # locating all of the different links the main page has on it and adding it to the apges list
    try:
        page.goto(URL, timeout=5000)
    except:
        pages = page.locator('a[class="compact-tease__link"]').all() + page.locator('a[class="tease__link"]').all() + page.locator('a[class="small-tease__link"]').all() + page.locator('a[class="large-tease-text__link"]').all() + page.locator('a[class="hp-cover-story__link"]').all()
        print(pages)

    for article in pages: 
        # article_url gets the href of the article and the article_page has the base url
        article_page = browser.new_page(base_url=base_URL)
        article_url = article.get_attribute("href")
        print(article_url)

        # Check if url exists
        if article_url is not None:
            try:
                article_page.goto(article_url, timeout=3000)
            except: 
                article_title = article_page.locator('a[class="heading__link"]').text_content()
                article_date = article_page.locator('div[class="article-meta__item"]').filter(has_text='Published').text_content()
                article_author = article_page.locator('span[class="contributor-info__name"]').nth(0).text_content()
                article_text = article_page.locator('article[class="article"]').locator('div[class="article-body js-hang-punc"]').text_content() 

                print(
                    "title: ", article_title, "\n",
                    "date: ", article_date, "\n",  
                    "author: ", article_author,"\n",
                    "article: ", article_text, "\n",  
                )

                # close the page
                article_page.close()   
        else:
            article_page.close()

    # close browser
    browser.close()

# playwright contextb
with sync_playwright() as playwright:
    run(playwright)