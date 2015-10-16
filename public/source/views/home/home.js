angular
    .module('app')
    .directive('home', home);

    home.$inject = ['$state', '$sce', 'ParseService', '$breadcrumb', 'messages'];

    function home($state, $sce, ParseService, $breadcrumb, messages) {
        function linker($scope) {
            $scope.feeds = [];
            $scope.spinner = false;
            $scope.data = {
                logo: '',
                copyright: '',
                houseName: 'Home',
                logoutData: {
                    type: "POST",
                    service: "/logout"
                }
            };
            $scope.getHtml = function(html){
                return $sce.trustAsHtml(html);
            };
            $scope.feedSrc = 'http://k.img.com.ua/rss/ru/news.xml';
            $scope.loadButonText = "Load";

            PubSub.subscribe('news', function(channel, data) {
                if (data) {
//                    console.log(data);
                    $scope.feedSrc = data;
                    $scope.loadFeed();
                    $state.go('main.home');
                }
            });
            $scope.tagParser = function (index) {
                messages.setData($scope.feeds[index]);
                $state.go('main.details');
            };
            $scope.loadFeed = function(e){
//                $scope.spinner = true;
                Parse.Cloud.run('xmlparser',{url: $scope.feedSrc}, {
                    success: function (output) {
                        console.log('output', output);
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( output.text );
                        $scope.feeds = json.rss.channel.item;
                        $scope.spinner = false;
                        console.log('---$scope.feeds',$scope.feeds);
                    },
                    error: function (error) {console.log('error', error);}
                });
//               ParseService.parseRequest($scope.feedSrc);
//                    .then(function (res){
//                    var x2js = new X2JS();
//                    var json = x2js.xml_str2json( res.data );

//                    $scope.feeds = json.rss.channel.item;
//                    $scope.data.logo = json.rss.channel.image.url;
//                    $scope.data.copyright = json.rss.channel.copyright;
//                });
            };
            $scope.loadFeed();
            $scope.parsedData = function (data) {
                $scope.feeds = data.item;

                console.log('home page feeds ',data, $scope.feeds);
            };
            $scope.links = $breadcrumb.getStatesChain();
            console.log($scope.links);
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
