angular.module('AssignmentServices', [])

.factory('AssignmentList', function () {
    function AssignmentList() {
        this.assignments = [];
    }

    AssignmentList.prototype.addAssignment = function (name, score) {
        this.assignments.push({ name, score });
    };

    AssignmentList.prototype.removeAssignment = function (index) {
        this.assignments.splice(index, 1);
    };

    return AssignmentList;
})

.value('GRADE_LEVELS', {
    60: "F",
    70: "D",
    80: "C",
    90: "B",
})

.value('PASSING_GRADES', {
    A: true,
    B: true,
    C: true,
})

.service('AssignmentHelper', function (GRADE_LEVELS, PASSING_GRADES) {
    var self = this;

    self.calculateStats = function (assignmentList) {
        var average = calculateAverage(assignmentList);
        var grade = calculateGrade(average);
        var passed = calculatePass(grade);

        return { average, grade, passed };
    }

    function calculateAverage(assignmentList) {
        if (!assignmentList)
            return 0;

        var sum = 0;
        for (var assignment of assignmentList.assignments)
            sum += assignment.score;

        return sum / (assignmentList.assignments.length || 1);
    }

    function calculateGrade(score) {
        for (var gradeLevel in GRADE_LEVELS)
            if (score < gradeLevel)
                return GRADE_LEVELS[gradeLevel];

        return "A";
    }

    function calculatePass(grade) {
        return (PASSING_GRADES[grade] ? "Yes" : "No");
    }
})

;