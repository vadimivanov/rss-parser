angular
    .module('app')
    .directive('home', home);

    home.$inject = ['$state', '$sce', 'ParseService', 'messages', 'network'];

    function home($state, $sce, ParseService, messages, network) {
        function linker($scope) {
            $scope.feeds = [];
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
                PubSub.publish('button-back', {link: 'home', title: 'Home'});
                $state.go('details');
            };
            $scope.loadFeed = function(e){
                $scope.spinner = true;
                ParseService.parseRequest(network.FEED_SRC)
                   .then(function (res){
                       $scope.feeds = res.item;
                       $scope.spinner = false;
                       $scope.$digest();
                });
            };
            $scope.render = function (data) {
                $scope.feeds = data;
            };
            // $scope.loadFeed = function(e){
            //     network.parseRSS(network.FEED_SRC).then(function (res){
            //         var x2js = new X2JS();
            //         var json = x2js.xml_str2json( res.data );
            //         $scope.feeds = json.rss.channel.item;
            //     });
            // };
            $scope.loadFeed();
            
        }
        return {
            templateUrl: 'home/home.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {},
            link: linker
        };
}
