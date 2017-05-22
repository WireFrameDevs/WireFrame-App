angular.module('app', ['ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './views/homeSplash.html'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: './views/projects.html'
            })
            .state('canvas', {
                url: '/canvas',
                templateUrl: './views/canvas.html'
            })
            console.log($urlRouterProvider)
            $urlRouterProvider.otherwise('/');
    });