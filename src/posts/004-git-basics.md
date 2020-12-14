---
title: Git basics
tags: 
 - basics
furtherReading:
 - linkTitle: Github's Git Handbook
   linkUrl: https://guides.github.com/introduction/git-handbook/ 
 - linkTitle: Using git from within VS code
   linkUrl: https://code.visualstudio.com/docs/editor/versioncontrol 
---

If you haven't used git and Github much before then you might feel a bit lost at step one of many tutorials which assume you know the basics.

There's plenty git tutorials out there but here we'll skip all the stuff about branches, pull requests and the other more advanced stuff. Often you'll be the only person working on your Eleventy project and you'll only ever need the 'main' branch.

## Some basic git terminology and workflow

### What is git?
Git is a *version control system*. It allows you to track and rollback changes to your code, and can allow multiple people to work on the same codebase at the same time.

### Local and remote repositories

In a nutshell, the whole idea of github is that you have a version of the code on your computer (the local version) and you are syncing that with a version in your Github account (the remote version). 

### Commits

A git **commit** is a set of changes that you make to your local code that you want to be remembered in the future. 

When you're developing your site you can change bit by bit and 'commit' each one with a useful description (that's the more professional but long-winded method which is more useful if you're working in a team). Or you can just work on your code as normal and then 'commit' the whole lot when you want to push your changes. **Either way, you always have to commit the changes to your code before you can push them.**

### Git push

'Pushing' your changes means that when you've amended the code in your local version and you're ready to send it to the rmeote version to update that one accordingly, you 'push' your changes (i.e. all your commits since the last 'push') to the remote version. 

### Git pull

This is, unsurprisingly, the opposite of push. If you're only working on one local machine then you might never need to use it. But if you're working on the same project with a desktop and laptop for example, then you may need to 'pull' the content from the repo to make sure you're working with the latest version. 

For example, I'm writing this post on my laptop and when I am done I will commit the changes and then push it to the remote repo. The local version on my desktop won't have this post in it until I first 'pull' the repo to grab any commits that have been made since I last made any from the desktop version.

## Github Desktop

Using git is often done via the command line, and it's quicker that way. But to begin with you can use a free program like [Github Desktop](https://desktop.github.com/) that gives you a visual interface. I would recommend it if you're new to git.

## Cloning a starter project

Eleventy starter projects are usually public github repos. If we want to use one of them as the basis for our Eleventy project then we need to clone a copy into our own Github account.

You can't just copy/clone a repo from someone else's Github account straight into yours. You can only clone it to a local version on your computer, and then push that to your own remote repo. 


