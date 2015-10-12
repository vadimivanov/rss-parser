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
            $scope.feedSrc = 'http://k.img.com.ua/rss/ru/news.xml';
            $scope.loadButonText = "Load";
            PubSub.subscribe('news', function(channel, data) {
                if (data) {
                    console.log(data);
                    $scope.feedSrc = data;
                    $scope.loadFeed();
                }
            });
            $scope.tagParser = function (text, title) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(text, 'text/html');
//                console.log('msg data',doc.querySelectorAll('p'));
                messages.setData({text: doc.querySelectorAll('body')[0].innerText, title: title});
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
            templateUrl: 'source/views/home/home.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {},
            link: linker
        };
}
