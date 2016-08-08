(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('SourceController', SourceController);

  /** @ngInject */
  function SourceController(newsArticlesApiService, sources, $timeout, $stateParams) {
    var self = this;

    getSource();
    fetchArticles();

    self.fetchArticles = fetchArticles;

    // Function to fetch articles
    function fetchArticles(sortBy) {
      self.sortBy = sortBy || "top";
      self.articles = [];

      startSpinner();

      newsArticlesApiService.getArticles($stateParams.sourceId, sortBy)
        .then(function (data) {
          self.articles = data.articles;
        })
        // .catch(handleError)
        .finally(stopSpinner);
    }

    // Private function to get selected source
    function getSource() {
      var i = 0, len = sources.length;
      while (i < len) {
        if (sources[i].id === $stateParams.sourceId) {
          self.source = sources[i];
          break;
        }
        i++;
      }
    }

    function startSpinner() {
      self.showSpinner = true;
    }

    function stopSpinner() {
      self.showSpinner = false;
    }
  }
})();