(function() {
  'use strict';

  describe('prefs.controller', function() {
    var self, $timeout, ncPrefs; 

    beforeEach(module('newsCruise'));
    beforeEach(inject(function(_$controller_, _$timeout_, _ncPrefs_) {
      self = _$controller_('PrefsController', {
        'sources': [1, 2, 3]
      });
      $timeout = _$timeout_;
      ncPrefs = _ncPrefs_;
    }));

    it('should have undefined sources at load time', function() {
      expect(angular.isUndefined(self.sources)).toBeTruthy();
    });

    it('should assign sources to itself after delaying $timeout', function() {
      $timeout.flush();
      expect(angular.isArray(self.sources)).toBeTruthy();
      expect(self.sources.length > 0);
    });

    it('showOptions should be false and button text "Sign Up" for non-logged-in user', function () {
      self.fetchPreferences();
      expect(self.showOptions).toBeFalsy();
      expect(self.buttonText).toEqual('Sign Up');
    });

    it('showOptions should be true and button text "Update" for logged-in user', function () {
      ncPrefs.setUsername('test user');
      ncPrefs.setEmail('asdf@asdf.com');
      self.fetchPreferences();
      expect(self.showOptions).toBeTruthy();
      expect(self.buttonText).toEqual('Update');      
    });

  });

})();