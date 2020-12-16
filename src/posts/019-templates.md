---
title: Layouts
tags: 
 - functionality
---

Layouts in Eleventy might otherwise be known as Templates. 

The standard practice is to keep them in an `_includes/` folder. Or `_includes/layouts` if you've got lots else in there and you want to keep it organised. You can use your own system, but that's the default place Eleventy will look for them.

You might well need a different template for the homepage, blog post pages, and standard pages. But to keep your code DRY, you don't want to have to repeat and need to maintain all the HTML doctype and `<head>` code. So it's normal to have all that written out once in a `base.njk` layout file (if you're using Nunjucks). 

Note - you don't need to use the same templating language in your layout and in the pages that utilise that layout – you could have a Nunjucks template and use Liquid for the pages that call upon it.

## Where will your content be placed within the layout?

The layout/template should have a `{ content | safe }` tag inside it. That's where the content of your indvidual file will end up. If you aren't using Nunjucks then see [the docs for the tag you need in other templating languages](https://www.11ty.dev/docs/layouts/#prevent-double-escaping-in-layouts).

See the [Filters](/filters) page to understand what the `| safe` part of the tag means.

## Front Matter in layout files

As well as the individual pages, your layout file can also contain Front Matter data. That could set the permalink structure or set a Front Matter variable for example. It's a similar concept to the [Directory Data Files](/directpry-data/files) one, and the same Data Cascade rules apply.

## Layout chaining

As well as having completely independent layout files, you can also 'chain' them together. 

Let's say that you have a `page.njk` layout for your standard pages. For your blog posts maybe you want to use that as wlel but also add some prev/next links so users can easily navigate through the `posts` collection.

Rather than make a copy of the `page.njk` layout, we could create one called `post.njk` which will essentially be a child of the `page.njk` one.

Here's a simplified version of what the `post.njk` might look like:
```md
layout: page.njk
...

{%raw%}{{ content | safe}}
{% set previousPost = collections.posts | getPreviousCollectionItem(page) %}
{% set nextPost = collections.posts | getNextCollectionItem(page) %}

<div class="post-nav">
{% if previousPost %}Previous Blog Post: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>{% endif %}
{% if nextPost %}Next Blog Post: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>{% endif %}
{%endraw-%}
</div>

```

All of that is going to be outputted in the {%raw%}{{ content | safe}}{%endraw%} tag of the `page.njk` layout. You might have a `/posts/posts.json` [directory data file](/directpry-data/files) that sets all the posts to use the `post.njk` layout file.

The prev/post collection item links are a built-in Eleventy filter. [See more about the filter](https://www.11ty.dev/docs/filters/collection-items/).

Have a poke around the code for the layout handing in some of the Starter Projects. Whilst you can do some fancy stuff with it, it's relatively straightforward to get to grips with.


