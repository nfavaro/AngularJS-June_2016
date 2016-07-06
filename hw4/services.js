angular.module('PlaylistServices', [])

.value('AGE_OF_MAJORITY', 18)
.value('GENRE_NAMES', ['Rock', 'Pop', 'Rap'])
.value('SONGS_PER_GENRE', 5)

.factory('Song', function () {
    function Song(title) {
        this.title = title;
    }

    return Song;
})

.factory('Genre', function (Song) {
    function Genre(name) {
        this.name = name;
        this.songs = [];
    }

    Genre.prototype.addSong = function (song) {
        this.songs.push(song);
        song.genre = this.name;
    }

    return Genre;
})

.factory('GenreList', function (GENRE_NAMES, SONGS_PER_GENRE, Genre, Song) {
    function GenreList(genreNames, songsPerGenre) {
        this.list = [];

        var genreNames = genreNames || GENRE_NAMES,
            songsPerGenre = songsPerGenre || SONGS_PER_GENRE,
            genreName, genre, song, i, j;

        for (i in genreNames) {
            genreName = genreNames[i];
            genre = new Genre(genreName);
            this.list.push(genre);

            for (j = 1; j <= songsPerGenre; j++) {
                song = new Song(genreName + " song #" + j);
                genre.addSong(song);
            }
        }
    }

    return GenreList;
})

.factory('User', function (Song) {
    function User(name, explicit) {
        this.name = name;
        this.explicit = explicit;
        this.songs = [];
    }

    User.prototype.addSong = function (song) {
        this.songs.push(song);
    };

    return User;
})

.service('PlayListHelper', function () {
    var self = this;

    self.extractSelectedSongs = function (genreList) {
        var i, j, song, songs, genre,
            genres = genreList.list,
            selectedSongs = [];

        for (i in genres) {
            genre = genres[i];
            songs = genre.songs;
            for (j in songs) {
                song = songs[j];
                if (song.selected) {
                    selectedSongs.push(song);
                }
            }
        }

        return selectedSongs;
    };
})