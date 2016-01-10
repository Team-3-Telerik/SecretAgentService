(function () {
    function LoginController($scope, notifier, identity, auth) {
        $scope.identity = identity;

        $scope.login = function (user) {
            auth.login(user).then(function (success) {
                if (success) {
                    notifier.success('Successful login!');
                    setInterval(function () {
                        window.location.href = "/";
                    }, 500);
                }
                else {
                    notifier.error('Username/Password combination is not valid!');
                }
            });
        };

        $scope.logout = function () {
            auth.logout().then(function () {
                notifier.success('Successful logout!');
                if ($scope.user) {
                    $scope.user.username = '';
                    $scope.user.password = '';
                }
                setInterval(function () {
                    window.location.href = "/";
                }, 500);
            })
        }
    }

    angular.module('app.controllers')
        .controller('LoginCtrl', ['$scope', 'notifier', 'identity', 'auth', LoginController]);
}());