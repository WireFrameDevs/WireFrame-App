angular.module('app').controller('projectsCtrl', function($scope, mainService, $rootScope){

    function getUser() {
        // console.log('getUser function ran!');
        mainService.getUser().then((user) => {
            if (user) {
                $rootScope.currentUser = user;
                $rootScope.isLoggedIn = true;
                $rootScope.userId = user.id;
                let userId = user.id;
                $scope.getProjects = () => {
                    mainService.getAllProjects(userId).then((response) => {
                        // All Projects
                        $scope.projects = response;
                        console.log($scope.projects)
                        // Favorite Projects
                        console.log($scope.projects);

                        $scope.current = $scope.projects;                    
                        $scope.favProjects = [];
                        for(let i = 0; i < response.length; i++){
                            if(response[i].fav_wf === true){
                                $scope.favProjects.push(response[i]);
                            }
                        }
                        console.log('fav', $scope.favProjects);

                        let recentArr = response.sort(function(a,b){
                            return new Date(a.wf_date).getTime() - new Date(b.wf_date).getTime();
                        });

                        (recentArr.length <= 3) ? ($scope.recent = recentArr) : ($scope.recent = recentArr.slice(0, 3));

                        console.log('recent', $scope.recent);

                        $scope.currentProjects = (current) => {
                            if(current === 'projects'){
                                return $scope.current = $scope.projects
                            } else if( current === 'favProjects'){
                                return $scope.current = $scope.favProjects
                            } else if(current === 'recent'){
                                return $scope.current = $scope.recent
                            }
<<<<<<< HEAD
                        }
                


=======
                        }   
>>>>>>> master
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
    
});