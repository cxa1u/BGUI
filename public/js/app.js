'use strict';

/**
 * @ngdoc overview
 * @name ufaasApp
 * @description
 * # ufaasApp
 *
 * Main module of the application.
 */
// angular
//   .module('ufaasApp', [
//     'ngAnimate',
//     'ngAria',
//     'ngCookies',
//     'ngResource',
//     'ui.router',
//     'ngSanitize',
//     'ngTouch'
//   ])
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'templates/main.html',
//         controller: 'MainCtrl',
//         controllerAs: 'main'
//       })
//       .when('/about', {
//         templateUrl: 'templates/about.html',
//         controller: 'AboutCtrl',
//         controllerAs: 'about'
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });


  //.config(function($stateProvider, $urlRouterProvider) {
  // //
  // // For any unmatched url, redirect to /state1
  // $urlRouterProvider.otherwise("/");
  // //
  // // Now set up the states
  // $stateProvider
  //   .state('state1', {
  //     url: "/",
  //     templateUrl: 'templates/main.html',
  //     controller: 'MainCtrl',
  //     controllerAs: 'main'
  //   })

  //   });

angular
  .module('ufaasApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
   ]).config(function($stateProvider, $urlRouterProvider){
 
    $urlRouterProvider
    .otherwise('/');
    

 $stateProvider
    .state('root',{        
         abstract: true,
         url : "",
         views: {
            'header': {
                templateUrl: 'views/common/header.html'
            },
            'footer': {
                templateUrl: 'views/common/footer.html'                
            }
        }
    })

    /*Page id : CDS1*/

    .state('root.home',{
        url: '/',
        views: {           
            'content@': {
                templateUrl: 'views/home.html',
                controller : "MainCtrl as main"                
            }
             
        },
        secured : false
    })
    .state('root.signin',{
        url: '/signin',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/signin.html',
                controller : "signinController as signinCtrl"
            }
        },
        secured : false
    })
    .state('root.knowyourmp',{
        url: '/knowyourmp',
        views: {           
            'content@': {
                templateUrl: 'views/nonauth/knowyourmp.html'
            }
        },
        secured : false
    })


  });