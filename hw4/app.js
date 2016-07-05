angular.module('PlaylistApp', ['PlaylistServices'])

.controller('PlaylistController', function (AGE_OF_MAJORITY) {
    var self = this;

    self.explicit = false;
    self.underage = { disabled: true };

    self.calcExplicitAccess = function () {
        self.underage.disabled = self.age < AGE_OF_MAJORITY;
        if (self.underage.disabled)
            self.explicit = false;
    };
});