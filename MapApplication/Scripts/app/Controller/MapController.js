app.controller('MapCtrl', function ($scope, $http, $timeout, $window, $compile) {

    $scope.loadMap = function () {
        var options = {
            enableHighAccuracy: true
        };

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            $scope.createMap();
            console.log(JSON.stringify($scope.position));
        }, function (error) { alert('Unable to get location: ' + error.message); }, options);
    }

    $scope.loadMap();

    $scope.createMap = function () {
        var mapOptions = {
            center: new google.maps.LatLng($scope.position.lat(), $scope.position.lng()),
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var infoWindow = new google.maps.InfoWindow();
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        // for (i = 0; i < markers.length; i++) {
        var data = $scope.position
        var myLatlng = new google.maps.LatLng(data.lat(), data.lng());
        var html = "<div><input type='text' ng-model='notes' class='form-control' placeholder='Enter notes here'> <br/> <input type='button' value='save' class='btn btn-primary btn-xs' ng-click='saveNotes()' id='saveButton'><div/>";
        var compiled = $compile(html)($scope);
        var marker = new google.maps.Marker({
            position: myLatlng,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Test title"
        });
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(compiled[0]);
                infoWindow.open(map, marker);
            });

        })(marker, data);
        // }

        $scope.saveNotes = function () {
            if ($scope.notes) {
                var dto = {
                    Lat: $scope.position.lat(),
                    lng: $scope.position.lng(),
                    User: "test",
                    Note: $scope.notes
                }
                $http({
                    method: 'POST',
                    url: 'api/MapApi/SaveNotes',
                    data: dto,
                    dataType: "json",
                    contentType: "application/json"
                }).then(function successCallback(response) {
                    console.log("response:" + response);
                    if (response.data) {

                    }
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Unable to save. Error : " + response.data.ExceptionMessage);
                });
            }
            else {
                alert("Notes can't be empty");
            }
        };
    }
});