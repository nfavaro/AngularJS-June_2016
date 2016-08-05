/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('template')
    .constant('WIKI_DEFAULTS', {
      API_END_POINT: 'https://en.wikipedia.org/w/api.php',
      MAX_LINKS: 'max', // server-side default is 500
      THUMB_SIZE: 100,
      MAX_IMAGE_PAGES: 1000, // 50 per page
    })
})();
