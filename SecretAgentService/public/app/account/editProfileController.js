(function () {

    function  editUser(auth, notifier, identity) {

        var vm = this;

        vm.user = {
            email : identity.currentUser.email,
            pictureUrl: identity.currentUser.pictureUrl
        };

        vm.edit = function(user) {
            auth.update(user).then(function() {
                notifier.success('Profile successfully edited!');
                setInterval(function () {
                    window.location.href = "/";
                }, 500);
            })
        }}

    angular.module('app.controllers')
        .controller('EditProfileController', ['auth', 'notifier', 'identity', editUser]);
}());

