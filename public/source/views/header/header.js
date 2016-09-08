/*global angular, PubSub*/
angular
    .module('app')
    .directive('header', header);
header.$inject = ['network', '$state'];

function header(network, $state) {
    'use strict';
    function linker($scope) {
        $scope.data = {};
        console.log('$scope.data --> ', $scope.data);
        $scope.getLink = function (url) {
            console.log(url);
            network.FEED_SRC = url;
            PubSub.publish('news', url);
            $state.go('home');
        };
        $scope.goBack = function () {
            $state.go($scope.data.goBackLink);
            $scope.data = {};
        };
        PubSub.subscribe('button-back', function(channel, data) {
            if (data) {
                $scope.data.goBackTitle = data.title;
                $scope.data.goBackLink = data.link;
            }
        });
    }

    return {
        templateUrl: 'header/header.tpl.html',
        restrict: 'E',
        replace: true,
        scope: {},
        link: linker
    };
}
