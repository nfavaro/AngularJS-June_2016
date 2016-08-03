(function() {
  'use strict';

  angular
    .module('newsCruise')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
