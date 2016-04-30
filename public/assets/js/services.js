'use strict';
var app = angular.module('pokeApp');

app.service('Pokemon', function ($http) {

  this.getAll = () => {
    return $http.get('//pokeapi.co/api/v2/pokedex/1/',  { cache: true});
  };

  this.getById = (id) => {
    return $http.get(`//pokeapi.co/api/v2/pokemon/${id}`,  { cache: true});
  };
});
