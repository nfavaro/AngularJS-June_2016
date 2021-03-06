(function() {
  'use strict';

  angular
    .module('newsCruise')
    .config(config);

  /** @ngInject */
  function config($logProvider, usSpinnerConfigProvider, ncPrefsProvider) {
    // Set pre-configured preference selections
    var _prefs = { 
        'bbcnews': true,
        'entertainmentweekly': true,
        'thehuffingtonpost': true
    };
    ncPrefsProvider.setPreConfigPrefs(_prefs);

    // Enable log
    $logProvider.debugEnabled(true);

    // angular-spinner defaults
    usSpinnerConfigProvider.setDefaults({
      lines: 17 // The number of lines to draw
    , length: 0 // The length of each line
    , width: 5 // The line thickness
    , radius: 61 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.15 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 2 // Rounds per second
    , trail: 48 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'fixed' // Element positioning
    });
  }

})();
