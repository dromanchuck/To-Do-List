"use strict";

function ngAppExampleController($scope) {
    $scope.data = {
        done: false,
        newTodo: 'Do something!',
        created: new Date(),
        updated: null,
        deleted: null,
        todo: JSON.parse(localStorage.getItem('list'))||[],
        archive: JSON.parse(localStorage.getItem('archive'))||[],
        check: JSON.parse(localStorage.getItem('done'))||[]
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
                todos.done=false;
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
        localStorage.setItem('list', JSON.stringify($scope.data.todo));
        localStorage.setItem('archive', JSON.stringify($scope.data.archive));
    };
    $scope.checkTodo = function (todo) {
        $scope.data.check = $scope.data.check.concat($scope.data.todo.splice($scope.data.todo.indexOf(todo), 1));
        localStorage.setItem('list', JSON.stringify($scope.data.todo));
        localStorage.setItem('done', JSON.stringify($scope.data.check));
    };
}
