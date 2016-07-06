angular.module('PlaylistApp', ['PlaylistServices'])

.controller('PlaylistController', function (AGE_OF_MAJORITY, GenreList, User, PlayListHelper) {
    var self = this;

    self.explicit = false;
    self.underage = { disabled: true };
    self.genreList = new GenreList();

    self.calcExplicitAccess = function () {
        self.underage.disabled = self.age < AGE_OF_MAJORITY;
        if (self.underage.disabled)
            self.explicit = false;
    };

    self.submit = function () {
        self.user = new User(self.username, self.explicit);
        self.user.songs = PlayListHelper.extractSelectedSongs(self.genreList);
        console.log(self.user);
    };
});