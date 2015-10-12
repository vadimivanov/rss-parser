angular
    .module('app')
    .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    'use strict';
    $urlRouterProvider
        .otherwise('/main/home');
    $stateProvider
        .state('auth',{
            templateUrl: 'source/views/auth.tpl.html'
        })
        .state('auth.login',{
            url: '/login',
            template: '<login></login>'
        })
        .state('main',{
            url: '/main',
            templateUrl: 'source/views/main.tpl.html',
            ncyBreadcrumb: {
                label: ''
            }
        })
        .state('main.home',{
            url: '/home',
            template: '<home></home>',
            ncyBreadcrumb: {
                label: 'Home',
                parent: 'main'
            }
        })
        .state('main.details',{
            url: '/details',
            template: '<details></details>',
            ncyBreadcrumb: {
                label: 'Detail',
                parent: 'main.home'
            }
        })
        .state('main.images_list',{
            url: '/images_list',
            template: '<images_list></images_list>',
            ncyBreadcrumb: {
                label: 'Images',
                parent: 'main'
            }
        })
}