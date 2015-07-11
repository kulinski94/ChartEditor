// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function ($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function (code) {
        $http.get("https://demo.trading212.com/charting/rest/candles/EURUSD/ONE_MINUTE?size=5")
    .success(function (data, status, headers, config) {
        console.log("I got the data I requested");
        $scope.candle = { birthTime: "", ask: { open: "", close: "", high: "", low: ""} };
        $scope.candleList = angular.fromJson(data);
        $scope.code = code;
    });
    }

    $scope.edit = function (time) {
        $http.get("https://demo.trading212.com/charting/rest/candles/EURUSD/ONE_MINUTE")
    .success(function (data, status, headers, config) {
        console.log("I got the data I requested");
        $scope.candle = { birthTime: "", ask: { open: "", close: "", high: "", low: "" }
        , bid: { open: "", close: "", high: "", low: "" }, volume: ""
        };

        var list = angular.fromJson(data);

        for (i = 0; i < list.length; i++) {
            if (list[i].birthTime == time) {
                $scope.candle = list[i];
            }
        }

    });
    }

    $scope.get = refresh;

});