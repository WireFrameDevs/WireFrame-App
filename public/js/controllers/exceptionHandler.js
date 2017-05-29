// angular.module('app', []).config(function ($provide) {
//     $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
//         return function (exception, cause) {
//             var $rootScope = $injector.get("$rootScope");
//             $rootScope.addExceptionAlert({message: "Exception", reason: exception}); // This represents a custom method that exists within $rootScope
//             $delegate(exception, cause);
//         };
//     });
// });