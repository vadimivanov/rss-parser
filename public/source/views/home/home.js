angular
    .module('app')
    .directive('home', home);

    home.$inject = ['$state', '$sce', 'ParseService', '$breadcrumb', 'messages', 'network'];

    function home($state, $sce, ParseService, $breadcrumb, messages, network) {
        function linker($scope) {
            $scope.spinner = false;
            $scope.getHtml = function(html){
                return $sce.trustAsHtml(html);
            };

            $scope.loadButonText = "Load";

            PubSub.subscribe('news', function(channel, data) {
                if (data) {
                    $scope.loadFeed();
                }
            });
            $scope.tagParser = function (index) {
                messages.setData($scope.feeds[index]);
                $state.go('main.details');
            };
            //$scope.loadFeed = function(e){
                //$scope.spinner = true;
                // ParseService.parseRequest($scope.feedSrc)
                //    .then(function (res){
                //    $scope.feeds = res.item;
                //    $scope.spinner = false;
                //});
            //};
            $scope.loadFeed = function(e){
                network.parseRSS(network.FEED_SRC).then(function (res){
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json( res.data );
                    $scope.feeds = json.rss.channel.item;
                });
            };
            $scope.loadFeed();
            $scope.links = $breadcrumb.getStatesChain();

            PubSub.publish('button-back', $scope.links[$scope.links.length-2]);
        }
        return {
            templateUrl: 'source/views/home/home.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {},
            link: linker
        };
}
