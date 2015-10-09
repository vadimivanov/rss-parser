angular
    .module('app')
    .directive('home', home);

    home.$inject = ['$state', 'network', '$breadcrumb', 'messages'];

    function home($state, network, $breadcrumb, messages) {
        function linker($scope) {
            $scope.data = {
                list: [],
                houseName: 'Home',
                logoutData: {
                    type: "POST",
                    service: "/logout"
                }
            };
            $scope.feedSrc = 'http://k.img.com.ua/rss/ua/news.xml';
            $scope.loadButonText = "Load";
            PubSub.subscribe('news', function(channel, data) {
                if (data) {
                    console.log(data);
                    $scope.feedSrc = data;
                    $scope.loadFeed();
                }
            });
            $scope.tagParser = function (data) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(data, 'text/html');
                messages.setData(doc.querySelectorAll('body')[0].innerText);
                $state.go('main.details');
            };
            $scope.loadFeed = function(e){
                network.parseRSS($scope.feedSrc).then(function (res){
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json( res.data );

                    console.log('---$scope.feeds',json.rss.channel.item_asArray);
                    $scope.feeds = json.rss.channel.item_asArray;
                });
            };
            $scope.loadFeed();
        }
        return {
            templateUrl: 'views/home/home.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {},
            link: linker
        };
}
