---
title: Data files
tags: 
 - functionality
templateEngineOverride: njk,md 
---
You don't need to create separate files for each item of content. Whilst that makes sense for blog posts or pages, in other situations your data might include a lot of records with little content in each one.

In Eleventy we can pull in data in various formats from within the `_data` folder. If it's a simple json file then it will do it automatically based on the file name.

So for example in my `_data` folder there's a file called `countries.json`. You can see it in the github repo here. It's a straightforward json file with information about the member countries of the European Union.

Here's a snippet:
```json
{
"results" : [

  {
    "objectId": "4LR9T2j7LB",
    "country": "Austria",
    "capital": "Vienna",
    "official_EU_language": "German",
    "yearOfEntry": "01/01/1995",
    "currency": "Euro",
    "currencySymbol": "€",
    "createdAt": "2020-11-27T17:02:54.192Z",
    "updatedAt": "2020-11-27T17:02:54.192Z"
  },
  {
    "objectId": "HACYD9dKm4",
    "country": "Croatia",
    "capital": "Zagreb",
    "official_EU_language": "Croatian",
    "yearOfEntry": "01/07/2013",
    "currency": "Croatian Kuna",
    "currencySymbol": "Kn",
    "createdAt": "2020-11-27T17:02:54.192Z",
    "updatedAt": "2020-11-27T17:02:54.192Z"
  },
  ETC
  ```

If I want to access the data and loop through it, it's already there in Eleventy called `countriesList` (i.e. it's the name of the json file).

Everything is nested in an array called `results` and the name of the country is called `country`.

So to loop through the list of countries all I need to do is this

```
<ul>
    {% raw %}{% for item in countriesList.results -%}
    <li>{{ item.country }}</li>
    {% endfor -%}{% endraw %}
</ul>
```

Which gives me this:
<ul>
{% for item in countriesList.results %}
<li>{{ item.country }}</li>
{% endfor -%}
</ul>

(Note that this the order they appear in the JSON file - it's not quite alphabetical as Romania is at the end)

We can use some custon Nunjucks filters to then play around with the list. To get that working properly we need to add in a template override to our Front Matter to tell it to process nunjucks first, then Markdown:

```md
---
(other Front Matter info)
templateEngineOverride: njk,md 
---
```

Check out the filters page for more about how to create them.

To save space I'm outputting them as inline list

### Order alphaebitcally

Have a look at the filters in the `.eleventy.js` file in the Github repo.

```js
{% raw %}{% for item in countriesList.results | countryAlpha %}{{ item.country }}, {% endfor -%}{% endraw %}
```

{% for item in countriesList.results | countryAlpha %}{{ item.country }}, {% endfor %}


### Reverse the sort order

We can pipe in multiple filters in Nunjucks. The `reverse` one is a built-in one so we don't need to define it.

```js
{% raw %}{% for item in countriesList.results | countryAlpha | reverse %}{{ item.country }}, {% endfor -%}{% endraw %}
```

{% for item in countriesList.results | countryAlpha | reverse %}{{ item.country }}, {% endfor %}

### Sort by capital using the `capitalAlpha` filter

{% for item in countriesList.results | capitalAlpha %}{{ item.capital }}, {% endfor %}

### Filter by countries that use the Euro using the `euroCountry` filter and alphabetise with `countryAlpha` filter

{% for item in countriesList.results | euroCountry | countryAlpha %}{{ item.country }}, {% endfor %}

## Create pages from your data source

If we want to create a separate page for each country then that's easily done too. The process is explained in the APIs and External data page, but in this site we could create a folder called `/src/countries`.

Inside that folder create an index.njk file with this Front Matter. 

```js
 {% raw %}
---
layout:base.njk
pagination:
  data: countriesList.results
  size: 1
  alias: countries
permalink: /countries/{{ countries.country | slug }}/index.html
--- 
 {% endraw %}
```

You can easily use a different layout that displays all the data fields for the country. 

When you build the site you'll see in the console that it works as intended

```
...
Writing public/countries/ireland/index.html from ./src/countries/index.njk.
Writing public/countries/netherlands/index.html from ./src/countries/index.njk.
Writing public/countries/malta/index.html from ./src/countries/index.njk.
Writing public/countries/poland/index.html from ./src/countries/index.njk.
Writing public/countries/luxembourg/index.html from ./src/countries/index.njk.
...
```