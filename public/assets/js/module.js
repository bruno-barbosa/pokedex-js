'use strict';

var app = angular.module('pokeApp', ['ui.router', 'ngMaterial', 'md.data.table'])
.config( function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');

    $stateProvider
    .state('home', {url: '/', templateUrl: '/assets/templates/pokelist.html', controller: 'homeCtrl'})
    .state('pokemon', {url: '/pokemon/{id}', templateUrl: '/assets/templates/pokemon.html', controller: 'pokemonCtrl' });
    $urlRouterProvider.otherwise('/');
});
