angular.module('todo',[])
  .controller('mainCtrl',function ($scope,$http) {
    $scope.todos = [];
    $http({
      method : 'get',
      url : '/api'
    }).then(function (res) {
      $scope.todos = res.data;
    })

    $scope.deleteTask = function (id) {
      $http({
        url : '/delete',
        method : "post",
        data: {id:id}
      }).then(function (res) {
        console.log(res.data);
        $scope.todos = res.data;
      })
    }

    $scope.addNewTodo = function () {
      $http({
        url : '/add',
        method : 'post',
        data : {msg:$scope.newMsg}
      }).then(function (res) {
        $scope.todos = res.data;
      })
    }
  })
