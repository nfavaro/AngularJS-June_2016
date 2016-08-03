/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('newsCruise')
    // .constant('malarkey', malarkey)
    // .constant('moment', moment);

    .constant('API_END_POINTS', {
      SOURCES: 'https://newsapi.org/v1/sources',
      ARTICLES: 'https://newsapi.org/v1/articles'
    })
    .constant('API_KEY', 'e61eec162e044c119205012fda4f4c45');
})();
