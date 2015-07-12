// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['ui.bootstrap']).controller('MainController', function ($scope, $http, $log) {

    console.log("Hello World from controller");

    function init() {
        $scope.code = "EURUSD";
        $scope.fromDate = new Date();
        $scope.fromTime = new Date();

        $scope.toDate = new Date();
        $scope.toTime = new Date();
        $scope.showMeridian = true;
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
        var oldCandle = candle;
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

    function formatter(value) {
        if (angular.isDate(value) && value) {
            return value.toISOString();
        }
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

    //time picker

    $scope.today = function () {
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
    };

    $scope.today();
    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
    [
      {
          date: tomorrow,
          status: 'full'
      },
      {
          date: afterTomorrow,
          status: 'partially'
      }
    ];

    $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };


    $scope.toTime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = false;
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.fromTime = d;

        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);

        $scope.toTime = d;
    };

    $scope.changed = function () {
        $scope.from = $scope.fromDate.setHours($scope.fromTime.getHours())
        $scope.from = $scope.fromDate.setMinutes($scope.fromTime.getMinutes())
        $scope.from = $scope.fromDate.setSeconds(0);
        $scope.from = new Date($scope.from).toISOString();

        $scope.to = $scope.toDate.setHours($scope.toTime.getHours())
        $scope.to = $scope.toDate.setMinutes($scope.toTime.getMinutes())
        $scope.to = $scope.toDate.setSeconds(0);
        $scope.to = new Date($scope.to).toISOString();

        $log.log('Time changed to: ' + $scope.from);
    };
    $scope.changed();

    $scope.clear = function () {
        $scope.mytime = null;
    };
});