const ghpages = require('gh-pages');

ghpages.publish('build', {
  remote: 'demo',
});
