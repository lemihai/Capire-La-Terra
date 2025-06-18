# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website and transforming the base URL
URL = "https://www.nature.com/nclimate/research-articles"
base_URL = URL.split('.com')[0] + ".com"

# running playwirght
def run(playwright: Playwright):
    # opening the browser with the playwright chromium launch command.
    # TODO switch to headless=true (like that your browser doesn't show but the process runs)
    browser = playwright.chromium.launch(headless=False)
    # opening a new page and going to the url
    page = browser.new_page()
    page.goto(URL)

    # locating pages
    # pages=page.locator('h3[class="c-card__title"]').locator("a").all()
    pages = page.locator("article").filter(has_text="Open Access").locator("a").all()

    # looping through the articles
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
        article_title = article_page.locator('h1[class="c-article-title"]').text_content()
        article_date = article_page.locator('li[class="c-article-identifiers__item"]').filter(has_text='Published').text_content().split('Published: ', 1)[1]
        article_authors = article_page.locator('a[data-test="author-name"]').all()
        # Creating an all authors array and looping through all the tags in article_authors 
        # Adding them to the list all_authors at the end
        all_authors=[]
        for author in article_authors:
            all_authors.append(author.text_content())
        article_text = article_page.locator('div[class="main-content"]').text_content() 

        # article_parse = str(article_text).rstrip().replace('\n\n', '')
        print(
            "title: ", article_title, "\n",
            "date: ", article_date, "\n",  
            "author: ", all_authors,"\n",
            "article: ", article_text, "\n",  
        )

        # close the page
        article_page.close()

    # close browser
    browser.close()

# playwright context
with sync_playwright() as playwright:
    run(playwright)