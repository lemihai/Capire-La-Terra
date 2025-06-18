# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website and transforming the base URL
URL = "https://edition.cnn.com/climate"
base_URL = URL.split('.com')[0] + ".com"
print(base_URL)

# running playwirght

def run (playwright: Playwright):
    # TODO switch to headless=true
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()
    page.goto(URL)

    # locating pages
    pages = page.locator('a[data-link-type="article"]').all()

    # looping through the articles
    for article in pages:
        # article_url gets the href of the article and the article_page has the base url
        article_page = browser.new_page(base_url=base_URL)
        article_url = article.get_attribute("href")
        print(article_url)
        # Check if url exists
        # TODO introduce the «algorithm that checks if the page has already been scraped to solve the bug of duplicate links
        if article_url is not None:
            article_page.goto(article_url)
        else:
            article_page.close()

        # retrieving the title, date, author and text of the article
        article_title = article_page.locator('h1[data-editable="headlineText"]').text_content()
        # date_part_a takes the string and trims it down including removing empty text
        date_part_a = article_page.locator('div[class="timestamp vossi-timestamp"]').text_content().split('Published\n', 1)[1].replace('\n', '').replace('  ', '')
        # date_part_b splits the list based on the spaces
        date_part_b = date_part_a.split(' ')
        # the final date is a combination of the day, mounth and year of the article
        article_date = date_part_b[4] + ' ' + date_part_b[5].replace(',', '') + ' ' + date_part_b[6]
        article_author = article_page.locator('div[class="byline__names"]').text_content()
        article_text = article_page.locator('div[class="article__content-container"]').text_content() 

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