Note: When you clone (i.e. import) a Github repo to your local machine, **it will maintain its attachment to the original repo**. So if I cloned the [Eleventy base blog starter](https://github.com/11ty/eleventy-base-blog) for example, and then made my changes (aka commits) to it, and then 'pushed' those changes – then I'd get an error because it's trying to push those changes back to the original repo. And you obviously don't have permission to just overwrite any public repo you can find on Github.

So what we need to do is:
1. Clone it to our local machine
2. Detach it from the origin Github repo where we got it from
3. Create a new remote repository
3. Connect our local repo to the new remote one that's in our Github account
4. Now we're free to push and pull changes to and from it.

### Here's how to do it in Github Dektop

Click on `clone a Repository from the internet`:
![create new repo](https://p67.p3.n0.cdn.getcloudapp.com/items/GGu2WxXK/Screenshot%202020-12-13%20at%2008.01.45.png?v=482012157b6f2c625599a005de24d687)

Choose the `url` tab and paste in the Github repo page you want to clone - in this case it's https://github.com/11ty/eleventy-base-blog and you also need to set the folder where you want the files copied to. I keep all my Eleventy sites in a folder in My Documents:
![Choose which repo to clone](https://p67.p3.n0.cdn.getcloudapp.com/items/12uK4qBQ/Screenshot%202020-12-13%20at%2008.02.50.png?v=238ddf964eb53e21c66ede8405808fb6)

Create a new repo in your Github account. It can be private or public:
![Create new github repo](https://p67.p3.n0.cdn.getcloudapp.com/items/bLu0kooQ/Screenshot%202020-12-13%20at%2008.08.55.png?v=6582702c89e9eb738aa98aa5b7d7c429)

Back in Github Desktop, Select `Respository>Repository Settings`
![Repo settings](https://p67.p3.n0.cdn.getcloudapp.com/items/llunN1vA/Screenshot%202020-12-13%20at%2008.16.21.png?v=5e6f17be58b466c3650abbcb21ca8b6b)


Change the primary remote url from the original one to the new one you just created in your Github account
![Attach new Github account](https://p67.p3.n0.cdn.getcloudapp.com/items/d5uPAx4K/Screenshot%202020-12-13%20at%2008.17.24.png?v=430454f23ccd814b7cefac71316e887f)

You can do all of the above steps from within VS code as well. It has its own terminal window so you could do all the cloning, detaching and attaching of remote versions from within VS code or the Terminal window. It's a lot quicker that way, but for beginners it's more intuitive to do it the long way.

Now you can open that new folder with VS code and get to work on your new site. You can either use the git tools built into VS Code or use Github Desktop to manage your commits and pushes. Using the VS Code one is easier once you've done the cloning and got your repo connected to the correct remote branch.


## Git workflow within VS code

When you've made some changes to files, or created new ones, you'll see a little 'M' next to them - meaning that those files have been modified since the last push:
![untracked changes](https://p67.p3.n0.cdn.getcloudapp.com/items/7KubPq4b/Screenshot%202020-12-11%20at%2017.34.42.png?source=client&v=0a4e52f17af3bb3c2f3952efb30bfb67)

When you want to update your remote branch (it's up to you whether to want to do this little and often or just in one big set when you're finished the whole thing) then if you click on the little git icon on the left hand side it will show you all of the files that have been changed since the last commit.

Write a title for the commit that you're doing and then press the tick button to create a commit:
![name your commit](https://p67.p3.n0.cdn.getcloudapp.com/items/2Nu0qKYQ/Screenshot%202020-12-13%20at%2007.40.46.png?v=a2b51aa035f0ccd98248b0549746f840)

From the little dots menu, select 'Push'. This will push all the commits made since the last push.:
![VS code push to remote](https://p67.p3.n0.cdn.getcloudapp.com/items/YEuQZl8B/Screenshot%202020-12-13%20at%2008.29.12.png?v=a28d1783c10c57dd4a89bdb2995e6c48)

Give it a minute, then if you look in your Github repo you will see those changes along with your commit title:
![seeing your latest commits](https://p67.p3.n0.cdn.getcloudapp.com/items/04uN2eGk/Screenshot%202020-12-13%20at%2007.44.20.png?v=b921378a99c56b55a25332e8ee897a14)

--- 

## Github templates

You can choose to save your Github repo as a 'template'. Then, on it's repo page you'll see a green 'Use this template' button as well as the clone options:

![Github Use This Template button](https://p67.p3.n0.cdn.getcloudapp.com/items/2Nu0qKKJ/Screenshot%202020-12-13%20at%2008.05.09.png?v=e7138f1b5a78ed1df757f6e33cece9f1)

Doing that will create a version of that repo in your Github account - and you can then clone it to your local machine. This saves you from the steps of having to detach your local repo from the original remote one and attaching your own Github remote instead.

--

## gitignore files

You'll probably notice a file called `.gitignore` in most Eleventy projects. This tells git which files or folders to ignore in terms of tracking any changes or deploying to the remote branch.

They'll amost always include the `node_modules` folder because you don't want that in your remote Github repo. It's huge and you only need it on your local machine for when you're serving and building the site to generate the `public` folder.

Some setups will also include the `public` (or whatever the output folder is called) folder in the `.gitignore` file - so their Github repos won't include the output folder. If they're using Netlify then it's not needed. Netlify runs the build process itself and puts the resulting output folder in its CDN. It is never serving the files directly from your Github repo.

