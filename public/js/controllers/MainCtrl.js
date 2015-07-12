// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function ($scope, $http) {
    console.log("Hello World from controller");

    function init() {
        $scope.code = "EURUSD";

    }
    init();

    $scope.get = function (code, from, to) {
        $http.get("https://demo.trading212.com/charting/rest/candles/" + code + "/ONE_MINUTE?size=5")
    .success(function (data, status, headers, config) {
        console.log("I got the data I requested");
        $scope.candle = { birthTime: "", ask: { open: "", close: "", high: "", low: "" }
        , bid: { open: "", close: "", high: "", low: "" }, volume: ""
        };
        $scope.candleList = angular.fromJson(data);
        $scope.code = code;
    });
    }

    $scope.edit = function (time) {
        $http.get("https://demo.trading212.com/charting/rest/candles/EURUSD/ONE_MINUTE")
    .success(function (data, status, headers, config) {
        console.log("I got the data I requested");
        var list = angular.fromJson(data);

        for (i = 0; i < list.length; i++) {
            if (list[i].birthTime == time) {
                $scope.candle = list[i];
            }
        }

    });
    }


    $scope.update = function (candle) {
        var now = new Date();
        var timeToChange = new Date(now.getTime() + 3 * 60000);
        convertToString(candle);
        $http.post("https://demo.trading212.com/charting/rest/fix", { time: timeToChange.toISOString(), code: $scope.code, candle: candle }).
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
    }

    function convertToString(candle) {
        candle.ask.open = candle.ask.open.toString();
        candle.ask.high = candle.ask.high.toString();
        candle.ask.low = candle.ask.low.toString();
        candle.ask.close = candle.ask.close.toString();

        
        candle.bid.open = candle.bid.open.toString();
        candle.bid.high = candle.bid.high.toString();
        candle.bid.low = candle.bid.low.toString();
        candle.bid.close = candle.bid.close.toString();

        candle.birthTime = new Date(candle.birthTime).toISOString();
    }
});