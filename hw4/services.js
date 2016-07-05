angular.module('PlaylistServices', [])

.value('AGE_OF_MAJORITY', 18)

.factory('Genre', function () {
    function Genre() {
        this.songs = [];
    }

    Genre.prototype.addSong = function (name) {
        this.songs.push({ name });
    }

    return Genre;
})