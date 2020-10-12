# Logo Requested Wikipedia Pages

**What:** [Logo Requested Wikipedia Pages](https://marley.github.io/wikitool/) lists wikipedia pages currently tagged as needing logos and displays thumbnails of all images on that page.

**Why:** This will be helpful for anyone in the Wikipedia editing community. As a completely distributed, volunteer-led effort, Wikipedia has many best practices, and protocols in place to keep content as relevant as possible. One of these is the 'Needs Logo' tag, which a user can add when they notice a page is missing the logo for the school, company, or other entity described. However this tag must be manually removed once someone uploads the logo. Some pages have been updated to include a logo but are still tagged as needing logos. This tool will allow a Wikipedia user to quickly see which pages still need logos and which can be marked as resolved.

<img src="https://github.com/marley/wikitool/blob/master/wiki_page_no_logo.png" width="474" height="300">
*Example of a wikipedia page missing the logo (in this case for a theater company)*

# To Run

1.  Open `index.html`

## Tools that helped me

- [How to fetch from an API without Access-Control-Allow-Origin Header](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9)
- [How to fetch and then display in list](https://attacomsian.com/blog/using-javascript-fetch-api-to-get-and-post-data)
- [How to chain promises](https://dev.to/bennypowers/promise-chains-are-kinda-awesome-273o)
- [How to fetch and unpack images from wikipedia image search api](https://stackoverflow.com/a/20431917/9222529)
- [Encyrpting to MD5](https://stackoverflow.com/questions/1655769/fastest-md5-implementation-in-javascript)
- [Lazy loading](https://www.sitepoint.com/five-techniques-lazy-load-images-website-performance/)
- [Fixing access-control-allow-origin header for wikipedia api](https://stackoverflow.com/a/38816679/9222529)
- [Infinite scroll API](https://infinite-scroll.com/)
- [Helpful infinite scroll example](https://codepen.io/desandro/pen/JJNNqP?editors=1010)
- [Vanilla framework (styling)](https://vanillaframework.io/)
- [CSS selectors](https://www.tutorialrepublic.com/css-tutorial/css-selectors.php)
- [Styling links](https://www.w3schools.com/css/css_link.asp)
- [Color palettes](https://www.w3schools.com/colors/colors_palettes.asp)
- [Styling cards](https://www.w3schools.com/howto/howto_css_cards.asp)
- [Undoing default browser styling](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Consistent_list_indentation)
- [Wikipedia-tool styling inspiration](https://pageviews.toolforge.org/?project=en.wikipedia.org&platform=all-access&agent=user&redirects=0&range=latest-20&pages=Cat|Dog)

## Next Steps

- [x] Host on server
- [x] Lazy load images
- [x] Infinite scroll
- [x] Add handling for end-of-list
- [ ] Debug certain images not rendering
- [ ] Allow user to specify other categories
  - [ ] Lookup example of search bar
  - [ ] Rewrite search function to be generic for any category inputted
  - [ ] Add empty page styling for catgories with no articles
  - [ ] Re-design page to reflect new purpose as generic category search
- [ ] Allow user to input how many articles to show
- [x] Fix UI alignment
- [ ] Add scroll-to-top popup
