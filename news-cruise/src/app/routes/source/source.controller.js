(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('SourceController', SourceController);

  /** @ngInject */
  function SourceController(newsApiService, source, $timeout, $stateParams) {
    var self = this;

    getSource();
    fetchArticles();

    self.fetchArticles = fetchArticles;

    // Function to fetch articles
    function fetchArticles(sortBy) {
      self.sortBy = sortBy || "top";
      self.articles = [];

      startSpinner();

      newsApiService.getArticles($stateParams.sourceId, sortBy)
        .then(function (articles) {
          self.articles = articles;
        })
        .catch(handleError)
        .finally(stopSpinner);
    }

    // Get source
    function getSource() {
      self.source = source;
    }

    // Error handler
    function handleError() {
      self.apiCallFailed = true;
    }

    // Start/stop spinner
    function startSpinner() {
      self.showSpinner = true;
    }

    function stopSpinner() {
      self.showSpinner = false;
    }
  }
})();