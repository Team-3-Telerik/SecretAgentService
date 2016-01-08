(function () {

    function ProfileCtrl($scope, auth, identity) {
        $scope.user = {
            firstName: identity.currentUser.firstName,
            lastName: identity.currentUser.lastName
        };

        $scope.update = function(user) {
            auth.update(user).then(function() {
                $scope.firstName = user.firstName;
                $scope.lastName = user.lastName;
                window.location.href = "/"
            });
        }
    }

    angular.module('app.controllers')
        .controller('ProfileCtrl', ['$scope', 'identity', 'auth', ProfileCtrl]);
}());