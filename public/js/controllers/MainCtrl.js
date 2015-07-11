// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function ($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function (code) {
        $http.get("https://demo.trader.bg/charting/rest/candles/EURUSD/ONE_MINUTE?size=10")
    .success(function (data, status, headers, config) {
        console.log("I got the data I requested");
        $scope.candle = { birthTime: "", ask: { open: "", close: "", high: "", low: ""} };
        $scope.candleList = angular.fromJson(data);
         $scope.code = code;
    });
    }

    $scope.edit = function (time) {
        $scope.candle = { birthTime: new Date(time), ask: { open: "", close: "", high: "", low: ""} };;
    };

    $scope.get = refresh;

});