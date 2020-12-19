---
title: Images
tags: 
 - functionality
templateEngineOverride: njk,md
furtherReading:
 - linkTitle: Responsive image breakpoint generator
   linkUrl: https://www.responsivebreakpoints.com/e/
 - linkTitle: Tutorial on how srcset and sizes work
   linkUrl: https://cloudfour.com/thinks/responsive-images-101-part-4-srcset-width-descriptors/
---

I have to admit that images are one of the things that WordPress does so much easier! You can easily define your own image sizes and crop ratios, upload an image, and WP automatically generates the differently sized versions for you and adds the `srcset` versions to the `<img>` tab.

Mind you, it creates *all* the sizes and crops of *every* image, regardless of whether you only wanted to use one of them – so your media library can get pretty heavy pretty quickly!

When it comes to Eleventy, you can add images in a folder in your project and link to them as usual – and you're good to go. They can be uploaded to the Github repo (provided you make sure you `addPassThroughCopy` them as described in the [troubleshooting the config file](/troubleshooting-config) page.
 
If it's just a little logo file then you don't need to do much more.

But a Github repo isn't really designed to host lots of media files, and if you're planning to use a lot of images in your site then you probably want to make them responsive using something like `srcset` and to make sure they're optimised and served in the best-possible format.


There are two routes you can go down:
1. Generate the image versions/crops etc in Eleventy
2. Use a third-party service like Cloudinary to do all the hosting and heavy-lifting for you.

## The official eleventy-img plugin
There's a few Eleventy image plugins available, but let's look at [the official eleventy-img](https://www.11ty.dev/docs/plugins/image/) one.

I haven't used this one before, and to be honest it has taken me ages to get it to work. I'm sure it's me, but for what it's worth – this is the code that worked. I've taken the example code for the `myResponsiveImage` shortcode in the Github repo version and tweaked it to get it working in my setup. 

Plus I have added in another couple of parameters to the shortcode for image class and lazy loading.

```js
// eleventy-img config - from https://github.com/11ty/eleventy-img 
  eleventyConfig.addNunjucksAsyncShortcode("myResponsiveImage", async function(src, alt, myclass="responsive-img", loading="lazy") {
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
    }

    let outputFormat = ['jpeg'];
    let stats = await Image(src, {
      widths: [380, 640],
      formats: ['jpeg', 'webp'],
      urlPath: "/img/",
      outputDir: "./public/img/",
      // Use the filename rather than random hash 
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });
  
    let lowestSrc = stats[outputFormat][0];
    let sizes = "(max-width:420px) 380px, 640px"; // Make sure you customize this!
    // Iterate over formats and widths
    return `<picture>
      ${Object.values(stats).map(imageFormat => {
        return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
      }).join("\n")}
        <img
          src="${lowestSrc.url}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}"
          alt="${alt}"
          class="${myclass}"
          loading="${loading}">
      </picture>`;
    });
  
  ```
  So this bit `(src, alt, loading="lazy", myclass="responsive-img")` is adding the loading and class parameters and setting the defaults - so if I don't pass in anything to the shortcode then it will add `class="responsive-img" loading="lazy"` to the `<img>` tag.

  That's because I'm using Tailwind's CSS reset and I want to add
  ```css
  .responsive-img{
      width:100%;
  }
  ```
  to make sure that the image is full width, otherwise in the example below, the width attribute is set to `"380"`.

  And I want to add the browser native lazy loading attribute to all the images, with the option of removing it if the image is at the top of the page and I want it to load straight away. I'd do that by passing an empty string.

  I'm new to having to manually create `srcset` values, and I'm sure you can make more sense of [the setup](https://cloudfour.com/thinks/responsive-images-101-part-4-srcset-width-descriptors/) than I can.

  In my case here I just want to create two image sizes:
  1. Max width of 640px wide. Because I'm using the Tailwind Typography plugin, the `.prose` container is set to `max-width:65ch` and so it never gets much more than 635px wide. I'm not using any full-bleed images so that's as wide as any of them will ever be.
  2. For mobiles, I want a smaller size - 380px wide seems about right.

  So the `srcset` is basically saying, whilst the viewport width is less than 420px wide, use the 380w version, or else use the 640w version.

  In all honesty, I'm not sure I've set this up right or sensibly, so don't blindly copy my code verbatim!

  Here's three versions of the shortcode and the corresponding images. Use your browser dev tools inspector to see the `srcset`, `class` and `loading` attribute for each.

  ```js
{%raw%}
// default
{% myResponsiveImage "./src/computed-img/Frog.jpg", "This is a frog" %}

// Add a custom class
{% myResponsiveImage "./src/computed-img/Frog.jpg", "This is a frog", "another-class" %}

// Remove lazy-loading
{% myResponsiveImage "./src/computed-img/Frog.jpg", "This is a frog", "responsive-img", "" %}{%endraw%}
```

{% myResponsiveImage "./src/computed-img/Frog.jpg", "This is a frog" %}

{% myResponsiveImage "./src/computed-img/Frog.jpg", "This is a frog", "another-class" %}

{% myResponsiveImage "./src/computed-img/Frog.jpg", "This is a frog", "responsive-img", "" %}


If you're using lots of self-hosted images in your project then I would definitely make sure that your dist/public folder is added to your `.gitignore` file. Otherwise in your Github repo you'll end up storing all the original image files in the `src` directory plus the multiple generated versions in the `public` one. 

## Using Cloudinary to host and serve your images

[Cloudinary](https://cloudinary.com/) is a popular cloud platform to host your images on. A small site should be fine in their free tier, otherwise it gets pretty expensive.

It's not just a CDN for images, it can do all sorts of fancy image adjustments and cropping on-the-fly based on the url request. If you want your images to be cropped to a particular size in order to be displayed in card layouts for example, then it's really easy with Cloudinary.

Take a look at the [Github repo for the WW2 planes site](https://github.com/badlydrawnben/ww2planes/blob/main/.eleventy.js) I made with my little boy. - I'm using this [Eleventy Cloudinary plugin](https://github.com/juanfernandes/eleventy-plugin-cloudinary). The setup instructions are pretty simple. I modified the shortcode a bit to add in the `width` and `height` attributes to the image tag as [those are important again](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/).

In the `layouts/home.njk` file I'm using the shortcode inside the loop to generate the card images:

```
{%raw%}{% newcloudinaryImage plane.data.image, "w_360,h_240,f_auto", plane.data.title,"360","240" %}{%endraw%}
```
These correspond to the shortcode parameters `(path, transforms, alt, width, height)`

This bit `"w_360,h_240,f_auto"` is what we can append to the Cloudinary image url and it will automatically serve us up a version that's cropped to 360x240px and in the most optimised format. You can see all the [Cloudinary image transformations documented here](https://cloudinary.com/documentation/image_transformations#transformation_flags#automatic_format_selection_f_auto)

The plugin I used above doesn't generate responsive versions of the images. I haven't tried it yet, but [here's another Cloudinary Eleventy image plugin that does so](https://github.com/adamculpepper/eleventy-plugin-responsive-images) 
