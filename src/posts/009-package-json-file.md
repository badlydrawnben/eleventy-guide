---
title: The package.json file
tags: 
 - basics
---
Make sure you've read the previous post about Node.js and npm first.

In the root of your project folder you'll see a file called `package.json`. This is created automatically when you install npm packages. You'll see that any new ones you install will be added to the Dependencies. In this project for example I have installed the Tailwind Typography and 11ty syntax highlighting packages (the main Tailwind package and assoerted others were already installed as part of the Starter project I am using).

![package.json dependencies screenshot](https://p67.p3.n0.cdn.getcloudapp.com/items/eDuw1Ny7/Image%202020-12-07%20at%202.44.05%20pm.jpg?v=27c7bec7efa6525a1e2626bc5cc45673)

In some tutorials or examples they will install a new package with the save-dev flag at the end. For example:

```
npm install @tailwindcss/typography --save-dev
```
 

This will then save it in the `devDependencies` section rather than the `dependencies` one in the package.json file. We're not building something that will be added to the npm registry for download by others, so I don't think it really matters whether the packages you add are in dependencies or devDependeincies. So don't worry too much about that.


## npm scripts inside package.json
An important part of the package.json file that you will probably need to look at is the scripts section.

(I think) these are essentially shortcuts for the more verbose npm run commands that you often use. 

Without the shortcuts or any custom package.json scripts for example, to start the server and make BrowserSync watchout for any changes and live-refresh the page - you would run this command – as stated in the [Getting started section of the 11ty docs](https://www.11ty.dev/docs/getting-started/):

```
npx @11ty/eleventy --serve
```
But we can create shorcuts for this and other commands, including chained ones that might run a postCSS purge as part of the build process for example. Have a look at the scripts section [in the package.json file of the official eleventy-base-blog starter project](https://github.com/11ty/eleventy-base-blog/blob/master/package.json) and you'll see that here it has set up the shortcut
'serve' (and also 'start') to do that same task. So in your terminal you'd just type in 
```
npm run start
```

Whilst *start* and *serve* are commonly used, the naming convention of these scripts is down to personal preference and some projects may need extra custom scripts as well.

**So if you're starting from an existing starter project it's important to have a look in the package.json file to check what the serve and build shorcuts are for that project.**

These are the scripts for the starter project I used for this site for example:
``` json
 "scripts": {
    "clean": "rm -rf public src/css/styles.css", // delete the existing styles.css file
    "dev": "npm run clean && postcss src/css/tailwind.css > src/css/styles.css && eleventy --serve", // run the clean script above, then use postcss to compile the tailwind css file into the style.css one - and it will purge all the unused CSS classes in the process
    "build": "npm run clean && NODE_ENV=production postcss src/css/tailwind.css > src/css/styles.css && eleventy" // The same as above except we have set the environment variable to production, which may add in things like html minification
  },
```
I've added some of my own comments to explain what they are doing.




Module.exports
Promise async
reqiure

### The package-lock.json file
You can ignore this file, you'll never need to touch it or look at it. You'll only ever make changes to the `package.json` file itself.