angular
    .module('app')
    .directive('msg', msg);
msg.$inject = ['messages'];

function msg() {
    'use strict';
    function linker($scope, $el) {
        $scope.data = {
            visible: false,
            content: ''
        };

        $scope.onMessage = function (data) {
            $scope.data.visible = true;
            $scope.data.content = data;
            console.log($scope.data);
        };

        $scope.onClose = function () {
            $scope.data.visible = false;
        };
        PubSub.subscribe('messages', function(channel, data) {
            $scope.onMessage(data.status + ': ' + data.statusText);
        });
    }

    return {
        templateUrl: 'components/modal.tpl.html',
        restrict: 'E',
//        replace: true,
        scope: {},
        link: linker
    };
}