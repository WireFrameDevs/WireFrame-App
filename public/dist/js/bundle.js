'use strict';

angular.module('app', ['ui.router', 'ngAnimate']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: './views/homeSplash.html',
        controller: 'homeSplashCtrl',
        authenticate: false
    }).state('projects', {
        url: '/projects',
        templateUrl: './views/projects.html',
        controller: 'projectsCtrl',
        authenticate: true
    }).state('canvas', {
        url: '/canvas',
        templateUrl: './views/canvas.html',
        controller: 'canvasCtrl',
        authenticate: true
    });
    // console.log($urlRouterProvider)
    $urlRouterProvider.otherwise('/');
});

angular.module("app").run(function ($rootScope, $state, mainService) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && !mainService.getUser()) {
            // User isn’t authenticated
            $state.transitionTo("home");
            event.preventDefault();
        }
    });
});
'use strict';

angular.module('app').controller('canvasCtrl', function ($scope, mainService, $document, $compile) {

  var canvas = angular.element(document.querySelector('#canvas'));
  var toolbar = angular.element(document.querySelector('#toolbar'));
  var shapeToolbar = angular.element(document.querySelector('#shapeToolbar'));

  $scope.elementColor = "white";

  $scope.myFunc = function (myE) {
    $scope.x = myE.clientX;
    $scope.y = myE.clientY;
  };

  $scope.number = 1;

  $scope.allowDraw = true;

  $scope.startDraw = function (event) {
    if ($scope.allowDraw) {
      $scope.shapeStyle = {
        "fill": "white",
        "stroke": "black",
        "stroke-width": "1",
        "opacity": "0.8",
        "cursor": "move"
      };
      $scope.shapeToolbarShow = false;
      $scope.toolbarShow = false;
      $scope.x1 = 0;
      $scope.x2 = 0;
      $scope.y1 = 0;
      $scope.y2 = 0;
      $scope.tempXLocation = 0;
      $scope.tempYLocation = 0;
      $scope.shadowX = 0;
      $scope.shadowY = 0;
      $scope.shapeHeight = 0;
      $scope.shapeWidth = 0;
      $scope.showShadow = false;
      $scope.showShadow2 = false;
      $scope.tempXLocation = event.clientX;
      $scope.tempYLocation = event.clientY;
      $scope.toolbarShow = false;
      event.preventDefault();
      $document.on("mousemove", draw);
    }
  };

  function draw(event) {
    $scope.showShadow = true;
    $scope.showShadow2 = false;
    $scope.x1 = $scope.tempXLocation;
    $scope.y1 = $scope.tempYLocation;
    $scope.x2 = event.clientX;
    $scope.y2 = event.clientY;

    if ($scope.tempXLocation >= event.clientX) {
      $scope.xLocation = event.clientX;
    } else {
      $scope.xLocation = $scope.tempXLocation;
    }

    if ($scope.tempYLocation >= event.clientY) {
      $scope.yLocation = event.clientY - 60;
    } else {
      $scope.yLocation = $scope.tempYLocation - 60;
    }

    if ($scope.x2 >= $scope.x1) {
      $scope.shapeWidth = $scope.x2 - $scope.x1;
    } else {
      $scope.shapeWidth = $scope.x1 - $scope.x2;
    }
    if ($scope.y2 >= $scope.y1) {
      $scope.shapeHeight = $scope.y2 - $scope.y1;
    } else {
      $scope.shapeHeight = $scope.y1 - $scope.y2;
    }
  }

  $scope.endDraw = function (event) {
    if ($scope.allowDraw) {
      $scope.showShadow = false;
      $scope.showShadow2 = true;
      $scope.shadowX = event.clientX - $scope.tempXLocation;
      $scope.shadowY = event.clientY - $scope.tempYLocation;

      if ($scope.tempXLocation >= event.clientX) {
        $scope.shadowXLocation = event.clientX;
      } else {
        $scope.shadowXLocation = $scope.tempXLocation;
      }

      if ($scope.tempYLocation >= event.clientY) {
        $scope.shadowYLocation = event.clientY - 60;
      } else {
        $scope.shadowYLocation = $scope.tempYLocation - 60;
      }

      if ($scope.x2 >= $scope.x1) {
        $scope.shadowX = $scope.x2 - $scope.x1;
      } else {
        $scope.shadowX = $scope.x1 - $scope.x2;
      }
      if ($scope.y2 >= $scope.y1) {
        $scope.shadowY = $scope.y2 - $scope.y1;
      } else {
        $scope.shadowY = $scope.y1 - $scope.y2;
      }
      var shadowYtoolbar = $scope.shadowYLocation.toString() + "px";
      var shadowXtoolbar = $scope.shadowXLocation.toString() + "px";
      $scope.toolbarStyle = {
        "position": "absolute",
        "top": shadowYtoolbar,
        "left": shadowXtoolbar
      };

      $document.unbind("mousemove", draw);
      if ($scope.shadowX > 5 || $scope.shadowY > 5) {
        $scope.toolbarShow = true;
      }
    }

    $scope.allowDrawFunc();
  };

  $scope.createBox = function () {
    var template = "<svg class='draggable' width='100%' height='100%'><rect ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragRect($event)' ng-click='showRectToolbar($event)' x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " ng-style='shapeStyle' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "' />  </svg>";
    var linkFn = $compile(template);
    var content = linkFn($scope);
    canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
  };

  $scope.createEllipse = function () {
    var template = "<svg width='100%' height='100%'><ellipse ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragEllipse($event)' ng-click='showEllipseToolbar($event)' cx=" + ($scope.shadowXLocation + $scope.shadowX / 2) + " cy=" + ($scope.shadowYLocation + $scope.shadowY / 2) + " rx=" + $scope.shadowX / 2 + " ry=" + $scope.shadowY / 2 + " ng-style='shapeStyle' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "' />    </svg>";
    var linkFn = $compile(template);
    var content = linkFn($scope);
    canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
  };

  $scope.createCircle = function () {
    var template = "<svg width='100%' height='100%'><circle ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragCircle($event)' ng-click='showCircleToolbar($event)' cx=" + ($scope.shadowXLocation + $scope.shadowX / 2) + " cy=" + ($scope.shadowYLocation + $scope.shadowX / 2) + " r=" + $scope.shadowX / 2 + " ng-style='shapeStyle' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "' class='animated rollIn'/>    </svg>";
    var linkFn = $compile(template);
    var content = linkFn($scope);
    canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
  };

  $scope.createRoundedBox = function () {
    var template = "<svg width='100%' height='100%'><rect ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragRect($event)' ng-click='showRectToolbar($event)' x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " rx='20' ry='20' width=" + $scope.shadowX + " height=" + $scope.shadowY + " ng-style='shapeStyle' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "' class='animated jello' />    </svg>";
    var linkFn = $compile(template);
    var content = linkFn($scope);
    canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
  };

  $scope.shapeStyle = {
    "fill": "white",
    "stroke": "black",
    "stroke-width": "1",
    "opacity": "0.8",
    "cursor": "move"
  };

  $scope.allowDrawFunc = function () {
    $scope.allowDraw = true;
  };

  $scope.disableDrawFunc = function (event) {
    $scope.shapeID = event.target.attributes.id.nodeValue;
    $scope.allowDrag = true;
    $scope.allowDraw = false;
    $document.on('mouseup', dropShape);
  };

  $scope.dragRect = function (event) {
    var moveRect = angular.element(document.querySelector('#' + $scope.shapeID));
    if ($scope.allowDrag) {
      $scope.shapeToolbarShow = false;
      moveRect.attr("x", event.clientX - event.target.attributes.width.nodeValue / 2);
      moveRect.attr('y', event.clientY - 60 - event.target.attributes.height.nodeValue / 2);
    }
  };

  $scope.dragEllipse = function (event) {
    var moveEllipse = angular.element(document.querySelector('#' + $scope.shapeID));
    if ($scope.allowDrag) {
      $scope.shapeToolbarShow = false;
      moveEllipse.attr("cx", event.clientX);
      moveEllipse.attr('cy', event.clientY - 60);
    }
  };
  $scope.dragCircle = function (event) {
    var moveCircle = angular.element(document.querySelector('#' + $scope.shapeID));
    if ($scope.allowDrag) {
      $scope.shapeToolbarShow = false;
      moveCircle.attr("cx", event.clientX);
      moveCircle.attr('cy', event.clientY - 60);
    }
  };

  function dropShape(event) {
    $scope.allowDrag = false;
    var moveShape = angular.element(document.querySelector('#' + $scope.shapeID));
    moveShape.attr("id", "dynamicId" + event.clientX + event.clientY);
  }

  $scope.showRectToolbar = function (event) {
    console.log($scope.shapeID);
    $scope.shapeToolbarShow = true;
    var shapeToolbarY = event.target.attributes.y.nodeValue.toString() + "px";
    var shapeToolbarX = event.target.attributes.x.nodeValue.toString() + "px";
    $scope.shapeToolbarStyle = {
      "position": "absolute",
      "top": shapeToolbarY,
      "left": shapeToolbarX
    };
    $scope.shapeStyle = {
      "fill": $scope.elementColor,
      "stroke": "blue",
      "stroke-width": "2",
      "opacity": "0.8",
      "cursor": "move"
    };
    var shapeClass = angular.element(document.querySelector('#' + $scope.shapeID));
    console.log(shapeClass);
    shapeClass.addClass("button");
  };

  $scope.showCircleToolbar = function (event) {
    $scope.shapeToolbarShow = true;
    var shapeToolbarY = event.target.attributes.cy.nodeValue - event.target.attributes.r.nodeValue + "px";
    var shapeToolbarX = event.target.attributes.cx.nodeValue - event.target.attributes.r.nodeValue + "px";
    $scope.shapeToolbarStyle = {
      "position": "absolute",
      "top": shapeToolbarY,
      "left": shapeToolbarX
    };
    $scope.shapeStyle = {
      "fill": $scope.elementColor,
      "stroke": "blue",
      "stroke-width": "2",
      "opacity": "0.8",
      "cursor": "move"
    };
  };

  $scope.showEllipseToolbar = function (event) {
    $scope.shapeToolbarShow = true;
    var shapeToolbarY = event.target.attributes.cy.nodeValue - event.target.attributes.ry.nodeValue + "px";
    var shapeToolbarX = event.target.attributes.cx.nodeValue - event.target.attributes.rx.nodeValue + "px";
    $scope.shapeToolbarStyle = {
      "position": "absolute",
      "top": shapeToolbarY,
      "left": shapeToolbarX
    };
    $scope.shapeStyle = {
      "fill": $scope.elementColor,
      "stroke": "blue",
      "stroke-width": "2",
      "opacity": "0.8",
      "cursor": "move"
    };
  };
});
'use strict';

