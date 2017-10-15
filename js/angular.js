"use strict";

function ngAppExampleController($scope, $timeout) {
    $scope.button = 'list';
    $scope.data = {
        done: false,
        newTodo: '',
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
                details:false,
                className: 'animated bounceIn',
                created:$scope.getDate(),
                completed:'not completed',
                archived:''
            });
            $scope.data.newTodo = '';
            localStorage.setItem('list', JSON.stringify($scope.data.todo));
        }

    };

    $scope.getCountOfCompleted = function () {
        return $scope.data.todo.reduce((p, c) => c.done ? ++p : p, 0);
    };

    $scope.removeItem = function (todo) {
            todo.className = 'animated bounceIn';
            todo.archived = $scope.getDate();
            var arr = $scope.data.todo.splice($scope.data.todo.indexOf(todo), 1);
            $scope.data.archive = $scope.data.archive.concat(arr);
            localStorage.setItem('list', JSON.stringify($scope.data.todo));
            localStorage.setItem('archive', JSON.stringify($scope.data.archive));
        };
    $scope.checkItem = function (todo) {
        todo.className = 'checked animated bounceOut';
        $timeout(function () {
            todo.className = 'animated bounceIn';
            todo.completed = $scope.getDate();
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
        } else if(arr === $scope.data.check) {
            todo.className = 'animated bounceOut';
            $timeout(function () {
                $scope.data.check.splice($scope.data.check.indexOf(todo), 1);
                localStorage.setItem('check', JSON.stringify($scope.data.check));
            }, 900);
        }
    };

    $scope.getDate = function(){
        var date = new Date();
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ':' + date.getHours() + '.' + date.getMinutes();
    };
    $scope.archiveItem = function (todo) {
        todo.className = 'checked animated bounceOut';
        $timeout(function () {
            todo.className = 'animated bounceIn';
            todo.archived = $scope.getDate();
            var arr = $scope.data.check.splice($scope.data.check.indexOf(todo), 1);
            $scope.data.archive = $scope.data.archive.concat(arr);
            localStorage.setItem('archive', JSON.stringify($scope.data.archive));
            localStorage.setItem('check', JSON.stringify($scope.data.check));
        }, 900);
    };
    $scope.getDetails = function (todo) {
        console.log(todo);
        return todo.details?todo.details=false:todo.details=true;
    };
  
}