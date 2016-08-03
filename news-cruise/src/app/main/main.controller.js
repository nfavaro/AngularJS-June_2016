(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(newsSources) {
    var self = this;

    fetchSources();

    function fetchSources() {
      newsSources.getSources().then(function (response) {
        self.sources = response.sources;
      });
    }
  }
})();
