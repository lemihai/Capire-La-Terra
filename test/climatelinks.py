# Importing libraries
from playwright.sync_api import sync_playwright, Playwright
from rich import print
import requests
import requests_html
import json

# The URL of the website
URL = "https://www.climatelinks.org/blog"

# running playwirght
def run(playwright: Playwright):
    # intro configuration: start_url being the above url, chrome the browser, the browser launching chrome, and it's not headless
    # maybe change to headless.
    start_url= URL
    chrome=playwright.chromium
    browser = chrome.launch(headless=False)
    # opening a new page and going to the starting url
    page = browser.new_page()
    page.goto(start_url)

    # locator for all the articles found on the main page 
    pages = page.locator("article[role='article']").locator("a").all()
    # print(pages)

    # should do counter to stop it after 10 or smth (alsog get rid of while)
    # running through the articles
    while True:
        # for each article
        for article in pages:
            # p is a page constructor, url the new url gotten from each article
            p = browser.new_page(base_url="https://www.climatelinks.org/")
            url = article.get_attribute("href")
            # go to the url if it exists
            if url is not None:
                p.goto(url)
            else:
                p.close()


            # gather the title, date, author and article of the article
            title = p.locator('h1[class="hero-inline-page__title"]').text_content()
            date = p.locator('div[class="blog__date"]').text_content()
            author = p.locator('div[class="blog__author"]').text_content()
            article = p.locator('article').locator('div[class="l-section__content"]').nth(2).text_content()
            # data = page.content()
            # data = p.locator('article').filter(has_text='Blog').text_content()
            # data = p.on('request', r)
            # data = p.locator("script[type='text/javascript']")
            # stringifying and editing the content so it's not too immense
            tostring = str(article)
            dt = tostring.rstrip().replace('\n\n', '')

            # with open("sample.json", "w") as outfile:
            #     outfile.write(dt)
            # printig to be sure it's fine
            print(
                "title: ", title, "\n",
                "date: ", date, "\n",  
                "author: ", author,"\n",
                "article: ", article, "\n",  
            )

            # html = p.content()
            # print(html)
            # closing the page
            p.close()

    browser.close()

    # test = page.locator("article[role='article']").locator("a").get_attribute('href').all()
    # print(test)

# playwright context
with sync_playwright() as playwright:
    run(playwright)