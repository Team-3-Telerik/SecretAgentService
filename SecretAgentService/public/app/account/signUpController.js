(function () {

    function  signUpUser(auth, notifier) {

        var vm = this;
        vm.signup = function(user) {
            auth.signup(user).then(function() {
                notifier.success('Registration successful!');
                window.location.href = "/"
            })
        }}

    angular.module('app.controllers')
        .controller('SignUpController', ['$scope', 'notifier', 'identity', 'auth', signUpUser]);
}());
