(function () {

    function  signUpUser(auth, notifier) {

        var vm = this;
        
        vm.signup = function(user) {
            console.log('here');
            auth.signup(user).then(function() {
                notifier.success('Registration successful!');
                setInterval(function () {
                    window.location.href = "/";
                }, 1000);
            })
        }}

    angular.module('app.controllers')
        .controller('SignUpController', ['auth', 'notifier', signUpUser]);
}());
