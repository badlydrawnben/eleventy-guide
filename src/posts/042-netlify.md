---
title: Hosting on Netlify
tags: 
 - posts
 - extending
---

Netlify seems to be the most popular host to serve your static site from. The free tier will suit you just fine for the foreseeable future and you can host multiple sites. You can point custom domain names to them, or build demo sites using a custom Netlify domain - for instance https://ww2planes.netlify.app

Static site servers are so cheap (and indeed mostly free) because the infrastructure is simple - it's just a big Content Delivery Network (CDN) that's hosting static HTML, CSS and JS files. There's no Apache or PHP or MySQL databases. 

Caching, which is a complicated subject in WordPress, is not really an issue because the whole purpose of caching is to convert dynamic pages into static HTML, CSS and JS components – and that's exacly what our SSG has already done.

## Build minutes

Netlify's pricing is based around the concept of 'build minutes'. When you deploy a site on Netlify (manually, or by git pushing to the connected github rep), it runs your build script - the same one that you use on your local machine e.g. `npm run build` to generate the site's files.

I assume that it's this building process that is the biggest drain on Netlify's resources. So their pricing is based on the amount of time you spent running these builds. At the time of writing, with Netlify's free tier you get 300 'build minutes' per month across your account. 

If your site is quite small and doesn't have loads of images hosted in your github repo, then each build will likely take less than one minute. This one averages less than 30 seconds for example – so I could build it 600 times a month for free.

Note that you are also limited to 100GB of bandwidth per month in the free Netlify tier, but unless your site is crazily popular I don't think you'd ever need to worry about that as a constraint.

## How to connect your site to Netlify
1. Make sure your project has a `netlify.toml` file. If you're customising an existing starter project then it's likely it will already have one. Here's the contents of this site's file:

```
[build]
  publish = "public/"
  command = "npm run build"
```

That's the bare minimum you need. It's telling Netlify the name of the output folder that Eleventy is writing all your files into. And it's telling it the command you use to build your site. 

2. Sign up for a Netlify account at https://app.netlify.com/signup (Either with your email address or authorising it via your Github account)

3. Follow the steps in this [easy guide on the Netlify site](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) Note that their Step 5 isn't needed because it will automatically pull that data through from your `netlify.toml` file.

Whilst you're developing your site you may decide to turn off continuous deployment (i.e. it deploys every time you push changes to the github repo) if you are constantly making changes to it. This can save your build minutes if you're running close to your monthly limit – which is highly unlikely unless your site is enormous.

## Other Netlify cool stuff

### Netlify forms
Forms and search functionality are two of the big drawbacks with SSGs because they usually require a server and database. [Netlify forms](https://www.netlify.com/products/forms/) is really easy to use - you just need to add a couple of lines of code to an existing HTML form. I use it for the contact forms on my main website and can vouch for how good it is. The free tier works fine for my needs.

### Netlify Large Media

### Netlify CMS
Netlify offer their own CMS backend which is great for allowing clients to manage content on the site. It's not as all-singing-and-dancing as something like WordPress but for adding new blog posts and pages it's really straightfoward for them to use.

I got it working for the https://ww2planes.netlify.app site that I created for my little boy. He's seven and could use it just fine. HEad over to the Connecting to a CMS page for more details.

### Auto deploying via an IFTTT webhook
If your site is pulling in data from an external source (like an API) then you may want Netlify to periodically rebuild the site so that the content stays fresh. They have a webhook you can use to do just that. See the link at the bottom of the Introduction to SSGs page for more.

### Asset minification
If your Eleventy workflow doesn't involve minimising your HTML, CSS and JS files then you can get Netlify to do it for you when it builds your site. In your site dashboard go to Build & Deploy>>Post processing>Asset optimization to turn it on. 

### Snippet injection
Similar to where you'll find the asset optimization, you can also add in snippets like analytics tracking scripts to the live version of your site without adding them to the local version. 


