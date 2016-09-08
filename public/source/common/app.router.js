angular
    .module('app')
    .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    'use strict';
    $urlRouterProvider
        .otherwise('home');
    $stateProvider
        .state('home',{
            url: '/home',
            template: '<home></home>'
        })
        .state('details',{
            url: '/details',
            template: '<details></details>'
        })
}