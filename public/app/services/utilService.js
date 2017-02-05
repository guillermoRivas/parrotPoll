angular.module('parrotPollApp')
    .service('utilService', [function() {

    this.calcularFecha = function functionName(date) {
      date = Date.parse(date);
      var fechaActual = new Date();

      var dif = fechaActual - date;
      var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
      return dias;
    };
}]);
