var module = angular.module("FolderApp", ["MyServices"]);

module.controller("FolderController", function(Folder, TodoList) {
    var self = this;

    self.folders = [
        new Folder("Folder 1", "File 1.1", "File 1.2", "File 1.3"), 
        new Folder("Folder 2", "File 2.1", "File 2.2", "File 2.3"), 
        new Folder("Folder 3", "File 3.1", "File 3.2", "File 3.3")
    ];

    self.todoList = new TodoList();
});