---
title: APIs and external data sources
tags: 
 - functionality
furtherReading:
 - linkTitle: This video from Phil Hawksworth has a great walkthrough about pulling data from an API (jump to the 1hr 25 min mark)
   linkUrl: https://www.freecodecamp.org/news/jamstack-full-course/ 
 - linkTitle: Getting Eleventy to pull data from Airtable looks like a client-friendly workflow for some projects
   linkUrl: https://github.com/plloyd11/eat
 - linkTitle: Read more about axios here
   linkUrl: https://www.sitepoint.com/add-office-functionality-to-your-web-app-with-onlyoffice/
---

The variety of types of data that Eleventy can work with is one of the things that developers like about it.

Pulling in data from an external API requires a bit of JS knowledge and I've barely scratched the surface in terms of my understanding of how it all works. 
But to give you a glimpse I've put together a simple demo.

<div class="text-center">
<a class="btn" href="https://star-wars-eleventy-demo.netlify.app/" target="_blank">See the demo site</a></div>

Here we'll walk through the process of connecting to a simple API and generating a page of content for each record.

## Find an API

For the sake of simplicity I'm using this [Star Wars API](https://swapi.dev/).

 It's old and hasn't been updated in years (which is why it only has the first six films), but it is well documented and it doesn't require an API key or authentication – which is unusual but makes our job a bit simpler.

If I look in the documentation I can see that there is an endpoint that returns information about the Star Wars films: https://swapi.dev/documentation#films 

So the url endpoint is going to be https://swapi.dev/films

## Test it out to see what the response will be

In order to see what will be returned when we send a request to that endpoint, let's use the Hoppscotch (which used to be called Postwoman) website to explore the response: https://hoppscotch.io/?method=GET&url=https://swapi.dev&path=/api/films/ 

There's other tools like Postman that you can download, but for a simple API like this, the web app is fine.

Here's a truncated copy of the response:

```json
{
   "count":6,
   "next":null,
   "previous":null,
   "results":[
      {
         "title":"A New Hope",
         "episode_id":4,
         "opening_crawl":"It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
         "director":"George Lucas",
         "producer":"Gary Kurtz, Rick McCallum",
         "release_date":"1977-05-25",
         "characters":[
            "http://swapi.dev/api/people/1/",
            "http://swapi.dev/api/people/2/",
            "http://swapi.dev/api/people/3/",
            "http://swapi.dev/api/people/4/",
            "http://swapi.dev/api/people/5/",
            "http://swapi.dev/api/people/6/",
            "http://swapi.dev/api/people/7/",
            "http://swapi.dev/api/people/8/",
            "http://swapi.dev/api/people/9/",
            "http://swapi.dev/api/people/10/",
            "http://swapi.dev/api/people/12/",
            "http://swapi.dev/api/people/13/",
            "http://swapi.dev/api/people/14/",
            "http://swapi.dev/api/people/15/",
            "http://swapi.dev/api/people/16/",
            "http://swapi.dev/api/people/18/",
            "http://swapi.dev/api/people/19/",
            "http://swapi.dev/api/people/81/"
         ],
         "planets":[
            "http://swapi.dev/api/planets/1/",
            "http://swapi.dev/api/planets/2/",
            "http://swapi.dev/api/planets/3/"
         ],
         "starships":[
            "http://swapi.dev/api/starships/2/",
            "http://swapi.dev/api/starships/3/",
            "http://swapi.dev/api/starships/5/",
            "http://swapi.dev/api/starships/9/",
            "http://swapi.dev/api/starships/10/",
            "http://swapi.dev/api/starships/11/",
            "http://swapi.dev/api/starships/12/",
            "http://swapi.dev/api/starships/13/"
         ],
         "vehicles":[
            "http://swapi.dev/api/vehicles/4/",
            "http://swapi.dev/api/vehicles/6/",
            "http://swapi.dev/api/vehicles/7/",
            "http://swapi.dev/api/vehicles/8/"
         ],
         "species":[
            "http://swapi.dev/api/species/1/",
            "http://swapi.dev/api/species/2/",
            "http://swapi.dev/api/species/3/",
            "http://swapi.dev/api/species/4/",
            "http://swapi.dev/api/species/5/"
         ],
         "created":"2014-12-10T14:23:31.880000Z",
         "edited":"2014-12-20T19:49:45.256000Z",
         "url":"http://swapi.dev/api/films/1/"
      },
      {
         "title":"The Empire Strikes Back",
         "episode_id":5,
         "opening_crawl":"It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
         "director":"Irvin Kershner",
         "producer":"Gary Kurtz, Rick McCallum",
         "release_date":"1980-05-17",
         
         TRUNCATED
```

