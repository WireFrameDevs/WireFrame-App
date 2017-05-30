angular.module('app').directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/navBar.html',
        link: function (scope, elem, attrs) {
            $('#save').hover(
                function () {
                    $('tip-save').addClass('fadeIn');
                })

        },
        controller: function ($scope, $rootScope, mainService, $stateParams) {
            $scope.logout = mainService.logout;
            
            if (!$scope.projectName) {
                $scope.projectName = 'Untitled';
            }
            $scope.logProjectName = function(projectName) {
                $scope.projectNameForReal = projectName;
            }
            $scope.saveProject = function() {
                let projectData = {
                    user_id: $rootScope.userId,
                    wf_date: new Date(),
                    wf_name: $scope.projectNameForReal,
                    wf_text: $rootScope.canvas[0].innerHTML
                }
                if($stateParams.id){
                    //Favoriting, deleting shapes, creating shapes, sync project, save existing project.
                        projectData.wf_id = $stateParams.id;
                        console.log('update from button')
                        mainService.updateProject(projectData).then((response) => {
                            $scope.updated = response;
                        });
                    
                } else{
                    mainService.createProject(projectData).then((response) => {
                        $scope.newPro = response;
                    });

                }
            }
        }
    }
});