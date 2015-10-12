angular
    .module('app')
    .directive('details', details);

details.$inject = ['$state', 'network', '$breadcrumb', 'messages'];

function details($state, network, $breadcrumb, messages) {
    function linker($scope) {
        $scope.details = messages.getData();
        $scope.data = {
            text: $scope.details.text,
            title: $scope.details.title
        };
        console.log($scope.details);
    }
    return {
        templateUrl: 'source/views/details/details.tpl.html',
        restrict: 'E',
        replace: true,
        scope: {},
        link: linker
    };
}