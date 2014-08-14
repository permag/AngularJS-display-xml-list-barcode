// 
// Application for displaying table of articles retrieved from Excel/XML output file.
// Author: Per Magnusson, killingfloor00@gmail.com
// 

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {templateUrl: './views/partials/_articleList.html', controller: 'AppCtrl'})
        .otherwise({redirectTo: '/'});
});