OK there's a lot there, but the first thing to notice is how the response is nested. All the useful data is inside that array called `results`. In our case for each film we just want the `title` and the `opening_crawl`

## Pulling the data into Eleventy

In order to pull the API data into Eleventy we're going to use a npm package called [axios](https://www.npmjs.com/package/axios). That's what all the examples I've seen do, so it seems to be the go-to tool for this kind of thing.

In your project working directory you need to install axios

```
npm install axios
```

If you don't already have a `_data` folder in your project then make one now. That's the default name for it, but if you're using a starter project you should check in your `.eleventy.js` file that the data directory isn't called something else.

Inside there let's create a new file called `films.js`

Here's what we'll put in it:

```js
const axios = require("axios");

module.exports = async function() {
  try {
    const response = await axios.get('https://swapi.dev/api/films/');
    // console.log(response.data) // uncomment this for debugging
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
```

So this is a bit complicated because there's a few new concepts in here. You might well not be familiar with `module.exports` `async` `await` and `catch` because they're not really used in front-end javascript.

First we're declaring a variable so Eleventy knows what 'axios' is when the code mentions it later.


## Loop through the data in our home page

In our home page (`index.njk` in my case) we're going to use some basic Nunjucks syntax to loop through the films to check that they're pulling through OK.

```js
<ul>
    {% raw %}{% for film in films.results %} {% endraw %}
    <li>{ film.title }</li>
    {% raw %}{% endfor %}{% endraw %}
</ul>
```

We don't need to tell Eleventy where to find these `films`. They are in the `_data` folder and so I think Eleventy figures it out for itself based on the filename. In our case we are using `films.results` because if you remember, the API response had all the film data that we wanted but it was nested inside an array called `results`. 

So just to be clear, `results` isn't a js or Eleventy function, it's just the name of this particlar array in which the data we need is nested in. `films.results` puts us in the right place in that JSON file so we can access the title of each film. **Don't copy and paste that code blindly without knowing what `films.results` means in this particular context**

## Programmatically creating a page for each film

Now that we've got our basic loop and we know how to reference the data inside Eleventy, we need to create a separate web page for each film. To do this we're going to use the **pagination** functionality.

Normally you'd associate pagination with determining how many blog posts to show on each page, but the Eleventy pagination system can also be used to take our data set and split it up into individual pages.

Inside our `films` directory let's create a new file called `index.njk`. This is an example of a [Template Directory Data file](/directory-data-files)

The FrontMatter for it will look like this:

```
{% raw %}
---
pagination:
  data: films.results
  size: 1
  alias: films
permalink: /film/{{ films.title | slug }}/index.html
--- 
{% endraw %}
```
This is telling Eleventy that we want to use that same `films.results` data source (that we used on the home page) and break it up into `1` page per item. The `alias` is using `films` as the shortcut for the data source `films.results`
We're also telling Eleventy what to use as the permalink when it creates the pages. So `{% raw %}{{ films.title | slug }}{% endraw %}` is taking the title and using an [Eleventy Nunjucks filter](https://www.11ty.dev/docs/filters/slug/) to convert it into a slug (stripping out the spaces etc)

**The indentation in that FrontMatter is important.**

Now in your terminal if you stop Eleventy (`[Ctrl + C]` on a Mac) then restart it again with `npm start` or whatever your --serve command is – then hopefully if you watch the Terminal output you should see some lines like this to confirm that Eleventy is generating the pages:

![Eleventy Terminal output](https://p67.p3.n0.cdn.getcloudapp.com/items/6quxPm1N/Image%202020-12-08%20at%2010.54.29%20am.png?v=8a71058e973b61231852ea0dd49cd437)

## Add links to the list of films on the homepage

Lastly we can go back to the homepage loop and add in links to each page using that same permalink setup.

```js
<ul>
{% raw %}{% for film in films.results %}
<li><a href="/film/{{ film.title | slug }}">{{ film.title }}</a> </li>
{% endfor %}{% endraw %}
</ul>
```

## See the original code

[You can see the Github repo for the demo site here](https://github.com/badlydrawnben/Star-Wars-Eleventy-example). It includes some other bits and bobs and I have just copied the Star Wars title effect CSS from http://polarnotion.github.io/starwarsintro/

It's a bit of a mess as I used that site for experimenting with all sorts of other things so don't use it as a template for your own starter project. The files of interest will be `index.njk`  `_data/films.njk` and `films/index.njk`

## Hiding API keys

## Caching API requests

## Wrapping up

I hope this has given just a small glimpse into the possibilities of pulling external data into Eleventy.

In this case it's a really simple API that isn't updated, so once built, the data won't go out of date. If you want to pull in data like the news or weather then you may well want the site to automatically rebuild itself a few times a day. See the bottom of the [Static Site Generators](/intro-ssg) page for more info about that.



