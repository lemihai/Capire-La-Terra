# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website and transforming the base URL
URL = "https://cleantechnica.com/"
base_URL = URL.split('.com')[0] + ".com"

# running playwirght

def run (playwright: Playwright):
    # TODO switch to headless=true
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()
    page.goto(URL)

    # locating pages
    pages = page.locator("article").locator('h2[class="cm-entry-title"]').locator("a").all()
    # print(pages)

    for article in pages:
        # article_url gets the href of the article and the article_page has the base url
        article_page = browser.new_page(base_url=base_URL)
        article_url = article.get_attribute("href")
        # print(article_url)
        # Check if url exists
        if article_url is not None:
            article_page.goto(article_url)
        else:
            article_page.close()

        # retrieving the title, date, author and text of the article
        article_title = article_page.locator('h1[class="cm-entry-title"]').text_content()
        # date_part_a cuts the first part of the url, then splits the rest by the / and saves it into the list
        date_part_a=article_url.split('.com/', 1)[1].split("/")
        # date+part_b joins the first 3 elements of the list 
        date_part_b = "/".join(date_part_a[:3])
        # Final article date
        article_date = date_part_b
        article_author = article_page.locator('span[class="cm-author cm-vcard"]').text_content()
        # article text trims the content right from where the text "Chip in a few dollars a month" appears
        article_text = article_page.locator('div[class="cm-entry-summary"]').text_content().split('Chip in a few dollars a month', 1)[0]

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