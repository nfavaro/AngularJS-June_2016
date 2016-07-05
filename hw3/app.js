angular.module('AssignmentApp', ['AssignmentServices'])

.controller('AssignmentController', function (AssignmentList, AssignmentHelper) {
    var self = this;

    updateStats();
    self.addButtonDisabled = true;

    self.addAssignment = function () {
        self.assignmentList = self.assignmentList || new AssignmentList();
        self.assignmentList.addAssignment(self.newName, self.newScore);
        self.newName = self.newScore = undefined;
        self.addButtonDisabled = true;
        updateStats();
    };

    self.removeAssignment = function (index) {
        if (!self.assignmentList)
            return;
        
        self.assignmentList.removeAssignment(index);
        updateStats();
    };

    self.addButtonToggle = function () {
        self.addButtonDisabled = !self.newName || self.newScore == undefined;
    };

    function updateStats() {
        self.stats = AssignmentHelper.calculateStats(self.assignmentList);
    }
})
;