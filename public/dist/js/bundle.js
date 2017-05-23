'use strict';

angular.module('app', ['ui.router', 'ngAnimate']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: './views/homeSplash.html',
        controller: 'homeSplashCtrl'
    }).state('projects', {
        url: '/projects',
        templateUrl: './views/projects.html',
        controller: 'projectsCtrl'
    }).state('canvas', {
        url: '/canvas',
        templateUrl: './views/canvas.html',
        controller: 'canvasCtrl'
    });
    // console.log($urlRouterProvider)
    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('app').controller('canvasCtrl', function ($scope, mainService) {});
'use strict';

angular.module('app').controller('homeSplashCtrl', function ($scope, mainService) {});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, mainService) {

	function getUser() {
		console.log('getUser function ran!');
		mainService.getUser().then(function (user) {
			if (user) {
				$scope.currentUser = user;
				$scope.isLoggedIn = true;
				var userId = user.id;

				$scope.getProjects = function () {
					mainService.getAllProjects(userId).then(function (response) {
						$scope.projects = response;
					});
				};
				$scope.getProjects();

				$scope.newProject = function (projectData) {
					projectData.user_id = userId;
					mainService.createProject(projectData).then(function (response) {
						$scope.newPro = response;
					});
				};

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
			}
		});
	}

	$scope.callUser = getUser();

	$scope.logout = mainService.logout;
});
'use strict';

angular.module('app').controller('projectsCtrl', function ($scope, mainService) {});
'use strict';

angular.module('app').directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/navBar.html'
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
      return res.data;
    }).catch(function (err) {
      console.log(err);
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
