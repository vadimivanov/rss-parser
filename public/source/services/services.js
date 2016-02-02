angular
    .module('app')
    .constant('CONFIG', {
        CLOUD_NAME: 'da167whus',
        API_KEY: '742849781655998',
        API_SECRET: 'v6ovBPkGb_0I2yG22PJn7-t3PbE'
    })
    .service('network', network);

network.$inject = ['$http', 'CONFIG'];

function network($http, CONFIG) {

    this.FEED_SRC = 'http://k.img.com.ua/rss/ru/news.xml';

    this.getImages = function (data) {
        var options = {
            method: data.type,
            url: 'https://'+CONFIG.API_KEY+':'+CONFIG.API_SECRET+'@api.cloudinary.com/v1_1/'+CONFIG.CLOUD_NAME+'/resources/image',
            dataType: 'json'
        };
        console.log(data);
        return $http(options);
    };

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