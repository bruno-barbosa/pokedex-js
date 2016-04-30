'use strict';

var app = angular.module('pokeApp');

app.controller('homeCtrl', ['$q', '$scope', '$timeout', 'Pokemon',  function ($q, $scope, $timeout, Pokemon) {

  Pokemon.getAll()
  .then(res => {
    $scope.pokedex = res.data.pokemon_entries;
    $scope.loading = false;
  })
  .catch(err => {
    console.error(err);
  });

  $scope.selected = [];

  $scope.options = {
  rowSelection: true,
  multiSelect: true,
  autoSelect: true,
  decapitate: false,
  largeEditDialog: false,
  boundaryLinks: false,
  limitSelect: true,
  pageSelect: true
};

  $scope.query = {
    order: 'name',
    total: 721,
    limit: 50,
    page: 1
  };

  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      Pokemon.getAll()
      .then(res => {
        $scope.pokedex = res.data.pokemon_entries;
      })
      .catch(err => {
        console.error(err);
      });
      // loading
    }, 2000);
  };

}]);

app.controller('pokemonCtrl', function($scope, $state, Pokemon) {
  Pokemon.getById($state.params.id).then(res => {
    $scope.pokeID = $state.params.id;
    $scope.details = res.data;
    $scope.stats = res.data.stats;
  });
});

app.filter('capitalize', function() {
  return function(str){
    if(!str) {
      return str;
    }

    return str.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase() )
      .join(' ');
  };
});

app.directive('loading', ['$http', function ($http) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
        };
        scope.$watch(scope.isLoading, function (value) {
          if (value) {
            element.removeClass('ng-hide');
          } else {
            element.addClass('ng-hide');
          }
        });
      }
    };
}]);
