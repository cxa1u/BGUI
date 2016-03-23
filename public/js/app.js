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

        $stateProvider.state('root', {
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
                    controller: "HomeController as homeCtrl"
                }
            },
            secured: false
        })
    });