"use strict";

function ngAppExampleController($scope, $timeout) {
    $scope.button = 'list';
    $scope.data = {
        done: false,
        newTodo: '',
        created: new Date(),
        updated:'',
        deleted: '',
        todo: JSON.parse(localStorage.getItem('list')) || [],
        archive: JSON.parse(localStorage.getItem('archive')) || [],
        check: JSON.parse(localStorage.getItem('check')) || []
    };
    $scope.addItem = function () {
        if ($scope.data.newTodo.length === 0) {
            alert('You must be doing something wrong');
        } else {
            $scope.data.todo.push({
                name: $scope.data.newTodo,
                done: $scope.data.done,
                className: 'animated bounceIn'
            });
            $scope.data.newTodo = '';
            localStorage.setItem('list', JSON.stringify($scope.data.todo));
        }

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
        console.log(todo);
        var arr = $scope.data.todo.splice($scope.data.todo.indexOf(todo), 1);
        $scope.data.archive = $scope.data.archive.concat(arr);
        localStorage.setItem('list', JSON.stringify($scope.data.todo));
        localStorage.setItem('archive', JSON.stringify($scope.data.archive));
    };
    $scope.checkItem = function (todo) {
        todo.className = 'checked animated bounceOut';
        $timeout(function () {
            var arr = $scope.data.todo.splice($scope.data.todo.indexOf(todo), 1);
            $scope.data.check = $scope.data.check.concat(arr);
            localStorage.setItem('list', JSON.stringify($scope.data.todo));
            localStorage.setItem('check', JSON.stringify($scope.data.check));
        }, 900);
    };
    $scope.removeItemForever = function (todo,arr) {
        if (arr === $scope.data.archive) {
            todo.className = 'animated bounceOut';
            $timeout(function () {
                $scope.data.archive.splice($scope.data.archive.indexOf(todo), 1);
                localStorage.setItem('archive', JSON.stringify($scope.data.archive));
            }, 900);
        } else {
            todo.className = 'animated bounceOut';
            $timeout(function () {
                $scope.data.check.splice($scope.data.check.indexOf(todo), 1);
                localStorage.setItem('check', JSON.stringify($scope.data.check));
            }, 900);
        }
    };
    
  
}
