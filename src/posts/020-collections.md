---
title: Collections
tags: 
 - functionality
furtherReading:
 - linkTitle: The official 11ty docs on Collections
   linkUrl: https://www.11ty.dev/docs/collections/ 
 - linkTitle: Working with collections - on Philip Borenstein's blog
   linkUrl: https://www.pborenstein.com/posts/collections/ 
---

Collections in Eleventy are a way of bundling content together so that you can loop through them or pick a random one for example. In WordPress you might use Tags, Categories or Post Types as a way of grouping similar content together, and in Eleventy it's similar.

## Manually defined and automatically recognised collections

Eleventy has a function for registering collections in the `.eleventy.js` file, which we'll come to in a minute. But it's clever enough to automatically create collections for you based on tags. 

So this site for example is a nice and simple one. Each of these pages is a 'post' and in the FrontMatter I'm tagging each one to denote which category it belongs to (in the menu - `basics`, `functionality` and `extending`).

I don't need to register any of these collections in the `.eleventy.js` file because they are tags. And I don't need to use the tag of `posts` or register a `posts` collection manually (see next section) because the Data Template file:  `/posts/posts.json` folder is adding all of them to the `posts` collection:

```js
{
    "layout": "base.njk",
    "collection": "posts",
    "permalink":  "/{%raw%}{{ page.fileSlug | shorten ) }}{%endraw%}/index.html"
}
  ```


## Registering your own collection

There are plenty situations in which you might want to group certain bits of data together whereby using FrontMatter tags isn't feasible or sensible.

We can use the `eleventyConfig.addCollection` function to manually define our own collections.

So for instance to manually create a collection of all posts tagged as `basics` we would add this inside the `.eleventy.js` file's `module.exports` section (see the Troubleshooting the Eleventy post):

```js
  eleventyConfig.addCollection("basicPosts", function(collectionApi) {
    return collectionApi.getFilteredByTag("basics");
  });
```

### Why manually register a collection?

In the case of the code above, we likely wouldn't need to because Eleventy will automatically create the `basics` collection for us based on the tag name. But what if we wanted to collect together content based on various tags - the [Eleventy docs page on collections](https://www.11ty.dev/docs/collections/) has a good example:

```js
eleventyConfig.addCollection("myTravelPostsWithPhotos", function(collectionApi) {
    return collectionApi.getFilteredByTags("post", "travel", "photo");
  });
```  
Here we're creating a collection called `myTravelPostswithPhotos` which contains content which has been tagged with all three of those tags.

Collecting content from a certain location, or a certain type of file

Have a look at the Eleventy docs page mentioned above. At the bottom of that page you'll see some more examples of creating collections based on 
The type of file:
```js
// Filter source file names using a glob
  eleventyConfig.addCollection("onlyMarkdown", function(collectionApi) {
    return collectionApi.getFilteredByGlob("**/*.md");
  });
  ```

  The location of where the files are:
  ```js
    // Filter source file names using a glob
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md");
  });
  ```

  ## Sorting collections

  The main purpose of using a collection is that you can loop through it somehow and present it on your site. As a list of posts for example. The default sorting mechanism Eleventy uses will be on the date the file was created (or you can override that by adding a date in your FrontMatter).

  Often you will want to create your own sorting system. You might want content ordered alphabetically, or based upon filename or an `order` field in your Front Matter.

  There's two ways of defining the sorting mechanism for your collection - you can either do so when regsitering the collection, or do it independently using a filter.

  ### Adding the sorting when you register the collection
  This is perhaps a simpler method. It's fine if you know that you'll only ever want your collection to be sorted in a particular way. 
  
  Here's an example from a [site that I built for my little boy about World War II planes](https://world-war-2-planes.netlify.app) (his latest obsession!). In the Front Matter file at the top of each plane's page there's custom fields that relate to the country, plane type and top speed

  ```md
---
title: Grumman F4F Wildcat
country: USA
planetype: Navy Fighter
maxspeed: 318
image: /Grumman-F4F-3-Wildcat_czudjx.jpg
---
The F4F Wildcat fighter was the best US Navy fighter from 1938 to 1943. It was designed in competition with the Brewster F2A Buffalo fighter.
```

Although I have some client-side jQuery that enables the sort order to be changed, when the site is compiled it only ever shows the planes in country order. So here's the part of the `.eleventy.js` file that registers the collection and orders it by that `country` field in the Front Matter data.

```js
// Returns a collection of planes in country order
 eleventyConfig.addCollection('planes', collection => {
  return collection.getFilteredByGlob('./planes/*.md').sort((a, b) => {
    return (a.data.country) > (b.data.country) ? 1 : -1;
  });
```

So it's looking for all the Markdown files in the `/planes` folder to create the `planes` collection. Then sorting it alpabetically by the country code. Note that when you're referencing custom Frant Matter fields, you do so by using `data.country` not `country`.

My Javascript is pretty awful so it always takes me a fair bit of effort (and Googling) to get the sorting code to work. Hopefully yours is a lot better than mine - but copy and paste if you need to.


  ### Sorting with a filter

  If you want the option of being able to sort your collection in a number of ways - you might want most recent posts first, but also be able to show the two most recent 'featured' posts for example – then **separating the collection registration from the sorting is a good way to go**.

  This means you're not duplicating code by having to register separate `postList`, `featuredPostList` and `postListAlphabetical` collections for example.

  So register your collection (you don't need to if it's a simple one based on tags or folder). Then also create a separate filter which can be applied to any collection you like.

  Check out the [Filters page](/filters) for how to go about registering your own filters.
  

