(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('FeedController', FeedController);

  /** @ngInject */
  function FeedController(sources, ncPrefs, $timeout, newsArticlesApiService) {
    var self = this;

    self.feedProgress = 0;
    self.articles = [];

    // Timeout to animate on load
    $timeout(fetchSources);
    fetchPreferences();
    fetchArticles();

    self.randNum = function () {
      return Math.floor(Math.random() * 4) + 1;
    }

    // Private function to fetch sources
    function fetchSources() {
      self.sources = {};
      sources.forEach(function (source) {
        self.sources[source.id] = source;
      })
    }

    // Private function to fetch preferences
    function fetchPreferences() {
      self.prefs = ncPrefs.getPrefs();
      self.numPrefs = Object.keys(self.prefs).filter(function (k) { return self.prefs[k]===true}).length;
      console.log(self.numPrefs);
    }

    function fetchArticles() {
      angular.forEach(self.prefs, function (_value, key) {
        if (key === 'name' || key === 'email' || !_value) return;
        newsArticlesApiService.getArticles(key)
          .then(function (data) {
            data.articles.forEach(function (article) {
              article.sourceId = data.source;
            })
            self.articles = self.articles.concat(data.articles);
            self.feedProgress++;
          })
      })
    }

    function startSpinner() {
      self.showSpinner = true;
    }

    function stopSpinner() {
      self.showSpinner = false;
    }
  }
})();