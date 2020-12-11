---
title: Node.js basics
tags: 
 - posts
 - basics
---

You can't do anything in Eleventy without using Node.js and the command line. That can be quite daunting to new users because to begin with you're invariably just copying and pasting the commands into it. And nobody wants to be [the guy who wiped out his entire business by typing the wrong code into his Terminal.](https://www.independent.co.uk/life-style/gadgets-and-tech/news/man-accidentally-deletes-his-entire-company-one-line-bad-code-a6984256.html)

Although that story turned out to be a hoax, you should be wary of blindly copying code into the Terminal without understanding some basics. One or two wrongly used characters can wreak havoc.


## What is Node.js?
Normally we think of Javascript as being a client-side language – i.e. we add it to our web pages and the web browser (the 'client') processes it. So all the JS and jQuery we add to our code relates to the web page/document (aka 'the DOM') that the browser assembles and interacts with. 

But if we're going to learn Javascript for this traditional front-end use, then it makes sense to also be able to use it to the back-end as well. Essentially, Node.js is a tool that lets us use Javascript outside of the browser and to utilise it in a server environment instead.

A typical WordPress stack uses Apache/NGINX, MySQL and PHP. Setting up and configuring a server is quite a specialised skill. But with a SSG like Eleventy there's no need for an Apache/NGINX server as all our assets are on a static CDN.

The 'server' exists only on your local computer and is just used for building the site. Node.js is the tool that allows us to use Javascript to setup and configure this local build environment. It's not a JS library like React or jQuery that interacts with the browser, it's solely a back-end tool.


### I don't like using the commmand line. Is there a GUI alternative?
No.

Not that I've seen anyway. But using the Teminal makes you feel like a 'real programmer' and looks cool, so stick with it. And keep in mind that the bits of Node.Js we need for Eleventy are way less complicated than configuring an Apache or NGINX server on your local machine.

## What is npm (Node Package Manager)?

Node Package Manager (npm) is a huge repositary/registry of open-source code. You can think of it like lego bricks in the sense that you often don't need to write your own code to add functionality to your site because someone cleverer has already done it and made it available on npm as a 'module/packet'. In our Eleventy site we're using the [@11ty/eleventy module](#https://www.npmjs.com/package/@11ty/eleventy) to power the barebones site. That itself includes some other packages - like the one that creates the local browser tool whereby you can access the site at something like localhost:8080

In a similar way that you use plugins to extend a WordPress site's functionality, we can import npm packages into our site in order to use things like Tailwind, SASS, code syntax highlighting, date formatting, API fetching and much more.

If you have installed Node.js on your computer – [get it here if not](#https://nodejs.org) then you'll already have npm installed as well.

You can check if you have installed by typing

```
npm -v
```
into yor terminal. The flag `-v` will check which version you have got installed.

### Important - make sure you're installing the node packages in the right place!

Whilst Node.js and npm are probably installed globally on your computer so that any projects can use them, each individual site will use different npm packages and therefore it's important to make sure that you're **only installing packages to the current local project you're working on**. That means that when you're working in the Terminal window, make sure that you are in the project file directory before npm installing things.

So for example this website sits in a folder in my Mac that looks something like /Users/my-name/Websites/EleventySites/eleventy-guide/

So when I am working in the Terminal **I need to make sure that I am in that directory so that any npm packages I install will be installed in here, rather than at a root level**.

To check that you're in the right place you can type  
```
pwd
```
in the Terminal - that will print the current working directory.

Rather than open up a Terminal window at the root and then try to navigate to the project directory using the `cd` (the change directory command), I find it easier on my Mac to use Finder to find the right folder then right click, and choose Services>New Terminal at Folder

![Opening a Terminal Folder using Mac Finder](https://p67.p3.n0.cdn.getcloudapp.com/items/WnulbjjQ/Screenshot%202020-12-07%20at%2013.29.52.png?v=65bdb64bb6bb5b335c0e8f439f9fe532)




## npm vs npx
npx will execute - and install if it's not already. Won't save it, so you can try ones out without installing them?

npm install <package name>
npm i <package name>
npm install <package name> -save dev
npm install <package name> -g don't do this

## What are all those node_modules?
When you install eleventy or add a new package (to utilise Tailwind for example) you'll see inside your project file that there's a folder called `node_modules` and inside it there's loads of subfolders of stuff you've never heard of – even for a vanilla eleventy install.

When you install an npm module/package this is where it's installed to. And bear in mind that many packages are built by using other packages - and they in turn might well rely on other packages. So when you install the @11ty/eleventy package it also installs the packages that it uses.

You don't really ever need to poke around in here. And these folders just live in your project folder. If you look in the `.gitignore` file of most 11ty starter themes you'll see that the node_modules folder is addded to it. That's because you don't want to track the changes to it or commit it to your github repo.

Because they're only on your local computer and can't possibly be accessed by anyone viewing the live website, any security issues in the packages are obfuscated by the fact that they cant be exploited in a way that some insecure WordPress plugins could for example. But it's still best practice to only use as few npm packages as you really need.

If you don't have a node_modules sub-folder folder in your project folder then you've maybe cloned a github repo (which won't include it). To get them all intalled you can type

```
npm install
```
in your Terminal (make sure it is also in the correct working directory first) and then that will add them in.


module.exports
require
async
promise

