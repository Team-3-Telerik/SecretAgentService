(function () {
    'use strict';

    function data($http, $q, baseServiceUrl, notifier) {

        function get(url, params) {
            var defered = $q.defer();

            $http
                .get(baseServiceUrl + url, { params: params})
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function getById(url) {
            var defered = $q.defer();
            $http
                .get(baseServiceUrl + url)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    notifier.error(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function post(url, data) {
            var defered = $q.defer();
            $http
                .post(baseServiceUrl + url, data)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    notifier.error(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function put(url, data) {
            var defered = $q.defer();

            $http
                .put(baseServiceUrl + url, data)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    notifier.error(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function  del(url) {
            var defered = $q.defer();
            $http
                .delete(baseServiceUrl + url)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    notifier.error(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function getErrorMessage(response) {
            var error = response.data.modelState;
            if (error && error[Object.keys(error)[0]][0]) {
                error = error[Object.keys(error)[0]][0];
            }
            else {
                error = response.data.message;
            }

            return error;
        }

        return {
            get: get,
            getById: getById,
            post: post,
            put: put,
            del: del
        }
    }

    angular.module('app.services')
        .factory('data', ['$http', '$q', 'baseServiceUrl', 'notifier', data]);
}());