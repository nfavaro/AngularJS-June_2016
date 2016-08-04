(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('SourcesController', SourcesController);

  /** @ngInject */
  function SourcesController(newsArticlesApiService, sources, $timeout, $stateParams) {
    var self = this;

    // Timeout to animate on load
    $timeout(fetchSources);
    fetchArticles($stateParams.sourceId);

    // Private function to fetch sources
    function fetchSources() {
      self.sources = sources;
      console.log(self.sources);
    }

    // Private function to fetch articles
    function fetchArticles(source, sortBy) {
      if (!source) return;

      newsArticlesApiService.getArticles(source, sortBy)
        .then(function (data) {
          self.articles = data.articles;
        })
        // .catch(handleError)
        // .finally(stopSpinner);
    }
  }
})();