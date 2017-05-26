angular.module('app').controller('projectsCtrl', function($scope, mainService, $rootScope, $location){

    function getUser() {
        // console.log('getUser function ran!');
        mainService.getUser().then((user) => {
            if (user) {
                $rootScope.currentUser = user;
                $rootScope.isLoggedIn = true;
                // $rootScope.userId = user.id;
                let userId = user.id;
                $scope.getProjects = () => {
                    mainService.getAllProjects(userId).then((response) => {
                        // All Projects
                        $scope.projects = response;

                        // Favorite Projects
                        $scope.favProjects = [];
                        for(let i = 0; i < response.length; i++){
                            if(response[i].fav_wf === true){
                                $scope.favProjects.push(response[i]);
                            }
                        }

                        // Recent Projects
                        let recentArr = response.sort(function(a,b){
                            return new Date(a.wf_date).getTime() - new Date(b.wf_date).getTime();
                        });

                        (recentArr.length <= 3) ? ($scope.recent = recentArr) : ($scope.recent = recentArr.slice(0, 3));
                        
                    });
                }
                
                $scope.getProjects();

                $scope.updateFav = (isFav, index) => {
                    $scope.projects[index].fav_wf = !isFav.fav_wf;
                    isFav.fav_wf = !isFav.fav_wf;

                    mainService.updateFav(isFav).then((response) => {
                        $scope.newFav = response;
                    });
                }


                //Goes in Canvas Ctrl
                $scope.newProject = (projectData) => {
                    projectData.user_id = userId;
                    projectDate.wf_date = new Date();
                    mainService.createProject(projectData).then((response) => {
                        $scope.newPro = response;
                    });
                }

                //Favoriting, deleting shapes, creating shapes, sync project, save existing project.
                $scope.updateProject = () => {
                    projectDate.wf_date = new Date();
                    mainService.updateProject(newData).then((response) => {
                        $scope.updated = response;
                    });
                }

                $scope.deleteProject = (projectId) => {
                    mainService.deleteProject(projectId).then((response) => {
                        $scope.deleted = response;
                    });
                }

            } else {
                $rootScope.isLoggedIn = false;
                // $location.path('homeSplash');
                // console.log('Auth0 Error', err);
            }
        });
    }
    $scope.callUser = getUser();    


})