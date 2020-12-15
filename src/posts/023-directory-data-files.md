---
title: Directory data files
tags: 
 - functionality
furtherReading:
 - linkTitle: The 11ty docs on Data Directory files
   linkUrl: https://www.11ty.dev/docs/data-template-dir/ 
---

Rather than use the Front Matter to tag or set the permalink structure for every individual post or piece of content, you can add in a Directory Data File which will set the characteristics for all the files in that directory/folder. 

So in many Starter Projects it's common to see a `/posts` folder with markdown posts inside, and a `posts.json` data file which looks like the one I am using:

```
{
    "layout": "base.njk",
    "tags": [
      "posts"
    ],
    "permalink":  "/{%raw%}{{ page.fileSlug | shorten ) }}{%endraw%}/index.html"
  }
```

You can use this even if the folder is otherwise empty. See the Star Wars example in the [API data](/apis-external-data) page. There's nothing else in the `/films` directory in the `/src` folder, but the Directory Data File is telling Eleventy what to do with each film page when it builds it. 

## Merging vs overriding data

Be aware that the default functionality of the current version of Eleventy (v0.11.1) is that data from one source will override/replace the same kind of data from a source lower down in the cascade.

So for example, if your Data Template file uses something like this to make sure all your posts go into a `posts` collection

`posts.json`
```json
"tag": "posts",
```

and then in your individual blog post `.md` file you have the Front Matter
```md
---
title: Directory data files
tags: 
 - functionality
---
```

Then **this blog post will only appear in the `functionality` collection, not the `posts` one as well,**. The `.md` file is overriding the Data Template File because it is more specific and therefore higher up the cascade.


If we want the data (the tags in this case) to combine/merge rather than override/replace then we need so **turn on Data Deep merging** by using this code in the `.eleventy.js` file:

```
eleventyConfig.setDataDeepMerge(true);
```

Now it will appear in both the `functionality` and `posts` collections as intended. Read more about the [Data Merging](https://www.11ty.dev/docs/data-deep-merge/) (and how you can override it in individual cases).

## The Data Cascade

What overrides or takes priority over what is determined by the [data cascade](https://www.11ty.dev/docs/data-cascade/) in Eleventy. It's a bit like the templating hierarchy in WordPress or the specifity in CSS – more granular data takes precedence over the more generic stuff.

You might be familiar with the hierarchy in WordPress:
```
1. WordPress looks for a template file in the current theme’s directory that matches the category’s slug. If the category slug is “unicorns,” then WordPress looks for a template file named category-unicorns.php.
2. If category-unicorns.php is missing and the category’s ID is 4, WordPress looks for a template file named category-4.php.
3. If category-4.php is missing, WordPress will look for a generic category template file, category.php.
4. If category.php does not exist, WordPress will look for a generic archive template, archive.php.
5. If archive.php is also missing, WordPress will fall back to the main theme template file, index.php.
```

Well the data cascade in Eleventy works similarly. If all of these places were setting a different `tag` then without the DeepDataMerge, the one at the highest level of the cascade would override the others.

1. `my-first-blog-post.md` (Front Matter in an individual file)
2. `my-first-blog-post.json` (A template data file)
3. `src/posts/posts.json` (A directory data file - the subject of this article)
4. `src/posts.json` (A parent directory data file)
5. `_data/* files` (A global data file)

