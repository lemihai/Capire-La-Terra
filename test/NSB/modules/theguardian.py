# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website and transforming the base URL
URL = "https://www.theguardian.com/world"
base_URL = URL.split('.com')[0] + ".com"
print(base_URL)

def run (playwright: Playwright):
    # TODO switch to headless=true
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()
    page.goto(URL)

    # locating pages
    pages = page.locator('div[class="dcr-rni59y"]').locator('a').all()
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
        article_title = article_page.locator('div[class="dcr-cohhs3"]').locator('h1[class="dcr-u0152o"]').text_content()
        article_date = article_page.locator('summary[class="dcr-1ybxn6r"]').locator('span[class="dcr-u0h1qy"]').text_content()
        date_part_a = article_date.split(' ')
        article_date = date_part_a[1] + ' ' + date_part_a[2] + ' ' + date_part_a[3]
        article_author = article_page.locator('div[class=" dcr-1cfpnlw"]').locator('a[rel="author"]').text_content()
        article_text = article_page.locator('div[class="dcr-1i2kr8i"]').locator('div[id="maincontent"]').text_content()

        print(
            "title: ", article_title, "\n",
            "date: ", article_date, "\n",  
            "author: ", article_author,"\n",
            "article: ", article_text, "\n",  
        )

# playwright contextb
with sync_playwright() as playwright:
    run(playwright)

    