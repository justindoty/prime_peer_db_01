angular.module('assignmentApp', ['ngAnimate', 'ui.bootstrap']);

angular.module('assignmentApp').controller('AssignmentController', function($http){
  var vm = this;
  vm.isCollapsed = false;
  vm.isCollapsedHorizontal = false;
    vm.doAction = function(){
      var sendData = {};

      sendData.assignment_name = vm.assignment_name;
      sendData.student_name = vm.student_name;
      sendData.score = vm.score;
      sendData.date_completed = vm.date_completed;

      console.log('clicked and posted!');
      $http.post('/assignment/addAssignment', sendData).then(handleSuccess,handleFailure);
      vm.getAssignments();
    }

    vm.getAssignments = function(){
      $http.get('/assignment').then(function(response){
        console.log('Success: ', response);
        vm.assignments = response.data;
      }, function(response){
        console.log('err', response);
      })
    }

    vm.deleteAssignment = function(id){
      console.log('PRESSED THE BUTTON! Here\'s the ID: ', id);
      $http.delete('assignment/removeById/' + id).then(function(response){
        console.log('Success: ', response);
        vm.getAssignments();
      }, function(response){
        console.log('err', response);
      })
    }

    //Unfinished 'edit assignment' functionality
    // vm.editAssignment = function(){
    //   console.log('Pressed the edit button');
    //   $http.put('assignment/editAssignment').then(function(response){
    //     console.log('Success: ', response);
    //     vm.getAssignments()
    //   }, function(response){
    //     console.log('err', response);
    //   })
    // }


    vm.getAssignments();

    function handleSuccess(response){
      console.log('You did it!', response);
    }
    function handleFailure(response){
      console.log('You did not do it:', response);
    }

})
