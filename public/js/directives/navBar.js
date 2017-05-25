angular.module('app').directive('navBar', function(){
    return {
        restrict: 'E',
        templateUrl: './views/directives/navBar.html',
        controller: function($scope, mainService){
            $scope.logout = mainService.logout;
            if(!$scope.projectName){
            	$scope.projectName = 'Untitled';
            }
        }
    }
});