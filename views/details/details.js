angular
    .module('app')
    .directive('details', details);

details.$inject = ['$state', 'network', '$breadcrumb', 'messages'];

function details($state, network, $breadcrumb, messages) {
    function linker($scope) {
        $scope.data = {
            list: []
        };
        $scope.details = messages.getData();
        console.log($scope.details);
    }
    return {
        templateUrl: 'views/details/details.tpl.html',
        restrict: 'E',
        replace: true,
        scope: {},
        link: linker
    };
}