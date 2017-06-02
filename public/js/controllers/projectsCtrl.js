
angular.module('app').controller('projectsCtrl', function($scope, mainService, $rootScope, $window, $compile, $timeout) {

    $rootScope.showLoader = false;

    $rootScope.loader = function (sweetObject) {
        $rootScope.showLoader = true;
        $timeout(function () {
            $rootScope.showLoader = false;
            swal(sweetObject);
        }, 2500)
    }

  function operationThumbnailGo(index, html) {
    let desertStorm = '#project' + index + ' div > svg';
    let projectThumb = angular.element(document.querySelector(desertStorm));
    projectThumb.append(html)
  }

  $rootScope.isLoggedIn = false;

  function getUser() {
    // console.log('getUser function ran!');
    mainService.getUser().then((user) => {
      if (user.status === 404) {
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
            $scope.filtered = response;

            setTimeout(function() {
              for (let i = 0; i < $rootScope.projectsForCanvas.length; i++) {
                let template = ("<svg><image width='100%' height='100%' xlink:href='./images/grid.png' preserveAspectRatio='none'/></svg>" + $rootScope.projectsForCanvas[i].wf_text);
                let linkFn = $compile(template);
                let content = linkFn($scope);
                operationThumbnailGo(i, content);
              }
            }, 100)

            $scope.current = $scope.projects;
            $scope.currentTab = 'Projects';
            $scope.activeP = 'active-item';

            // Favorite Projects
            for (let i = 0; i < response.length; i++) {
              if (response[i].fav_wf === true) {
                $scope.favProjects.push(response[i]);
              }
            }
            // console.log('fav', $scope.favProjects);

            //Recent Projects
            let recentArr = response.sort(function(a, b) {
              return new Date(b.wf_date).getTime() - new Date(a.wf_date).getTime();
            });

            (recentArr.length <= 5)
              ? ($scope.recent = recentArr)
              : ($scope.recent = recentArr.slice(0, 5));

            // console.log('recent', $scope.recent);

            $scope.currentProjects = (current) => {
                if (current === 'projects') {
                    $scope.currentTab = 'Projects';
                    $scope.activeP = 'active-item';
                    $scope.activeF = '';
                    $scope.activeR = '';
                    $rootScope.isTab = false;
                    $scope.current = $scope.projects;
                    setTimeout(function() {
                      for (let i = 0; i < $scope.projects.length; i++) {
                        let desertStorm = '#project' + i + ' div > svg';
                        let htmlEmptier = angular.element(document.querySelector(desertStorm));
                        htmlEmptier.empty();

                        let content = "<svg><image width='100%' height='100%' xlink:href='./images/grid.png' preserveAspectRatio='none'/></svg>" + $scope.projects[i].wf_text;
                        operationThumbnailGo(i, content);
                      }
                    }, 100)
                    return;
                } else if (current === 'favProjects') {
                    $scope.currentTab = 'Starred';
                    $scope.activeF = 'active-item';
                    $scope.activeP = '';
                    $scope.activeR = '';
                    $rootScope.isTab = true;
                    $scope.current = $scope.favProjects;
                    setTimeout(function() {
                      for (let i = 0; i < $scope.favProjects.length; i++) {
                        let desertStorm = '#project' + i + ' div > svg';
                        let htmlEmptier = angular.element(document.querySelector(desertStorm));
                        htmlEmptier.empty();
                        let content = ("<svg><image width='100%' height='100%' xlink:href='./images/grid.png' preserveAspectRatio='none'/></svg>" + $scope.favProjects[i].wf_text);
                        operationThumbnailGo(i, content);
                      }
                    }, 100)
                    return;
                } else if (current === 'recent') {
                    $scope.currentTab = 'Recent';
                    $scope.activeR = 'active-item';
                    $scope.activeP = '';
                    $scope.activeF = '';
                    $rootScope.isTab = false;
                    $scope.current = $scope.recent;
                    setTimeout(function() {
                      for (let i = 0; i < $scope.recent.length; i++) {
                        let desertStorm = '#project' + i + ' div > svg';
                        let htmlEmptier = angular.element(document.querySelector(desertStorm));
                        htmlEmptier.empty();
                        let content = ("<svg><image width='100%' height='100%' xlink:href='./images/grid.png' preserveAspectRatio='none'/></svg>" + $scope.recent[i].wf_text);
                        operationThumbnailGo(i, content);
                      }
                    }, 100)
                    return;
                }
            }

          });
        }

        $scope.getFilteredThumbnails = function(project) {
         
          let re = new RegExp('^' + $scope.searchKey, 'i');
          let result =  re.test(project.wf_name)
          for (let i = 0; i < $scope.filtered.length; i++) {
            for(let j = 0; j < $rootScope.projectsForCanvas.length; j++) {
              if ($scope.filtered[i].wf_id === $rootScope.projectsForCanvas[j].wf_id) {
                let desertStorm = '#project' + i + ' div > svg';
                let htmlEmptier = angular.element(document.querySelector(desertStorm));
                htmlEmptier.empty();
                let content = ("<svg><image width='100%' height='100%' xlink:href='./images/grid.png' preserveAspectRatio='none'/></svg>" + $scope.filtered[i].wf_text);
                operationThumbnailGo(i, content);

               }
            }

          }
          return result;


        }

        $scope.getProjects();

        $scope.updateFav = (isFav, index) => {
          $scope.projects[index].fav_wf = !isFav.fav_wf;
          isFav.fav_wf = !isFav.fav_wf;

          mainService.updateFav(isFav).then((response) => {
            $scope.newFav = response[0];
            if ($scope.newFav.fav_wf) {
              $scope.favProjects.push($scope.newFav);
            } else {
              for (let i = 0; i < $scope.favProjects.length; i++) {
                if ($scope.newFav.wf_id === $scope.favProjects[i].wf_id) {
                  $scope.favProjects.splice(i, 1);
                }
              }
              if ($rootScope.isTab) {
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
  function onChange() {
    $scope.isFlipped = !scope.isFlipped;
  }
});
