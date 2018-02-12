app.controller('MapCtrl', function ($scope, $http, $timeout, $window, $compile) {

    $scope.loadMap = function () {
        var options = {
            enableHighAccuracy: true
        };

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            $scope.createMap();
        }, function (error) { alert('Unable to get location: ' + error.message); }, options);
    }

    $scope.loadMap();

    $scope.createMap = function () {
        var mapOptions = {
            center: new google.maps.LatLng($scope.position.lat(), $scope.position.lng()),
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

        var infoWindow = new google.maps.InfoWindow();
        var data = $scope.position
        var myLatlng = new google.maps.LatLng(data.lat(), data.lng());
        var html = "<div><input type='text' ng-model='notes' class='form-control' placeholder='Enter notes here'> <br/> <input type='button' value='save' class='btn btn-primary btn-xs' ng-click='saveNotes(myLatlng)' id='saveButton'><div/>";
        var compiled = $compile(html)($scope);
        var marker = new google.maps.Marker({
            position: myLatlng,
            animation: google.maps.Animation.DROP,
            map: $scope.map,
            title: "Current Location"
        });
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(compiled[0]);
                $scope.position = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                $scope.infoWindow = infoWindow;
                infoWindow.open($scope.map, marker);
            });

        })(marker, data);
        $scope.getNotes();
    }

    $scope.LoadNotesList = function (list) {
        for (i = 0; i < list.length; i++) {
            var infoWindow = new google.maps.InfoWindow();
            var myLatlng = new google.maps.LatLng(list[i].Lat, list[i].Long);
            var marker = new google.maps.Marker({
                position: myLatlng,
                animation: google.maps.Animation.DROP,
                map: $scope.map,
                title: list[i].Id.toString()
            });
            (function (marker) {
                google.maps.event.addListener(marker, "click", function (e) {
                    var single = list.filter(x=> x.Id == marker.title);
                    infoWindow.setContent(single[0].Notes);
                    infoWindow.open($scope.map, marker);
                });
            })(marker);
        }
    }

    $scope.addMarker = function () {
        $scope.notes = "";
        var c = $scope.map.getCenter();
        var coord = randomGeo(c, 100000);
        var infoWindow = new google.maps.InfoWindow();
        var myLatlng = new google.maps.LatLng(coord.latitude, coord.longitude);
        var html = "<div><input type='text' ng-model='notes' class='form-control' placeholder='Enter notes here'> <br/> <input type='button' value='save' class='btn btn-primary btn-xs' ng-click='saveNotes(myLatlng)' id='saveButton'><div/>";
        var compiled = $compile(html)($scope);
        var marker = new google.maps.Marker({
            position: myLatlng,
            animation: google.maps.Animation.DROP,
            map: $scope.map,
            title: "New Marker"
        });
        (function (marker) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(compiled[0]);
                $scope.position = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                $scope.infoWindow = infoWindow;
                infoWindow.open($scope.map, marker);
            });

        })(marker);
    }

    function randomGeo(center, radius) {
        var y0 = center.lat();
        var x0 = center.lng();
        var rd = radius / 111300; //about 111300 meters in one degree

        var u = Math.random();
        var v = Math.random();

        var w = rd * Math.sqrt(u);
        var t = 2 * Math.PI * v;
        var x = w * Math.cos(t);
        var y = w * Math.sin(t);

        //Adjust the x-coordinate for the shrinking of the east-west distances
        var xp = x / Math.cos(y0);

        var newlat = y + y0;
        var newlon = x + x0;
        var newlon2 = xp + x0;

        return {
            'latitude': newlat.toFixed(5),
            'longitude': newlon.toFixed(5)
        };
    }

    $scope.getNotes = function () {
        $http({
            method: 'GET',
            url: 'api/MapApi/GetNotes',
        }).then(function successCallback(response) {
            if (response.data) {
                $scope.NotesList = response.data;
                $scope.LoadNotesList(response.data);
            }
        }, function errorCallback(response) {
            alert("Unable to get data. Error : " + response.data.ExceptionMessage);
        });
    }

    $scope.saveNotes = function () {
        if ($scope.notes) {
            var dto = {
                Lat: $scope.position.lat(),
                lng: $scope.position.lng(),
                User: "testUser",
                Note: $scope.notes
            }
            $http({
                method: 'POST',
                url: 'api/MapApi/SaveNotes',
                data: dto,
                dataType: "json",
                contentType: "application/json"
            }).then(function successCallback(response) {
                $scope.getNotes();
                $scope.infoWindow.close();
            }, function errorCallback(response) {
                alert("Unable to save. Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert("Notes can't be empty");
        }
    };
});