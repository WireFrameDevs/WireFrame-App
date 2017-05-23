angular.module('app', ['ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './views/homeSplash.html',
                controller: 'homeSplashCtrl'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: './views/projects.html',
                controller: 'projectsCtrl'
            })
            .state('canvas', {
                url: '/canvas',
                templateUrl: './views/canvas.html',
                controller: 'canvasCtrl'
            })
            // console.log($urlRouterProvider)
            $urlRouterProvider.otherwise('/');
    });