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
        templateUrl: 'app/routes/sources/sources.html',
        controller: 'SourcesController',
        controllerAs: 'sourcesCtrl',
        resolve: {
          sources: resolveSources
        }
      })

      .state('source.single', {
        url: '/:sourceId',
        // Overrides ui-view in parent template
        views: {
          "@": {
            templateUrl: 'app/routes/source/source.html',
            controller: 'SourceController',
            controllerAs: 'sourceCtrl'
          }
        }
      })

      .state('prefs', {
        url: '/prefs',
        templateUrl: 'app/routes/prefs/prefs.html',
        controller: 'PrefsController',
        controllerAs: 'prefsCtrl',
        resolve: {
          sources: resolveSources
        }
      })

      .state('feed', {
        url: '/feed',
        templateUrl: 'app/routes/feed/feed.html',
        controller: 'FeedController',
        controllerAs: 'feedCtrl',
        resolve: {
          sources: resolveSources
        }
      })

      ;

    $urlRouterProvider.otherwise('/');

    /** @ngInject */
    function resolveSources(newsApiService) {
      return newsApiService.getSources();
    }
  }

})();
