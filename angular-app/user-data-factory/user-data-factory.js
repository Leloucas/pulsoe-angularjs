angular.module('pulsoe-user').factory('userDataFactory', userDataFactory);

function userDataFactory($http){
  return {
    test : testAPI,
    countries : getCountries,
    states : getStates,
    languages : getLanguages,
    postDatos : postDatos,
    getDatos : getDatos,
    postExperiencia : postExperiencia,
    getExperiencia : getExperiencia,
    postFormacion : postFormacion,
    getFormacion : getFormacion,
    postCapacitacion : postCapacitacion,
    getCapacitacion : getCapacitacion,
    postHabilidad : postHabilidad,
    getHabilidad : getHabilidad,
    postIdioma : postIdioma,
    getIdioma : getIdioma,
    postPuestos : postPuestos,
    getPuestos : getPuestos,
    postSoftware : postSoftware,
    getSoftware : getSoftware,
    postSueldo : postSueldo,
    getSueldo : getSueldo,
    postValores : postValores,
    getValores : getValores
  }

  function testAPI(data){
    return $http.post('/api/test', data).then(complete).catch(failed);
  }

  function postDatos(data){
    return $http.post('/api/usuariodatos', data).then(complete).catch(failed);
  }
  function getDatos(){
    return $http.get('/api/usuariodatos/1').then(complete).catch(failed);
  }
  

  function postExperiencia(data){
    return $http.post('/api/usuarioexperiencia', data).then(complete).catch(failed);
  }
  function getExperiencia(){
    return $http.get('/api/usuarioexperiencia/1').then(complete).catch(failed);
  }

  function postFormacion(data){
    return $http.post('/api/usuarioformacion', data).then(complete).catch(failed);
  }
  function getFormacion(){
    return $http.get('/api/usuarioformacion/1').then(complete).catch(failed);
  }
  
  function postCapacitacion(data){
    return $http.post('/api/usuariocapacitacion', data).then(complete).catch(failed);
  }
  function getCapacitacion(){
    return $http.get('/api/usuariocapacitacion/1').then(complete).catch(failed);
  }
  
  function postHabilidad(data){
    return $http.post('/api/usuariohabilidad', data).then(complete).catch(failed);
  }
  function getHabilidad(){
    return $http.get('/api/usuariohabilidad/1').then(complete).catch(failed);
  }
  
  function postIdioma(data){
    return $http.post('/api/usuarioidioma', data).then(complete).catch(failed);
  }
  function getIdioma(){
    return $http.get('/api/usuarioidioma/1').then(complete).catch(failed);
  }
  
  function postPuestos(data){
    return $http.post('/api/usuariopuestos', data).then(complete).catch(failed);
  }
  function getPuestos(){
    return $http.get('/api/usuariopuestos/1').then(complete).catch(failed);
  }
  
  function postSoftware(data){
    return $http.post('/api/usuariosoftware', data).then(complete).catch(failed);
  }
  function getSoftware(){
    return $http.get('/api/usuariosoftware/1').then(complete).catch(failed);
  }

  function postSueldo(data){
    return $http.post('/api/usuariosueldo', data).then(complete).catch(failed);
  }
  function getSueldo(){
    return $http.get('/api/usuariosueldo/1').then(complete).catch(failed);
  }

  function postValores(data){
    return $http.post('/api/usuariovalores', data).then(complete).catch(failed);
  }
  function getValores(){
    return $http.get('/api/usuariovalores/1').then(complete).catch(failed);
  }
  

  function getCountries(){
    return $http.get('./data/paises.json').then(complete).catch(failed);
  }

  function getStates(file){
    return $http.get('./data/estados/'+file+'.json').then(complete).catch(failed);
  }

  function getLanguages(){
    return $http.get('./data/idiomas.json').then(complete).catch(failed);
  }

  function complete(response){
    return response.data;
  }

  function failed(error){
    console.log(error.statusText);
  }

};