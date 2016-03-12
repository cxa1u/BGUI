'use strict';

/**
 * @ngdoc overview
 * @name ufaasApp
 * @description
 * # ufaasApp
 *
 * Main module of the application.
 */

angular
    .module('ufaasApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch'
    ]).config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('root', {
            abstract: true,
            url: "",
            views: {
                'header': {
                    templateUrl: 'views/nonauth/common/header.html'
                },
                'footer': {
                    templateUrl: 'views/nonauth/common/footer.html'
                }
            }
          })
        .state('root.home', {
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'views/nonauth/home.html',
                    controller: "HomeCtrl as homeCtrl"
                }
            },
            secured: false
        })
        // .state('root.signin', {
        //     url: '/signin',
        //     views: {
        //         'content@': {
        //             templateUrl: 'views/nonauth/signin.html',
        //             controller: "signinController as signinCtrl"
        //         }
        //     },
        //     secured: false
        // })
    });