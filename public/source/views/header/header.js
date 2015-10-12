/*global angular, PubSub*/
angular
    .module('app')
    .directive('header', header);
header.$inject = ['network', '$state'];

function header(network, $state) {
    'use strict';
    function linker($scope) {
        $scope.link = '';
        $scope.getLink = function (url) {
            console.log(url);
            PubSub.publish('news', url);
        };
    }

    return {
        templateUrl: 'source/views/header/header.tpl.html',
        restrict: 'E',
        scope: {},
        link: linker
    };
}
