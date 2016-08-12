(function() {
  'use strict';

  var DEV_API_END_POINTS = {
    SOURCES: 'json/sources.json',
    ARTICLES: 'https://newsapi.org/v1/articles'
  };
    
  var PROD_API_END_POINTS = {
    SOURCES: 'https://newsapi.org/v1/sources',
    ARTICLES: 'https://newsapi.org/v1/articles'
  };

  angular
    .module('newsCruise')

    /** CHANGE VALUE BETWEN DEV_* AND PROD_* DEPENDING ON ENVIRONMENT */
    .constant('API_END_POINTS', PROD_API_END_POINTS)
    
    //TODO: hide API key in hypothetical backend
    .constant('API_KEY', 'e61eec162e044c119205012fda4f4c45')

    ;
})();
