angular.module('app').controller('projectsCtrl', function($scope, mainService, $rootScope, $window){

    function getUser() {
        // console.log('getUser function ran!');
        mainService.getUser().then((user) => {
            if(user.status === 404){
                $rootScope.isLoggedIn = false;
                $window.location.href = '/auth';
            }
            if (user) {
                $rootScope.currentUser = user;
                $rootScope.isLoggedIn = true;
                $rootScope.userId = user.id;
                let userId = user.id;
                $scope.getProjects = () => {
                    mainService.getAllProjects(userId).then((response) => {
                        // All Projects
                        $scope.projects = response;
                        $scope.current = $scope.projects;

                        // Favorite Projects
                        $scope.favProjects = [];
                        for(let i = 0; i < response.length; i++){
                            if(response[i].fav_wf === true){
                                $scope.favProjects.push(response[i]);
                            }
                        }
                        // console.log('fav', $scope.favProjects);

                        let recentArr = response.sort(function(a, b){
                            return new Date(b.wf_date).getTime() - new Date(a.wf_date).getTime();
                        });

                        (recentArr.length <= 5) ? ($scope.recent = recentArr) : ($scope.recent = recentArr.slice(0, 5));

                        // console.log('recent', $scope.recent);

                        $scope.currentProjects = (current) => {
                            if(current === 'projects'){
                                return $scope.current = $scope.projects
                            } else if( current === 'favProjects'){
                                return $scope.current = $scope.favProjects
                            } else if(current === 'recent'){
                                return $scope.current = $scope.recent
                            }
                        }
                        // $rootScope.searchKey;
                        if($rootScope.searchKey){
                            $scope.currentProjects = $scope.projects;
                            $scope.key = $rootScope.search;
                        }
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

            }
        });
    }
    $scope.callUser = getUser();
    
});