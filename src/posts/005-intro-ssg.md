---
title: How Static Site Generators (SSG) work
tags: 
 - posts
 - basics
---

I hope you're already convinced that although JAMstack sites aren't the best tool for certain types of web project, they are perfect for others – including some that we might traditionally build with WordPress.

JAMstack sites are often cheaper, more secure, more scalable and arguably much more fun to build than their MAMPstack counterparts.

You don't need a Static Site Generator (SSG) to create and deploy a JAMstack site, you could just handwrite the HTML and upload it to Github. But if it's more than a couple of pages in size then a SSG is often the way to go.

They all work slightly differently but share the same overall workflow. In the case of Eleventy we're using Node.js to act as the local 'server' that will take your various templates and data sources and then send them through a pipeline (creating the HTML pages, compiling the SASS, compressing images, removing unused CSS etc) and output them in a folder.

So you've effectively got an input/source folder and an output/distribution one. When you 'build' the site it creates all the static HTML, CSS and JS files that will be hosted and served on the world wide web – and puts them all in the output folder.

![Image of how SSGs work](https://cdn.netlify.com/b0cd7be20ba718c92b5da007a109a89122f6791a/7824d/img/blog/ssg-host-flow.png)
This image is taken from [Netlify's page about how SSGs work](https://www.netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/)

Let's use Netlify as an example as that's the host that many people use. A common workflow is to use Github as a repo for your site files. You can add a site to your Netlify account and connect it to a Github repo. 

The `netlify.toml` file that you see in many Eleventy projects is there to tell Netlify which folder contains the built/compiled version of the site. It's often called `dist` or `public`. Netlify uses the other files in the source directory and elsewhere to build the site but they're never served to the outside world.

Let's take a look at the [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog) on github as an example. Because the site hasn't been built/compiled yet, all you see is all of the source files.

Once you run 
```
npm run build
```
for the first time it will compile everything into a new folder called `_site`. We know that by looking at the bottom of the `.eleventy.js` file:

```js

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
```

And the `netlify.toml` file is telling Netlify the name of the folder to find all the compiled output in. 

```
[build]
  publish = "_site"
  command = "DEBUG=* eleventy"
```

Whenever the contents of the `_site` folder in the Github repo changes, Netlify will rebuild and redeploy the site automatically.

### The 'static' part of Static Site Generators

Once the site is 'built' and the static HTML, CSS, image etc files are created, they won't change until the next rebuild.

So let's say you have a function that picks from a random post, or pulls in data from an API. Once the site is rebuilt, that data is baked into it. So refreshing the page in your browser for example won't display a different random post. 

In a WordPress site the random post is shown dynamically with a bit of PHP interacting with the MYSQL database. But the server in the case of the SSG is just on your computer. It requests a random post in order to build the site, **but it will only choose a different one when the site is rebuilt**.

COuld have some client-side random effect thing.

### Making your Static Site seem a bit less static

I said earlier that Netlify rebuilds its version of your site whenever it detects that the Github version has changed. Let's say that you are using a third party API that pulls through the latest news or weather, or you have a function that picks a random blog post.

In order to update those 'dynamic' elements of the site you might feel that you need to rebuild and redeploy your site to Github/Netlify twice a day so that it didn't seem too stale or outdated.

But updating the Github repo isn't the only way to make Netlify rebuild its version of your site. You could send a command to it so that it automatically rebuilds itself every 12 hours without you needing to do anything to the Github version.

So for example, one of the tips in the Eleventy docs shows you how to [trigger a Netlify rebuild using IFTTT](https://www.11ty.dev/docs/quicktips/netlify-ifttt/).
