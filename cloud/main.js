
Parse.Cloud.define("xmlparser", function (request, response) {
    sendRequest(request.params.url).then(function (res) {
        response.success(res);
    })
});
function sendRequest(url) {
    return Parse.Cloud.httpRequest({
        method: 'GET',
        url: url
    });
}