angular
    .module('app')
    .constant('CONFIG', {
        APP_ID: 'JGndivFG1jnujNgfOuQ9l9z9jGzvIGzwf7CCWXfH',
        JS_KEY: '2UQNUjDp44Ukr2ho4rk5Baw36T2vJ9aMRZrhWdlM'
    })
    .service('ParseService', ParseService);

ParseService.$inject = ['$http', 'CONFIG'];

function ParseService($http, CONFIG) {

    Parse.initialize(CONFIG.APP_ID, CONFIG.JS_KEY);

    this.parseRequest = function (data, cb) {
        var responseData = [];
        console.log('parseRSS',data, encodeURIComponent(data));
        Parse.Cloud.run('xmlparser',{url: data}, {
            success: function (output) {
                console.log('output', output);
                var x2js = new X2JS();
                var json = x2js.xml_str2json( output.text );
                console.log('---$scope.feeds',json.rss.channel);
                return json.rss.channel;
            },
            error: function (error) {console.log('error', error);}
        });
//        return responseData;
    };

}