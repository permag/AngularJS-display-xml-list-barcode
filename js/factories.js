
app.factory('articleListFactory', function($http) {
    var factory = {};
    factory.getArticleList = function() {
        return $http({
            url: './xml/list.xml',
            method: 'GET'
        });
    };
    return factory;
});
