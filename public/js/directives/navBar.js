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
        controller: function ($scope, $rootScope, mainService, $stateParams, $location) {
            $scope.searchBar = (search) => {
                $rootScope.searchKey = search;
            }
            $scope.logout = mainService.logout;
            
            $scope.logProjectName = function(projectName) {
                $scope.projectNameForReal = projectName;
            }
            $scope.saveProject = function() {
                $rootScope.loader();
                let projectData = {
                    user_id: $rootScope.userId,
                    wf_date: new Date(),
                    wf_name: $scope.projectNameForReal,
                    wf_text: $rootScope.canvas[0].innerHTML
                }
                if($stateParams.id){
                    // UPDATE PROJECT
                    projectData.wf_id = $stateParams.id;
                    mainService.updateProject(projectData).then((response) => {
                        $scope.updated = response;
                    });
                    
                } else{
                    // CREATE NEW PROJECT
                    mainService.createProject(projectData).then((response) => {
                        // $rootScope.newPro = response.data[0];
                        $scope.newId = response.data[0].wf_id;
                        // $location.url('projects');
                    });

                }
                let saveSwal = {
                        title: 'Save Successful!',
                        text: 'Scribble on my scribble pal!',
                        type: 'success',
                        imageUrl: 'https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif'
                    }
                $rootScope.loader(saveSwal);
            }
        }
    }
});