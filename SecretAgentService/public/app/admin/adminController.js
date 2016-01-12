(function () {
    'use strict';

    function AdminController(identity) {
        var vm = this;
        vm.identity = identity;

        var dataSource = new kendo.data.DataSource({
            transport: {
                read:  {
                    url: 'api/users'
                },
                destroy: {
                    url: 'api/users/delete',
                    type: 'post'
                },
                update: {
                    url: 'api/users/update',
                    type: 'post'
                },
                create: {
                    url: 'api/users',
                    type: 'post'
                }
            },
            batch: false,
            pageSize: 5,
            schema: {
                model: {
                    id: "_id",
                    fields: {
                        url: {type : "string"},
                        username: {type: "string", validation: { required: true } },
                        email: {type: "string", validation: { required: true } },
                        roles: {type: "string", validation: { required: true }},
                        password: {type: "string", validation: { required: true }}
                    }
                }
            }
        });


        vm.gridOptions = {
            columns: [
                {
                    template: "<img style='width: 60px; border-radius: 30%' src=#:data.pictureUrl#>",
                    field: "pictureUrl",
                    title: "Picture",
                    width: 100
                },
                {field: "username", title: 'Username'},
                {field: "email", title: 'Email'},
                {field: 'roles', title: 'Role'},
                {field: 'password', title: 'Password'},
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
            ],
            editable: "popup",
            toolbar: ["create"],
            pageable: true,
            sortable: true,
            dataSource: dataSource
        }
    }

    angular.module('app.controllers')
        .controller('AdminController', ['identity', AdminController]);
}());