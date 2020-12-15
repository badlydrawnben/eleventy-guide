---
title: Front Matter
tags: 
 - basics
furtherReading:
 - linkTitle: Introduction and video about Front Matter
   linkUrl: https://learn.cloudcannon.com/jekyll/introduction-to-jekyll-front-matter/ 
 
---

Front Matter is used for setting the fields and variables for a page  or piece of content. It's always at the top of the file and it lives between the sets of triple dashes.

It's thankfully very easy to learn. **The only thing to be aware of is that it is sensitive to the indentation of the lines inside it.**

You can use it for setting the title of a page, setting any variables, declaring tags, overriding permalinks etc.

## Some examples of Front Matter code from within this site

### An example post markdown page

```md
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
```
Note the indentation of the multiple `furtherReading` items. In my `base.njk` layout I'm using a simple Nunjucks loop to output the Further Reading box at the end of the page if there are any `furtherReading` items in the FrontMatter:

```js
{%raw%}{% if furtherReading %}
<hr class="mt-8"/>
<aside class="prose bg-primary p-6 text-gray-300 mx-auto rounded mt-8">
<p class="text-sm uppercase text-center text-lg tracking-widest">-- Further reading --</p>
<ul >
{% for item in furtherReading %}
<li><a href="{{item.linkUrl}}" target="_blank"><span class="text-gray-200">{{item.linkTitle}}</span></a></li>
{% endfor %}
</ul>
</aside>
{% endif %}
{% endraw %}
```

### For the homepage
This is the `001-index.md` page:
```md
---
title: Home
permalink: /
metatitle: Learning Eleventy for people who are crap at Javascript   

---
```
I'm overriding the permalink here otherwise it would be `/index` because that's the name of the filename once it has the `shorten` filter applied (see the [Filters](/filters) page for more about that).
