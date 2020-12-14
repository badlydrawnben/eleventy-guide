---
title: Markdown
tags: 
 - basics
---
If the '**J**(avascript)' and the '**A**(PIs)' bits of the JAMstack can be tricky to get your head around, luckily the '**M**' is pretty straightforward. 

Markdown is used widely by bloggers and developers alike. Even if you haven't used it before, you can get to grips with it within 10 minutes or so. [Print yourself a cheatsheet](https://cheatography.com/lucbpz/cheat-sheets/the-ultimate-markdown/) and you're good to go.

Writing in Markdown is great for a blog like this because it lets you create basic pages very quickly without interrupting your flow. It's way quicker to add in headings, bold text, links and images than it is to write them in HTML, even if you're using Emmet to help. But it's not so well suited to more elaborate page designs that have a lot more custom divs within them.

## Mixing and matching languages

You can use HTML tags inside a Markdown document and they'll render fine. So will Nunjucks code. One of the gotchas that had me stumped for a while was using Markdown inside a HTML tag. It does work in Eleventy, **but you just need to make sure you've got the line-break in your code**.

So for example this won't render the Markdown code properly:

```md
<div class="something">
## A H2 Heading here
[A link to Google](https://google.com)
</div>
```

But this will:

```md
<div class="something">

## A H2 Heading here
[A link to Google](https://google.com)
</div>
```




Note that with Eleventy you're not obliged to use Markdown at all if you don't want to. If you want to write your pages in HTML or Nunjucks or Liquid or Pug, amongst other templeate languages – then do whatever feels most comfortable.

(Which I guess means that you're making a JAH, JAN, JAL or JAPstack site)

## Extending Markdown

Eleventy uses the [markdown-it](https://github.com/markdown-it/markdown-it) Markdown library out of the box, but you can extend its functionality if you need to.

### Code syntax highlighting

If you're including code snippets in your site, then the official [Eleventy Syntax Highlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/) is easy to get set up. 

Another gotcha - if you're trying to print any Nunjucks code in your snippets, Eleventy will try to process them, even if they are inside code blocks. You need to wrap them in &#123;%raw %&#125; and &#123;%endraw %&#125;  tags so they just get printed to the screen.

### Opening links in a new tab

In Markdown there's no way of indicating that a link should open in a new tab (i.e. that it adds `target="_blank"` to the `<a>` tag). I found a [good tutorial by Frank Noirot](https://franknoirot.co/posts/external-links-markdown-plugin/) that automatically makes any link to an external domain open in a new tab. I've implemented that on this site, you can see the code for it in the `.eleventy.js` file in the Github repo. 

