(function() {
  'use strict';

  angular
    .module('newsCruise')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, newsApiServiceProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      })

      // All sources
      .state('source', {
        url: '/source',
        templateUrl: 'app/routes/sources/sources.html',
        controller: 'SourcesController',
        controllerAs: 'sourcesCtrl',
        resolve: {
          sources: resolveSources
        }
      })

      // Single source
      .state('source.single', {
        url: '/:sourceId',
        resolve: {
          source: resolveSources
        },
        // Overrides ui-view in parent template
        views: {
          "@": {
            templateUrl: 'app/routes/source/source.html',
            controller: 'SourceController',
            controllerAs: 'sourceCtrl'
          }
        }
      })

      // Preferences view
      .state('prefs', {
        url: '/prefs',
        templateUrl: 'app/routes/prefs/prefs.html',
        controller: 'PrefsController',
        controllerAs: 'prefsCtrl',
        resolve: {
          sources: resolveSources
        }
      })

      // Personal feed view
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/routes/feed/feed.html',
        controller: 'FeedController',
        controllerAs: 'feedCtrl',
        resolve: {
          // gets sources as object
          sources: newsApiServiceProvider.$get().getSourcesObject
        }
      })

      ;

    $urlRouterProvider.otherwise('/');

    // Resolves all or selected source
    /** @ngInject */
    function resolveSources(newsApiService, $stateParams) {
      var _id = $stateParams.sourceId;
      return newsApiService.getSources(_id);
    }
  }

})();
