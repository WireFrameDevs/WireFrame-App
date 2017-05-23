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
    console.log($urlRouterProvider);
    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('app').controller('canvasCtrl', function ($scope, mainService) {});
'use strict';

angular.module('app').controller('homeSplashCtrl', function ($scope, mainService) {});
'use strict';

angular.module('app').controller('mainCtrl', function ($scope, mainService) {
    $scope.test = mainService.test;
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
    this.test = "Controller and Service are working";
});
//# sourceMappingURL=bundle.js.map
