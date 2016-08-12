(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('FeedController', FeedController);

  /** @ngInject */
  function FeedController(sources, ncPrefs, $timeout, newsApiService) {
    var self = this;

    self.feedProgress = 0;
    self.articles = [];

    // Timeout to animate on load
    $timeout(fetchSources);
    fetchPreferences();
    fetchArticles();

    // Fetches sources
    function fetchSources() {
      self.sources = sources;
    }

    // Fetches preferences
    function fetchPreferences() {
      self.prefs = ncPrefs.getPrefs();
      self.numPrefs = Object.keys(self.prefs).filter(function (pref) { 
        return self.prefs[pref] === true; 
      }).length;
    }

    // Fetches articles
    function fetchArticles() {
      angular.forEach(self.prefs, function (value, key) {
        if (!value) return;
        newsApiService.getArticles(key)
          .then(function (data) {
            self.articles = self.articles.concat(data);
            self.feedProgress++;
          })
      })
    }
  }
})();