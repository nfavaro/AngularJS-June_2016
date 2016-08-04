(function() {
  'use strict';

  angular
    .module('newsCruise')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      })

      .state('source', {
        url: '/source/:sourceId',
        templateUrl: 'app/sources/sources.html',
        controller: 'SourcesController',
        controllerAs: 'sourcesCtrl',
        resolve: {
          /** @ngInject */
          sources: function (newsApiService, $stateParams) {
            return newsApiService.getSources($stateParams.sourceId);
          }
        }
      })

      ;

    $urlRouterProvider.otherwise('/');
  }

})();
