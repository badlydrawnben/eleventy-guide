---
title: Troubleshooting the .eleventy.js file
tags: 
 - posts
 - basics
---

The `.eleventy.js` file is one of the most important in any Eleventy project and it's likely that you'll need to tweak it during yours. Although these might seem obvious, here are a few things that can go wrong if you're copying and pasting code in without fully understanding the format of the file.

## Requiring your additional modules at the beginning

At the top of the `.eleventy.js` file you list all the additional modules that your project requires. For example:

```js
const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
```

If you are copying and pasting config functionality code (more about that below) then make sure you are also copying across any of the module requirements at the top of the file as well. (They sometimes use `var` instead of `const` but it's essentially the same thing)

## The parameter name

Here's an example of a snippet from a typical file
```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
```

Note in line 1 the function's parameter is called `eleventyConfig` and then all subsequent functions are all prefixed with that.

Most Eleventy projects stick to this default, but some use the parameter `config` instead of `eleventyConfig`. So if you're copying and pasting a function that looks something like

```js
config.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });
```  

then make sure that you change that first bit to `eleventyConfig.` (if your project is using the default setup).

## The order of the file contents matters

In your code editor, double check that your opening and closing curly brackets are paired up properly. It's really easy to miss one out or keep a superfluous one in if you're copying and pasting from somewhere else.

1. All the `const` required modules go at the top of the file - that's quite straightforward. 
2. All the config functions need to go inside the curly brackets of the `module.exports` function.
3. Then at the end of the function you `return` the directories, templareFormats etc.

Here's a truncated example
```js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  // all other eleventy Config functions

  return {
    dir: { input: 'src', output: '_site', includes: 'includes', data: 'data' },
    // Allow nunjucks, markdown and 11ty files to be processed
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }; // closing curly bracket for the return one
} // closing curly bracket for the module.exports opening one
```
