const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const mdIterator = require('markdown-it-for-inline')
let markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {

  eleventyConfig.addCollection("basics", function(collectionApi) {
    return collectionApi.getFilteredByTag("basics");
  });
  eleventyConfig.addCollection("functionality", function(collectionApi) {
    return collectionApi.getFilteredByTag("functionality");
  });
  eleventyConfig.addCollection("extending", function(collectionApi) {
    return collectionApi.getFilteredByTag("extending");
  });

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

  
  eleventyConfig.addPassthroughCopy('./src/css/styles.css');
  eleventyConfig.addPassthroughCopy('./src/img');
  return {
    dir: {
      input: 'src',
      output: 'public'
    }
  }
}
