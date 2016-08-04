/* global malarkey:false, moment:false */
(function() {
  'use strict';

  var DEV_API_END_POINTS = {
    SOURCES: 'app/json/sources.json',
    ARTICLES: 'https://newsapi.org/v1/articles'
  };
    
  var PROD_API_END_POINTS = {
    SOURCES: 'https://newsapi.org/v1/sources',
    ARTICLES: 'https://newsapi.org/v1/articles'
  };

  angular
    .module('newsCruise')
    // .constant('malarkey', malarkey)
    // .constant('moment', moment);

    .constant('API_END_POINTS', DEV_API_END_POINTS)
    
    .constant('API_KEY', 'e61eec162e044c119205012fda4f4c45')

    ;
})();
