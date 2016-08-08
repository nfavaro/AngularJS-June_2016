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
        url: '/source',
        templateUrl: 'app/sources/sources.html',
        controller: 'SourcesController',
        controllerAs: 'sourcesCtrl',
        resolve: {
          /** @ngInject */
          sources: function (newsApiService) {
            return newsApiService.getSources();
          }
        }
      })

      .state('source.single', {
        url: '/:sourceId',
        // Overrides ui-view in parent template
        views: {
          "@": {
            templateUrl: 'app/sources/source.html',
            controller: 'SourceController',
            controllerAs: 'sourceCtrl'
          }
        }

      })

      ;

    $urlRouterProvider.otherwise('/');
  }

})();
