// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['ui.bootstrap']).controller('MainController', function ($scope, $http, $log)
{

    console.log("Hello World from controller");

    function init()
    {
        $scope.code = "BGNPLN";
        $scope.fromDate = new Date();
        $scope.fromTime = new Date();

        $scope.toDate = new Date();
        $scope.toTime = new Date();
        $scope.showMeridian = true;

        $scope.hosts = [];
        $scope.hosts[0] = 'http://demo3.testing.trading212.int:9002/charting/rest/private/fix';
        //$scope.hosts[1] ="http://feature19.testing.trading212.int:9002/charting/rest/private/fix";
    }
    init();

    $scope.get = function (code, from, to)
    {
        $http.get("http://demo3.testing.trading212.int:9002/charting/rest/private/oneMinuteCandles/" + code,
            { params: { from: $scope.from.getTime(), to: $scope.to.getTime() }
            })
    .success(function (data, status, headers, config)
    {
        console.log("I got the data I requested");
        $scope.candle = { birthTime: "", ask: { open: "", close: "", high: "", low: "" }
        , bid: { open: "", close: "", high: "", low: "" }, volume: ""
        };
        $scope.candleList = angular.fromJson(data);

        for (i = 0; i < $scope.candleList.length; i++)
        {
            $scope.candleList[i].birthTime = new Date($scope.candleList[i].birthTime);
        }
        $scope.code = code;
    });
    }

    $scope.edit = function (time)
    {
        for (i = 0; i < $scope.candleList.length; i++)
        {
            if ($scope.candleList[i].birthTime == time)
            {
                $log.log('edit : ' + $scope.candleList[i]);
                $scope.candle = $scope.candleList[i];
            }
        }
    }

    $scope.updateResponse = "";
    $scope.update = function (candle)
    {
        var now = new Date();
        var timeToChange = new Date(now.getTime() + 3 * 60000);
        var oldCandle = candle;
        candle.birthTime = new Date(candle.birthTime).getTime();

        $log.log(timeToChange);
        for (i = 0; i < $scope.hosts.length; i++)
        {
            $http.post($scope.hosts[i], { time: timeToChange.getTime(), fixEvent: { periodType: 'ONE_MINUTE', code: $scope.code, candle: candle} }).
                  success(function (data, status, headers, config)
                  {
                      $log.log('success on ' + $scope.hosts[i] + " -> " + angular.fromJson(data));
                      $scope.updateResponse = angular.fromJson(data);
                  }).
                  error(function (data, status, headers, config)
                  {
                      //
                  });
        }

    }

    //time picker

    $scope.today = function ()
    {
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
    };

    $scope.today();
    // Disable weekend selection
    $scope.disabled = function (date, mode)
    {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function ()
    {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event)
    {
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

    $scope.getDayClass = function (date, mode)
    {
        if (mode === 'day')
        {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++)
            {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay)
                {
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
    $scope.toggleMode = function ()
    {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.changed = function ()
    {
        $scope.from = $scope.fromDate.setHours($scope.fromTime.getHours())
        $scope.from = $scope.fromDate.setMinutes($scope.fromTime.getMinutes())
        $scope.from = $scope.fromDate.setSeconds(0);
        $scope.from = new Date($scope.from);

        $scope.to = $scope.toDate.setHours($scope.toTime.getHours())
        $scope.to = $scope.toDate.setMinutes($scope.toTime.getMinutes())
        $scope.to = $scope.toDate.setSeconds(0);
        $scope.to = new Date($scope.to);

        $log.log('Time changed to: ' + $scope.from);
    };
    $scope.changed();

    $scope.clear = function ()
    {
        $scope.mytime = null;
    };
});