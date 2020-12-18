const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const mdIterator = require('markdown-it-for-inline');
const path = require("path");
const Image = require("@11ty/eleventy-img");
let markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {


  eleventyConfig.addPlugin(syntaxHighlight);
  // https://franknoirot.co/posts/external-links-markdown-plugin/
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(mdIterator, 'url_new_win', 'link_open', function (tokens, idx) {
    const [attrName, href] = tokens[idx].attrs.find(attr => attr[0] === 'href')
    
    if (href && (!href.includes('localhost') && !href.startsWith('/') && !href.startsWith('#'))) {
      tokens[idx].attrPush([ 'target', '_blank' ])
      tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ])
    }
  })
  eleventyConfig.setLibrary("md", markdownLibrary)

  
// Need to set this so that posts inherit the 'posts' tag from posts.json file and also use tag from the individual .md pages - otherwise if there is  a tag in a .md file Front Matter, it overrides/replaces anything in posts.json 
  eleventyConfig.setDataDeepMerge(true);


  // eleventy-img config - from https://github.com/11ty/eleventy-img 
  eleventyConfig.addNunjucksAsyncShortcode("myResponsiveImage", async function(src, alt,  myclass = "responsive-img", loading="lazy") {
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
  
   
  
 //sortorder filter to sort posts by filename 
  eleventyConfig.addFilter("sortorder", (arr) => {
   arr.sort((a, b) => (a.fileSlug) > (b.fileSlug) ? 1 : -1);
    return arr;
  });

   // shorten nunjucks filter to strip first 4 characters from permalink
   // i.e. it strips out the 003- from the md filename
  eleventyConfig.addFilter('shorten', function(str) {
    return str.slice(4);
});

 //alphabetical order for EU countries
 eleventyConfig.addFilter("countryAlpha", (arr) => {
  arr.sort((a, b) => (a.country) > (b.country) ? 1 : -1);
   return arr;
 });

 //filter countries that use the Euro
 eleventyConfig.addFilter("euroCountry", (arr) => {
   return arr.filter((d) => (d.currency) == 'Euro') ;
  });
  
 //alphabetical order for EU capitals
 eleventyConfig.addFilter("capitalAlpha", (arr) => {
  arr.sort((a, b) => (a.capital) > (b.capital) ? 1 : -1);
   return arr;
 });

 
  eleventyConfig.addPassthroughCopy('./src/css/styles.css');
  eleventyConfig.addPassthroughCopy('./src/img');
 // eleventyConfig.addPassthroughCopy('./img');
  //eleventyConfig.addPassthroughCopy('./public/img');
  return {
    dir: {
      input: 'src',
      output: 'public'
    }
  }
}
