---
title: Git basics
tags: 
 - basics
---

If you haven't used git and Github much before then you might feel a bit lost at step one of many tutorials which assume you know the basics.

There's plenty git tutorials out there but here we'll skip all the stuff about branches, pull requests and the other more advanced stuff. Often you'll be the only person working on your Eleventy project and you'll only ever need the 'main' branch.

## Some basic git terminology and workflow

### Local and remote repositories

In a nutshell, the whole idea of github is that you have a version of the code on your computer (the local version) and you are syncing that with a version in your Github account (the remote version).

### Commits

A git **commit** is a set of changes that you make to your local code that you want to be remembered in the future. 

When you're developing your site you can change bit by bit and 'commit' each one with a useful description (that's the more professional but long-winded method which is more useful if you're working in a team). Or you can just work on your code as normal and then 'commit' the whole lot when you want to push your changes. **Either way, you always have to commit the changes to your code before you can push them.**

### Git push

'Pushing' your changes means that when you've amended the code in your local version and you're ready to send it to the rmeote version to update that one accordingly, you 'push' your changes (i.e. all your commits since the last 'push') to the remote version. 

### Git pull

This is, unsurprisingly, the opposite of push. If you're only working on one local machine then you might never need to use it. But if you're working on the same project with a desktop and laptop for example, then you may need to 'pull' the content from the repo to make sure you're working with the latest version. 

For example, I'm writing this post on my laptop and when I am done I will commit the changes and then push it to the remote repo. The local version on my desktop won't have this post in it until I first 'pull' the repo to grab any commits that have been done since I last made any from the desktop version.

If you're starting from an Eleventy Starter project (which I recommend) then you'll need to 'clone' their repository ('repo') it into your Github account. 