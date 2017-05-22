'use strict';

angular.module('app', ['ui.router', 'ngAnimate']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: './views/homeSplash.html'
    }).state('projects', {
        url: '/projects',
        templateUrl: './views/projects.html'
    }).state('canvas', {
        url: '/canvas',
        templateUrl: './views/canvas.html'
    });
    console.log($urlRouterProvider);
    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, mainService) {
    $scope.test = mainService.test;
});
'use strict';

angular.module('app').directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/navBar.html'
    };
});
'use strict';

angular.module('app').service('mainService', function ($http) {
  this.test = "Controller and Service are working";

  var baseurl = 'localhost:3000/';

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
});
//# sourceMappingURL=bundle.js.map
