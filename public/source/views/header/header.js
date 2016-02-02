/*global angular, PubSub*/
angular
    .module('app')
    .directive('header', header);
header.$inject = ['network', '$state'];

function header(network, $state) {
    'use strict';
    function linker($scope) {
        $scope.data = {
            goBackTitle: '',
            goBackLink: ''
        };
        $scope.getLink = function (url) {
            console.log(url);
            network.FEED_SRC = url;
            PubSub.publish('news', url);
            $state.go('main.home');
        };
        PubSub.subscribe('button-back', function(channel, data) {
            if (data) {
                $scope.data.goBackTitle = data.ncyBreadcrumb.label;
                $scope.data.goBackLink = data.ncyBreadcrumbLink;
            }
        });
    }

    return {
        templateUrl: 'source/views/header/header.tpl.html',
        restrict: 'E',
        scope: {},
        link: linker
    };
}
