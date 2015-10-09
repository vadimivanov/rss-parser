angular
    .module('app')
    .directive('imagesList', images_list);

images_list.$inject = ['$state', 'network', '$breadcrumb'];

function images_list($state, network, $breadcrumb) {
    function linker($scope) {
        $scope.images = [];

        $scope.getImages = function () {
            network.getImages({
                type: "GET",
                service: "/Items"
            }).then(function (images) {
                console.log('result ',images.data.resources);
                $scope.images = images.data.resources;
            });
        };
        $scope.getImages();
    }
    return {
        templateUrl: 'views/images_list/images_list.tpl.html',
//        restrict: 'E',
        scope: {},
//        replace: true,
        link: linker
    };
}