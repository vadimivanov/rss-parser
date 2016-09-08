angular
    .module('app')
    .directive('details', details);

details.$inject = ['$state', '$sce', '$breadcrumb', 'messages'];

function details($state, $sce, $breadcrumb, messages) {
    function linker($scope) {
        $scope.details = messages.getData();
        $scope.getHtml = function(html){
            return $sce.trustAsHtml(html);
        };
        $scope.text = $scope.details.fulltext.__cdata;
        $scope.links = $breadcrumb.getStatesChain();
        console.log('links ', $scope.links);
        PubSub.publish('button-back', $scope.links[$scope.links.length-2]);
    }
    return {
        templateUrl: 'details/details.tpl.html',
        restrict: 'E',
        replace: true,
        scope: {},
        link: linker
    };
}