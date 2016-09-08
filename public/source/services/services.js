angular
    .module('app')
    .service('network', network);

network.$inject = ['$http', 'CONFIG'];

function network($http, CONFIG) {

    this.FEED_SRC = 'http://k.img.com.ua/rss/ru/news.xml';

    this.parseRSS = function (data) {
        console.log('parseRSS',data, encodeURIComponent(data));
        var options = {
            method: 'GET',
            crossDomain: true,
            url: data
        };
        return $http(options);
    };

}