angular.module('app', ['ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider, $logProvider){
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
            .state('mycanvas', {
                url: '/canvas/:id',
                templateUrl: './views/canvas.html',
                controller: 'canvasCtrl'
                
            })
            // console.log($urlRouterProvider)
            $urlRouterProvider.otherwise('/');
});

