(function() {
  'use strict';

  angular
    .module('template')
    .controller('MainController', MainController)
    .service('MainControllerService', MainControllerService);

  /** @ngInject */
  function MainController(MainControllerService) {
    var self = this;

    clearResults();

    self.updateResults = function (searchTerm) {
      if (!searchTerm || searchTerm === "") return clearResults();

      MainControllerService.getMapResults(searchTerm).then(parseAddresses, console.error);
    };

    function parseAddresses(response) {
      clearResults(true);
      angular.forEach(response.results, function (result) {
        self.results.push(result.formatted_address);
      });
      self.numResults = self.results.length || "No";
    }

    function clearResults(hasSearched) {
      self.results = [];
      self.hasSearched = hasSearched;
    }

  }

  function MainControllerService($resource) {
    var self = this,
        apiEndPoint = "http://maps.googleapis.com/maps/api/geocode/json",
        mapResource = $resource(apiEndPoint);

    self.getMapResults = function (searchTerm)  {
      return mapResource.get({ address: searchTerm }).$promise;
    };
  }
})();