angular.module('app').controller('homeSplashCtrl', function ($scope, mainService) {
  console.log('homeSplashCTRL!!!!!');
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, mainService, $location, $rootScope) {
  console.log('mainCTRL!!!!!!!');
});
'use strict';

angular.module('app').controller('projectsCtrl', function ($scope, mainService, $rootScope, $location) {

    function getUser() {
        console.log('getUser function ran!');
        mainService.getUser().then(function (user) {
            if (user) {
                $rootScope.currentUser = user;
                $rootScope.isLoggedIn = true;
                // $rootScope.userId = user.id;
                var userId = user.id;
                $scope.getProjects = function () {
                    mainService.getAllProjects(userId).then(function (response) {
                        $scope.projects = response;
                        console.log(response);
                        if ($scope.projects.fav_wf === true) {
                            $scope.favorited = true;
                        } else {
                            $scope.favorited = false;
                        }
                    });
                };
                $scope.getProjects();

                //Goes in Canvas Ctrl
                $scope.newProject = function (projectData) {
                    projectData.user_id = userId;
                    mainService.createProject(projectData).then(function (response) {
                        $scope.newPro = response;
                    });
                };

                //Favoriting, deleting shapes, creating shapes, sync project, save existing project.
                $scope.updateProject = function () {
                    mainService.updateProject(newData).then(function (response) {
                        $scope.updated = response;
                    });
                };

                $scope.deleteProject = function (projectId) {
                    mainService.deleteProject(projectId).then(function (response) {
                        $scope.deleted = response;
                    });
                };
            } else {
                $rootScope.isLoggedIn = false;
                // $location.path('homeSplash');
                // console.log('Auth0 Error', err);
            }
        });
    }
    $scope.callUser = getUser();

    //PROJECTS

});
'use strict';

