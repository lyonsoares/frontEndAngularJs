var frontApp = angular.module('frontApp', ['ngRoute']);

frontApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'view/login.html',
                controller: 'loginController'

            }).when('/listar', {
                templateUrl: 'view/estados.html',
                controller: 'estadoApiEController'

            }).when('/listarApi', {
                templateUrl: 'view/estadoslocal.html',
                controller: 'estadoApiController'

            })
            .otherwise({
                redirectTo: '/login'
            });
    }
]);

//--------------------------------------------------------------------------------
frontApp.controller("loginController", function ($scope, $http) {

    $scope.logar = function () {
        console.log('logar')
        $http({
            method: 'POST', url: 'http://127.0.0.1:8000/api/estados/login',
            data: $.param($scope.user),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            $scope.token = response.data;
            console.log(response.data)
            alert(JSON.stringify(response.data._token))           
            window.location.href = '#!/listar';
        }).catch(function (response) {
            console.log(response.data)
            alert('Usuário e senha invalidos.');
        })
    }

})

//---------------------------------------------------------------------------------
frontApp.controller("estadoApiEController", function ($scope, $http) {

    $scope.estadosApiE;
    var urlApiExterna = 'http://127.0.0.1:8000/api/estados/listarApiE';

    var urlPost = 'http://127.0.0.1:8000/api/estados/inserir';

    $http.get(urlApiExterna).then(function (response) {
        $scope.estadosApiE = response.data;
        console.log(response.data);
    }, function (err) {
        console.log(err);
    });


    $scope.salvar = function () {
        console.log($scope.estadosApiE)
        for (var i = 0; i <= $scope.estadosApiE.length; i++) {
            $http({
                method: 'POST', url: urlPost,
                data: $.param($scope.estadosApiE[i]),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                window.location.href = '#!/listarApi';
                console.log('Foi')
            }).catch(function (response) {
                console.log(err)
            })
        }   
    }
});

//------------------------------------------------------------------------------------

frontApp.controller("estadoApiController", function ($scope, $http) {

    $scope.estadosApi;
    var urlApi = 'http://127.0.0.1:8000/api/estados/listarApi';

    $http.get(urlApi).then(function (response) {
        $scope.estadosApi = response.data;
        console.log(response.data);
    }, function (err) {
        console.log(err);
    });
});

