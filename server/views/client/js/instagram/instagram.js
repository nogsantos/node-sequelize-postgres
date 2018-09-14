/**
 * Instagram
 */
(function (angular) {
    "use strict";
    var app = angular.module('Instagram', ['ngMaterial','ngMessages']);
    app.controller('InstagramController', function ($scope, $http) {
        /**
         * consulta às estatisticas
         */
        $scope.estatisticas = function() {
            $http.get(
                'instagram/qt'
            ).success(function (data) {
                $scope.tags = data;
                // console.log(data);
            });
        };
        // $http.get(
        //     'instagram/pm'
        // ).success(function (data) {
        //     console.log(data);
        // });
    });
})(window.angular);
