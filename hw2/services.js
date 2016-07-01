var module = angular.module("MyServices", []); 

module.factory('Folder', function() {
    function Folder(name, ...files) {
        this.name = name;
        this.addFile(...files);
    }

    Folder.prototype.addFile = function(...files) {
        (this.files = this.files || []).push(...files);
    };

    return Folder;
});

module.factory('TodoList', function() {
    function TodoList() {
        this.todos = [];
    }

    TodoList.prototype.addTodo = function(name, description, priority) {
        this.todos.push({ name, description, priority });
    };

    return TodoList;
});