angular.module('pulsoe-user').controller('RegisterController', RegisterController);

function RegisterController($scope, $rootScope, $window, userDataFactory){
    var vm = this;

    $rootScope.header = "Pulsoe panel - Registro";
    
    vm.maxlenght = 600;

    vm.year = new Date().getFullYear();

    vm.step = 1;
    vm.maxStep = 6;
    vm.stepWidth = {
        "width" : "0%"
    };
    vm.error = false;
    vm.userJob = [];
    vm.userIdioma = [];
    vm.userCapacitacion = [];
    vm.userSkill = [];
    vm.userSoftware = [];

    vm.countries = [];
    vm.languages = [];

    vm.days = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    vm.months = [
        {"mes":01, "nombre":"Enero"},
        {"mes":02, "nombre":"Febrero"},
        {"mes":03, "nombre":"Marzo"},
        {"mes":04, "nombre":"Abril"},
        {"mes":05, "nombre":"Mayo"},
        {"mes":06, "nombre":"Junio"},
        {"mes":07, "nombre":"Julio"},
        {"mes":08, "nombre":"Agosto"},
        {"mes":09, "nombre":"Septiembre"},
        {"mes":10, "nombre":"Octubre"},
        {"mes":11, "nombre":"Noviembre"},
        {"mes":12, "nombre":"Diciembre"}
        ];
    vm.years = [];
    for (var i = vm.year; i >= (vm.year - 125); i-=1) {
        vm.years.push(i);
    }
    
    userDataFactory.countries().then(function(response){
        response.forEach(function(element) {
            // vm.countries.push(element.translations.es);
            vm.countries.push(element);
        }, this);
        vm.countries.push("Otro");
    }).catch(function(error){
        console.log(error);
    });

    vm.getEstado = function(){
        vm.states = [];
        if(vm.pais.filename){
            // console.log(vm.pais.filename);
            userDataFactory.states(vm.pais.filename).then(function(response){
                // console.log(response);
                response.forEach(function(element) {
                    vm.states.push(element);
                }, this);
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("no hay");
        }
        vm.states.push({"name":"Otro", "code":"N/A"});
    };

    userDataFactory.languages().then(function(response){
        // console.log(response);
        response.forEach(function(element) {
            // vm.countries.push(element.translations.es);
            vm.languages.push(element.nombre);
        }, this);
        vm.countries.push("Otro");
    }).catch(function(error){
        console.log(error);
    });

    vm.map = {
        center: [29.084483, -110.958786],
        options: function() {
            return {
            streetViewControl: false,
            scrollwheel: false
            }
        }, 
        zoom : 5
    };

    vm.marker = {
        position: [],
        decimals: 4,
        options: function() {
            return { draggable: true };
        }
    };

    vm.saveUserData = function(){
        vm.discapacidad = (typeof vm.discapacidad === 'undefined') ? "" : vm.discapacidad;
        vm.facebook = (typeof vm.facebook === 'undefined') ? "" : vm.facebook;
        vm.twitter = (typeof vm.twitter === 'undefined') ? "" : vm.twitter;
        vm.linkedin = (typeof vm.linkedin === 'undefined') ? "" : vm.linkedin;
        vm.licenciaConducir = (typeof vm.licenciaConducir === 'undefined') ? false : vm.licenciaConducir;
        vm.vehiculoPropio = (typeof vm.vehiculoPropio === 'undefined') ? false : vm.vehiculoPropio;

        var userData = {
            // fechaNacimiento : vm.birthyear+"-"+vm.birthmonth.mes+"-"+vm.birthday,
            "fechaNacimiento" : vm.birthyear+"-"+vm.birthmonth.mes+"-"+vm.birthday,
            "sexo" : vm.sexo,
            "imagen" : vm.avatar,
            "estadoCivil" : vm.estadoCivil,
            "telefono" : parseInt(vm.telefono,10),
            "celular" : parseInt(vm.celular,10),
            "pais" : vm.pais.name,
            "estado" : vm.estado.name,
            "ciudad" : vm.ciudad,
            "CP" : parseInt(vm.zip,10),
            "direccion" : vm.address,
            "nacionalidad" : vm.nacionalidad.name,
            "licenciaConducir" : vm.licenciaConducir,
            "vehiculoPropio" : vm.vehiculoPropio,
            "discapacidad" : vm.discapacidad,
            "facebook" : vm.facebook,
            "twitter" : vm.twitter,
            "linkedin" : vm.linkedin,
            "lat" : parseInt(vm.lat,10),
            "lng" : parseInt(vm.lng,10),
        };

        if(vm.userDataForm.$valid){
            vm.error = false;
            console.log(userData);
            // saveAndContinue(userData);
            userDataFactory.postDatos(userData).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                    vm.nextStep();
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                vm.error = true;
                console.log(error);
            });
        } else {
            vm.error = true;
            console.log("Falta algo");
        }

    };
    
    vm.callmap = function(){
        setTimeout(vm.getmarker,1000);
    };

    vm.getmarker = function() {
        var geocoder= new google.maps.Geocoder();
        var address = document.getElementById('address-input').value;
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            vm.lat = lat;
            vm.lng = lng;
            vm.marker.position = [lat, lng];
            vm.map.center = [lat, lng];
            vm.map.zoom = 16;
            // console.log(vm.marker.position);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
        });
    };

    vm.addExperiencia = function(){
        vm.actual = (typeof vm.actual === 'undefined') ? false : vm.actual;
        var userData = {
            "nombre" : vm.nomEmpresa,
            "giroEmpresa" : vm.giro,
            "puesto" : vm.cargo,
            "area" : vm.area,
            "fechaInicio" : vm.yearInicio+"-"+vm.mesInicio.mes+"-01",
            "fechaFinal" : vm.yearFinal+"-"+vm.mesFinal.mes+"-01",
            "trabajoActual" : vm.actual,
            "descripcion" : vm.expDesc,
            "sueldo" : vm.sueldo,
            "periodo" : vm.periodo
        };
        vm.userJob.push(userData);

        vm.nomEmpresa = "";
        vm.giro = "";
        vm.cargo = "";
        vm.area = "";
        vm.mesInicio = "";
        vm.mesFinal = "";
        vm.actual = "";
        vm.expDesc = "";
        vm.sueldo = "";
        vm.periodo = "";
        vm.userExperienciaForm.$setPristine();
        vm.userExperienciaForm.$setUntouched();
        
    };

    
    vm.getFecha = function(fecha, actual){
        var fechaActual;
        if(!actual){
            fechaActual = new Date(fecha);
        } else {
            var currentDate = new Date();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            fechaActual = new Date(year+"-"+month);
        }
        return fechaActual;
    };

    vm.saveUserExperiencia = function(){
        
        if(vm.userJob.length >= 1 || vm.noExp){
            if (vm.noExp) {
                vm.userJob.push({});
            }
            vm.error = false;
            // saveAndContinue(vm.userJob);
            console.log(vm.userJob);
            userDataFactory.postExperiencia(vm.userJob).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                    vm.nextStep();
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error);
            });
        } else {
            vm.error = true;
            console.log("Falta algo")
        }

    };

    vm.saveUserFormacion = function(){
        var userFormacion = {
            "centroEducativo" : vm.centro,
            "nivel" : vm.nivel,
            "estado" : vm.estado,
            "fechaInicio" : vm.yearInicio+"-"+vm.mesInicio.mes+"-01",
            "fechaFinal" : vm.yearFinal+"-"+vm.mesFinal.mes+"-01"
        };

        // vm.userIdioma
        // vm.userCapacitacion

        if(vm.userFormacionForm.$valid){
            vm.error = false;
            // saveAndContinue(userData);
            // formación
            console.log(userFormacion);
            userDataFactory.postFormacion(userFormacion).then(function(response){
                if (response.status === 201) {
                    console.log("Guardado correctamente");
                    vm.nextStep();
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error)
            });
            // idioma
            // console.log(vm.userIdioma);
            userDataFactory.postIdioma(vm.userIdioma).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error);
            });
            // // capacitacion
            console.log(vm.userCapacitacion);
            userDataFactory.postCapacitacion(vm.userCapacitacion).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error);
            });
            
        } else {
            vm.error = true;
            console.log("Falta algo")
        }

    };

    vm.addIdioma = function(){
        var userData = {
            "idioma" : vm.idioma,
            "conversacion" : vm.conversacion,
            "lectura" : vm.lectura,
            "redaccion" : vm.redaccion
        };
        vm.userIdioma.push(userData);
        // console.log(vm.userJob);

        vm.idioma = "";
        vm.comprension = "";
        vm.conversacion = "";
    };

    vm.addCapacitacion = function(){
        var userData = {
            "capacitacion" : vm.capacitacion,
            "area" : vm.area,
            "descripcion" : vm.capacitacionDesc
        };

        vm.userCapacitacion.push(userData);


        vm.capacitacion = "";
        vm.area = "";
        vm.capacitacionDesc = "";
    };

    vm.addSkill = function(){
        var userData = {
            "habilidad" : vm.habilidad,
        };

        vm.userSkill.push(userData);

        vm.habilidad = "";
    };

    vm.addSoftware = function(){
        var userData = {
            "software" : vm.software,
            "nivel" : vm.nivelHab
        };

        vm.userSoftware.push(userData);

        vm.software = "";
        vm.nivelHab = "";
    };

    vm.saveUserHabilidad = function(){

        var habilidad = {
            "habilidades" : vm.habilidad
        };

        if(vm.habilidad.length >= 1){
            // saveAndContinue(vm.userIdioma);
            // habilidades
            console.log(vm.userSkill);
            userDataFactory.postHabilidad(habilidad).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                    vm.error = false;
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error);
            });
            // Software
            console.log(vm.userSoftware);
            userDataFactory.postSoftware(vm.userSoftware).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                    vm.error = false;
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error);
            });
            vm.nextStep();
        } else {
            vm.error = true;
            console.log("Falta algo");
        }
    };

     vm.saveUserAdicional = function(){
         var userSueldo = {
            "sueldo" : vm.sueldo,
            "periodo" : vm.periodo
         };
         var userPuestos = [
            {"puesto" : vm.userPuesto1},
            {"puesto" : vm.userPuesto2},
            {"puesto" : vm.userPuesto3}
         ];
         var userValores = [
            {"valor" : vm.userValor1},
            {"valor" : vm.userValor2},
            {"valor" : vm.userValor3}
        ];

        if(vm.userAdicionalForm.$valid){
            console.log(userValores);
            // saveAndContinue(userData);
            // sueldo
            console.log(userSueldo);
            userDataFactory.postSueldo(userSueldo).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                    vm.error = false;
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error);
            });
            // puestos
            console.log(userPuestos);
            userDataFactory.postPuestos(userPuestos).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                    vm.error = false;
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error);
            });
            // valores
            userDataFactory.postValores(userValores).then(function(response){
                if(response.status === 201){
                    console.log("Guardado correctamente");
                    vm.error = false;
                } else {
                    vm.error = true;
                }
            }).catch(function(error){
                console.log(error);
            });
            vm.nextStep();
        } else {
            vm.error = true;
            console.log("Falta algo");
        }
    };

    vm.removeExp = function(exp){
     var removExp = vm.userJob.indexOf(exp);
     vm.userJob.splice(removExp, 1);
   };

   vm.removeLang = function(lang){
     var removLang = vm.userIdioma.indexOf(lang);
     vm.userIdioma.splice(removLang, 1);
   };

   vm.removeCap = function(cap){
     var removCap = vm.userIdioma.indexOf(cap);
     vm.userIdioma.splice(removCap, 1);
   };

   vm.removeSkill = function(skill){
     var removSkill =vm.userSkill.indexOf(skill);
     vm.userSkill.splice(removSkill, 1);
   };

   vm.removeSoftware = function(soft){
     var removSoft =vm.userSkill.indexOf(soft);
     vm.userSoftware.splice(removSoft, 1);
   };

    function saveAndContinue(data){
    //  console.log(data);
        userDataFactory.test(data).then(function(response){
        if(response.status === 201){
            console.log("Guardado correctamente");
            vm.nextStep();
        } else {
            vm.error = true;
        }
        }).catch(function(error){
            console.log(error);
        })
    };
    

    vm.readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            console.log(reader);
            reader.onload = function (e) {
                $('#profilePreview').attr('src', e.target.result);
                $('#profilePreview').show();
                $('.esconder').show();
            }

            reader.readAsDataURL(input.files[0]);
        } 
    };

    vm.nextStep = function(){
        if(vm.step <= vm.maxStep || !vm.error){
            vm.step += 1;
            setProgress(vm.step);
            $window.scrollTo(0, 0);
         }
     };
     vm.previousStep = function(){
         vm.step -= 1;
         setProgress(vm.step);
         $window.scrollTo(0, 0);
     };

     var setProgress = function(value){
        //  console.log(value);
         vm.stepWidth.width = ((value/vm.maxStep)*100) + "%";
     };

     vm.isSelected = function(index) {
        return index === vm.checkboxSelection;
    };
     
    $scope.$on('$includeContentLoaded', function () {
        var placesAutocomplete = places({
            container: document.querySelector('#address-input')
        });
        // Cambia el nombre del label de la imagen de perfil
        var inputs = document.querySelectorAll( '.inputfile' );
        Array.prototype.forEach.call( inputs, function( input ){
            var label	 = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener( 'change', function( e )
            {
                var fileName = '';
                fileName = e.target.value.split( '\\' ).pop();

                if( fileName )
                    label.querySelector( 'span' ).innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });
        });
    });
    $scope.$on('$locationChangeStart', function( event ) {
        var answer = confirm("Aún no ha registrado su información.\n¿Desea salir de la página?")
        if (!answer) {
            event.preventDefault();
        }
    });
}