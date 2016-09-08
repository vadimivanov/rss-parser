angular
    .module('app')
    .constant('CONFIG', {
        APP_ID: 'a9jRLIufzpYFGbn44ZzF8Wl2gL3PbUAQIVz8vAx2',
        JS_KEY: 'TT02USepmVKAtU3johi4sRUHDsnDT5GMJJyhXeNi'
    })
    .service('ParseService', ParseService);

ParseService.$inject = ['$http', 'CONFIG'];

function ParseService($http, CONFIG) {

    Parse.initialize(CONFIG.APP_ID, CONFIG.JS_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com';
    
    this.parseRequest = function (data, cb) {
        var responseData = [];

        return new Promise(function (resolve, reject) {
            Parse.Cloud.run('xmlparser',{url: data}, {
                success: function (output) {
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json( output.text );
                    resolve(json.rss.channel);
                    reject(json.rss.channel);
                },
                error: function (error) {console.log('error', error);}
            });
        });
    };
}