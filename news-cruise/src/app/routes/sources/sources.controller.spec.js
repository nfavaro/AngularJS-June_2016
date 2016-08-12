(function() {
  'use strict';

  describe('sources.controller', function() {
    var self, $timeout; 

    beforeEach(module('newsCruise'));
    beforeEach(inject(function(_$controller_, _$timeout_) {
      self = _$controller_('SourcesController', {
        'sources': [1, 2, 3]
      });
      $timeout = _$timeout_;
    }));

    it('should have undefined sources at load time', function() {
      expect(angular.isUndefined(self.sources)).toBeTruthy();
    });

    it('should assign sources to itself after delaying $timeout', function() {
      $timeout.flush();
      expect(angular.isArray(self.sources)).toBeTruthy();
      expect(self.sources.length > 0);
    });

  });

})();