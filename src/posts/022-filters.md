---
title: Filters
tags: 
 - functionality
furtherReading:
 - linkTitle: Steph has some great examples of 11ty filters in her 11ty Rocks! site
   linkUrl: https://11ty.rocks/eleventyjs/ 
 - linkTitle: Here's some more filter examples including date formatting
   linkUrl: https://rphunt.github.io/eleventy-walkthrough/filters.html#formatdate   
 - linkTitle: The official 11ty docs on filters
   linkUrl: https://www.11ty.dev/docs/filters/
---

I hope your vanilla Javascript skills are better than mine! Filters are a good way of brushing up on what most developers would consider to be the basics.

If you've read the [Collections](/collections) page you'll know that filters are useful for sorting collections. There's many other uses for them as well – formatting dates, picking a set number of items, trimming content and much else besides.

If you pore over the `.eleventy.js` file for this site you'll see a couple of simple filters that I have added.

## Example 1 - Using a filter to order the posts in a collection

Look at the list of posts in the nav on the left hand side – they're in a custom order. There's a few ways you could do this. You could add in an `order` data field in your Front Matter and use that to sort (by replacing `a.fileSlug` with `a.data.order` in the code below.)

The way I did it is to order them by filename and use numbers at the start of them. That way it's quick and easy to see the order and to rearrange things by renaming the file rather than having to open and edit each one.

![ordering items by filename](https://p67.p3.n0.cdn.getcloudapp.com/items/7KubPq4b/Screenshot%202020-12-11%20at%2017.34.42.png?v=0a4e52f17af3bb3c2f3952efb30bfb67)

So I've created a filter called `sortorder` and I'm ordering them in ascending order. `fileSlug` is one of the [Eleventy built-in page variables](https://www.11ty.dev/docs/data-eleventy-supplied/). 

```js
 // sortorder filter to sort posts by filename 
  eleventyConfig.addFilter("sortorder", (arr) => {
   arr.sort((a, b) => (a.fileSlug) > (b.fileSlug) ? 1 : -1);
    return arr;
  });
```
This filter is then available to my Nunjucks files. So I can 'pipe' it in to the loop of my posts:

```js
{%raw%}{% for post in collections[item.id] | sortorder %} {%endraw%}
```

In this case, I wanted the collections to be broken up into sections (Basics, Functionality and Extending) so I'm using tags to do that. See the Nunjucks page.

## Example 2 - Using a filter to trim filenames

You'll see above that I'm using numbers at the start of my post filenames as a quick way of re(ordering) them in VS Code. And the filter in the first example uses that order to output them in Eleventy.

But I don't want those numerical prefixes to appear in my permalinks.
So here's a filter called `shorten` (I really should use better descriptive names) that trims the first four characters off the filename.

```js
   // shorten nunjucks filter to strip first 4 characters from permalink
   // i.e. it strips out the 003- from the md filename
  eleventyConfig.addFilter('shorten', function(str) {
    return str.slice(4);
});
``` 

And here it is in use in my `posts.json` file

```json
{
    "layout": "base.njk",
    "collection": "posts",
    "tags": "posts",
    "permalink":  "/{%raw%}{{ page.fileSlug | shorten ) }}{%endraw%}/index.html"
  }
```
## Built-in filters
You'll see from the [Nunjucks page](/nunjucks) that it has its own built-in filters that you can access - like `reverse`. 
Eleventy also has a few [built-in filters](https://www.11ty.dev/docs/filters/#eleventy-provided-universal-filters) like `url` and `get*CollectionItem`. The `log` one is handy for debugging. You can pipe it into a loop like this:

```js
{%raw%}{% for item in furtherReading | log %}{%endraw%}
```
Then if you look in your console you'll see that it prints them out:

```js
[
  {
    linkTitle: 'Steph has some great examples of 11ty filters in her 11ty Rocks! site',
    linkUrl: 'https://11ty.rocks/eleventyjs/'
  },
  {
    linkTitle: "Here's some more filter examples including date formatting",
    linkUrl: 'https://rphunt.github.io/eleventy-walkthrough/filters.html#formatdate'
  },
  {
    linkTitle: 'The official 11ty docs on filters',
    linkUrl: 'https://www.11ty.dev/docs/filters/'
  }
]
```
You can see more example od simple filters in the [Data files](/data-files) page.