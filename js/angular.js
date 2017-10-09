"use strict";

function ngAppExampleController($scope) {
    $scope.button = '';
    $scope.data = {
        done: false,
        newTodo: '',
        created: new Date(),
        updated: null,
        deleted: null,
        todo: JSON.parse(localStorage.getItem('list')) || [],
        archive: JSON.parse(localStorage.getItem('archive')) || [],
        check: JSON.parse(localStorage.getItem('check')) || []
    };
    $scope.addItem = function () {
        $scope.data.todo.push({
            name: $scope.data.newTodo,
            done: $scope.data.done
        });
        localStorage.setItem('list', JSON.stringify($scope.data.todo));
    };
    $scope.removeCompletedItems = function () {
        $scope.data.todo = $scope.data.todo.filter(function (todos) {
            if (todos.done) {
                $scope.data.archive.push(todos);
                todos.done = false;
                return false;
            } else {
                return true;
            }
        });
        localStorage.setItem('list', JSON.stringify($scope.data.todo));
        localStorage.setItem('archive', JSON.stringify($scope.data.archive));
    };
    $scope.getCountOfCompleted = function () {
        return $scope.data.todo.reduce((p, c) => c.done ? ++p : p, 0);
    };

    $scope.removeItem = function (todo) {
        var arr = $scope.data.todo.splice($scope.data.todo.indexOf(todo), 1);
        $scope.data.archive = $scope.data.archive.concat(arr);
        console.log($scope.button);
        localStorage.setItem('list', JSON.stringify($scope.data.todo));
        localStorage.setItem('archive', JSON.stringify($scope.data.archive));
    };
    $scope.checkItem = function (todo) {
        var arr = $scope.data.todo.splice($scope.data.todo.indexOf(todo), 1);
        $scope.data.check = $scope.data.check.concat(arr);
        console.log($scope.button);
        localStorage.setItem('list', JSON.stringify($scope.data.todo));
        localStorage.setItem('check', JSON.stringify($scope.data.check));
    };
    $scope.removeAll = function (todo) {
        if (todo === $scope.data.archive) {
            $scope.data.archive = [];
            localStorage.removeItem('archive');
        } else if (todo === $scope.data.check) {
            $scope.data.check = [];
            localStorage.removeItem('check');
        }
    };
}
