// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function ($scope, $routeParams) {

    $scope.tagline = $routeParams;

    console.log("Hello World from controller");


    var refresh = function () {
            $scope.contactlist = response;
            $scope.contact = "";
    };

});