angular.module('app').directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/navBar.html',
        link: function link(scope, elem, attrs) {},
        controller: function controller($scope, mainService, $location, $stateParams) {
            $scope.logout = mainService.logout;
            console.log($location.path());
            // $scope.isActive = function(viewLocation) {
            //     return viewLocation === '/canvas';
            // };
        }
    };
});
'use strict';

angular.module('app').service('mainService', function ($http) {

  var baseurl = 'http://localhost:3000/';

  this.getAllProjects = function (userId) {
    return $http({
      method: 'GET',
      url: baseurl + 'api/projects/' + userId
    }).then(function (response) {
      return response.data;
    });
  };

  this.createProject = function (projectData) {
    return $http({
      method: 'POST',
      url: baseurl + 'api/projects',
      data: projectData
    }).then(function (response) {
      return response;
    });
  };

  this.updateProject = function (newData) {
    return $http({
      method: 'PUT',
      url: baseurl + 'api/project/',
      data: newData
    }).then(function (response) {
      return response.data;
    });
  };

  this.deleteProject = function (projectId) {
    return $http({
      method: 'DELETE',
      url: baseurl + 'api/projects/' + projectId
    }).then(function (response) {
      return response;
    });
  };

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then(function (res) {
      console.log("getting user data from DB", res.data);
      return res.data;
    }).catch(function (err) {
      return err;
    });
  };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
});
//# sourceMappingURL=bundle.js.map
