(function () {

    function  signUpUser($scope, $location, auth, notifier) {
        $scope.signup = function(user) {
            auth.signup(user).then(function() {
                notifier.success('Registration successful!');
                window.location.href = "/"
            })
        }}

    app.controller('SignUpController', signUpUser);
}());
