---
title: Nunjucks
tags: 
 - basics
---

Eleventy isn't prescriptive about which templating language you use for your content, and indeed you can mix and match as you see fit.

If you don't already know Liquid or Pug or Handlebars then I suggest that Nunjucks seems to be the best language to learn. It's pretty simple and anecodotally it seems like it's the most popularly used one with Eleventy.

## What is a Nunjucks?
It's a javascript based template language. Nunjucks files have a `.njk` suffix. I like it because it lets you do javascript things without having to be very good at javascript!

In terms of templating it is like a PHP `include()` command - it lets you organise your code into reusable blocks and then include bits of them inside another file.

But it also lets you easily loop through content, to filter/sanitise the output, and can be used to output shortcodes.

[The official docs](https://mozilla.github.io/nunjucks/) for it aren't really all that great, and I couldn't find any good beginners' guides either.

## Nunjucks notation

**Variables** are wrapped in double curly brackets – e.g. `{%raw%}{{ title }}{%endraw%}`. One thing to get the knack of is that sometimes you'd use `{%raw%}{{title}}{%endraw%}` and in other circumstances you might need to use `{%raw%}{{data.title}}{%endraw%}`

**Code and blocks** are wrapped in curly brackets and % – e.g. `{%raw%}{% extends "base.njk" %}{%endraw%}`. Sometimes you see it with a dash as well – e.g. `{%raw%}{%- extends "base.njk" -%}{%endraw%}`. Both notations work but it seems like if you use the dash then it runs the code inline whereas the without-dashes format respects the line breaks in your markdown files better.

Here's what I've figured out so far:

## Includes

{%raw%}{% extends "base.njk" %}{%endraw%} See page about templates

## Built-in filters

{%raw%}{{ content | safe }}{%endraw%}

What is that `| safe` bit? 
With Nunjucks you use the pipe to apply a filter to whatever it is that the Nunjucks is outputting.

You see the `| safe` one used quite a lot in Eleventy files. It's a Nunjucks built-in filter and means that the HTML is safe and doesn't need to be escaped or sanitised. You can see the [docs for the safe filter here](https://mozilla.github.io/nunjucks/templating.html#safe).

Some of the the other built-in filters you might use are `reverse`, `trim`, `urlize` and `random`. The documentation for those is pretty straightforward. You'll see that you can 'chain' filters so they're applied one after the other.

## Custom filters

Check out the Filters and Data Files pages on this site for details on how to create your own Nunjucks filters.  Whilst Nunjucks has a built-in `sort` filter, it seems like most people build a custom one.

## Loops

Looping through content is one of the best things about Nunjucks - it's so simple to do. Your collections and custom data are all available to your Nunjucks template so listing your posts for a homepage or navigation is as simple as somthing like

```js
{%raw%}<ul>
{% for post in collections.posts | sortorder %}
<li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
{%endraw%}
```
Note that in a loop, all of the individual loop item variables are prefixed with the name of the alias (I think that's what it's called?). Often the alias is given the same name as the type of content, but to make it more clear, this would also work:

```js
{%raw%}<ul>
{% for elephant in collections.posts | sortorder %}
<li><a href="{{ elephant.url }}">{{elephant.title}}</a></li>
{% endfor %}
</ul>
{%endraw%}
```

## If / else logic
The [section in the Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html#if) is pretty clear about the syntax you need:

```js
{%raw%}{% if hungry %}
  I am hungry
{% elif tired %}
  I am tired
{% else %}
  I am good!
{% endif %}
{%endraw%}
```
A common usage for it in Eleventy would be to add a CSS class or HTML attribute to the current page in a list or navbar.

```
{%raw%}<li{% if elephant.url == page.url %} class="my-active-class"{% endif %}{%endraw%}>
```
Or [this section in the 11ty docs](https://www.11ty.dev/docs/collections/#example-navigation-links-with-an-[aria-current]-attribute-added-for-on-the-current-page) shows you how to add a HTML aria attribute rather than a CSS class – which is a more accessible implementation.

If you look at the `base.njk` file [in this site's Github repo](https://github.com/badlydrawnben/eleventy-guide/blob/master/src/_includes/base.njk) you'll see that I'm implementing a setup from my WordPress SEO workflow – so on the homepage the site title is output as the `<h1>` tag, whereas on all the other pages the `<h1>` is the page title. That's all done with if/else Nunjucks statements. I'm sure the code could be made more efficient, but it works.

## Nunjucks in code blocks
In Eleventy markdown files, Nunjucks code seems to be executed even though it's inside a code block. That makes actually printing NUnjucks code onscreen a bit harder. See the Markdown page in this site for the best solution that I've come across.