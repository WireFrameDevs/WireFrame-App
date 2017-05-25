angular.module('app').directive('navBar', function(){
    return {
        restrict: 'E',
        templateUrl: './views/directives/navBar.html',
        link: function(scope, elem, attrs){

        },
        controller: function($scope, mainService, $location, $stateParams){
            $scope.logout = mainService.logout;
            console.log($location.path())
            // $scope.isActive = function(viewLocation) {
            //     return viewLocation === '/canvas';
            // };
        }
    }
})