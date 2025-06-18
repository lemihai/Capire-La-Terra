# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json
import re


# The URL of the website and transforming the base URL
URL = "https://woodcentral.com.au/category/sustainability/"
base_URL = URL.split('.au')[0] + ".au"
print(base_URL)

def run (playwright: Playwright):
    # TODO switch to headless=true
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()
    page.goto(URL)

    # locating pages
    pages = page.locator('div[class="tdb-module-title-wrap"]').locator('a').all() + page.locator('h3[class="entry-title td-module-title"]').locator('a').all()
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
        article_title = article_page.locator('h1[class="tdb-title-text"]').text_content()
        article_date = article_page.locator('div[class="td-fix-index"]').nth(3).text_content()
        # editing the date so that the year has 20 at the beginning, the day of the week is popped out
        # and then the date is rejoined into the original variable
        article_parse = "20" + article_date.split(" ")[2]
        article_date = article_date.split(" ")
        article_date[6] = article_parse
        article_date.pop(0)
        article_date = " ".join(article_date)
        print(article_parse)
        article_author = article_page.locator('a[class="tdb-author-name"]').text_content()
        article_text = article_page.locator('div[class="td_block_wrap tdb_single_content tdi_151 td-pb-border-top post-content-single td_block_template_1 td-post-content tagdiv-type"]').locator('div[class="tdb-block-inner td-fix-index"]').text_content()
        # This block of code uses re sub to cut all HTML tags from the final text
        article_text = re.sub(r'<[^>]+>', '', article_text)

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

# playwright context
with sync_playwright() as playwright:
    run(playwright)