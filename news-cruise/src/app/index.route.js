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
        controller: 'MainController as mainCtrl'
      })

      .state('source', {
        url: '/source/:sourceId',
        template: '<p>Hello</p>',
        controller: function () {

        }
      })

      ;

    $urlRouterProvider.otherwise('/');
  }

})();
