var module = angular.module("ThemeApp", []);

module.controller("ThemeController", function() {
    var self = this;

    self.defaultTheme = "defaultTheme";
    self.redTheme = "redTheme";
    self.blueTheme = "blueTheme";
    self.yellowTheme = "yellowTheme";
    self.greenTheme = "greenTheme";

    self.selectedTheme = self.defaultTheme;

    // For use with ng-repeat:

    self.themes = {
        Default: self.defaultTheme,
        Red: self.redTheme,
        Blue: self.blueTheme,
        Yellow: self.yellowTheme,
        Green: self.greenTheme
    };
});