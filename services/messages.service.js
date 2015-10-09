angular
    .module('app')
    .service('messages', function () {
        var messages = {
            setData: function (data) {
                messages.data = data;
            },
            getData: function () {
                return messages.data;
            }
        };
        messages.data = null;
        return messages;
    });