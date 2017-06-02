angular.module('app').controller('projectsCtrl', function($scope, mainService, $rootScope, $window, $timeout){
  
	$rootScope.showLoader = false;

    $rootScope.loader = function(sweetObject){
        $rootScope.showLoader = true;
        $timeout(function(){
            $rootScope.showLoader = false;
            swal(sweetObject);
        }, 2500)
    }

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
                $scope.favProjects = [];

                $scope.getProjects = () => {
                    mainService.getAllProjects(userId).then((response) => {
                        // All Projects
                        $scope.projects = response;
                        $rootScope.projectsForCanvas = response;
                        
                        $scope.current = $scope.projects;

                        // Favorite Projects
                        for (let i = 0; i < response.length; i++) {
                            if (response[i].fav_wf === true) {
                                $scope.favProjects.push(response[i]);
                            }
                        }
                        // console.log('fav', $scope.favProjects);

                        //Recent Projects
                        let recentArr = response.sort(function(a, b){
                            return new Date(b.wf_date).getTime() - new Date(a.wf_date).getTime();
                        });

                        (recentArr.length <= 5) ? ($scope.recent = recentArr) : ($scope.recent = recentArr.slice(0, 5));

                        // console.log('recent', $scope.recent);

                        $scope.currentProjects = (current) => {
                            if (current === 'projects') {
                                $rootScope.isTab = false;
                                return $scope.current = $scope.projects
                            } else if (current === 'favProjects') {
                                $rootScope.isTab = true;
                                return $scope.current = $scope.favProjects
                            } else if (current === 'recent') {
                                $rootScope.isTab = false;
                                return $scope.current = $scope.recent
                            }
                        }

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
                        $scope.newFav = response[0];
                        if($scope.newFav.fav_wf){
                            $scope.favProjects.push($scope.newFav);
                        } else {
                            for (let i = 0; i < $scope.favProjects.length; i++) {
                                if($scope.newFav.wf_id === $scope.favProjects[i].wf_id){
                                    $scope.favProjects.splice(i, 1);
                                }
                            }
                            if($rootScope.isTab){
                                let favElement = angular.element(document.querySelector('#project' + index));
                                favElement.remove();
                            }
                        }
                    });
                }

                

                $scope.deleteProject = (projectId) => {
                    $rootScope.loader();
                    mainService.deleteProject(projectId).then((response) => {
                        $scope.deleted = response;
                        $scope.getProjects();
                        let deleteSwal = {
                            title: 'Project Deleted!',
                            text: 'FOR-EVER!',
                            type: 'success',
                            imageUrl: 'https://media.giphy.com/media/hEwkspP1OllJK/giphy.gif'
                        };
                        $rootScope.loader(deleteSwal);
                    });
                    
                }

            }
        });
    }
    $scope.callUser = getUser();



    $scope.flipped = false;
    function onChange(){
        $scope.isFlipped = !scope.isFlipped;
    }
});