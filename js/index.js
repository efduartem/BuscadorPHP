/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  // Quedan comentadadas las lineas relacionadas a la funcionalidad de video ya que en el paquete descargado no se encontraba el recurso multimedia/mp4 necesario
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
      //  video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        // video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      // video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();


$(document).ready(function() {
    //Se obtienen todas las ciudades para la etiqueta select
    getAllCities(function(){
        $('#selectCiudad').material_select();
    });

    //Se obtienen todas los tipos para la etiqueta select
    getAllTypes(function(){
        $('#selectTipo').material_select();
    });

    //Accion a ejecutar para mostrar todos los registros
    $('#mostrarTodos').on('click', function() {
        getAllRealStates();
    });

    //Accion a ejecutar para realizar busqueda/filtro
    $('#formulario').submit(submitSearch);
});

function getAllCities(callback){
  $.ajax({
    url: "library.php",
    dataType: "json",
    type: 'GET',
    data:{action:'getAllCities'},
    success: function(response){
      $.map(response, function(city){
        var option = '<option value=":city:">:city:</option>';
        option = option.replace(':city:', city)
                        .replace(':city:', city);
        $('#selectCiudad').append(option);
      })
      callback();
    },
    error: function(err){
      console.log(err);
    }
  })
}

function getAllTypes(callback){
  $.ajax({
    url: "library.php",
    dataType: "json",
    type: 'GET',
    data:{action:'getAllTypes'},
    success: function(response){
      $.map(response, function(type){
        var option = '<option value=":type:">:type:</option>';
        option = option.replace(':type:', type)
                        .replace(':type:', type);
        $('#selectTipo').append(option);
      })
      callback();
    },
    error: function(err){
      console.log(err);
    }
  })
}

function getAllRealStates(){
  $.ajax({
    url: "buscador.php",
    dataType: "json",
    type: 'GET',
    data:{action:'getAllRealStates'},
    success: function(response){
      if(response){

        //Se setean los select de ciudad y tipo a la primera opcion

        var selectCiudad = $('#selectCiudad');
        selectCiudad.prop('selectedIndex', 0);
        selectCiudad.material_select();

        var selectTipo = $('#selectTipo');
        selectTipo.prop('selectedIndex', 0);
        selectTipo.material_select();

        //Se remueven todos los resultados que anteriormente pudieron haber sido cargados
        $('.itemMostrado').remove();

        $.map(response, function(realState, index){
          var template = '<div class="itemMostrado card">'+
                            '<img src="img/home.jpg" alt="">'+
                            '<div class="card-stacked">'+
                              '<div class="card-content">'+
                                '<div><b>Direccion: </b>:direccion:</div>'+
                                '<div><b>Ciudad: </b>:ciudad:</div>'+
                                '<div><b>Telefono: </b>:telefono:</div>'+
                                '<div><b>Código postal: </b>:codigoPostal:</div>'+
                                '<div><b>Precio: </b><span class="precioTexto">:precio:</span></div>'+
                                '<div><b>Tipo: </b>:tipo:</div>'+
                              '</div>'+
                              '<div class="card-action right-align"><a href="#">Ver más</a></div>'+
                            '</div>'+
                          '</div>'
          template = template.replace(':direccion:', realState['Direccion'])
                             .replace(':ciudad:', realState['Ciudad'])
                             .replace(':telefono:', realState['Telefono'])
                             .replace(':codigoPostal:', realState['Codigo_Postal'])
                             .replace(':precio:', realState['Precio'])
                             .replace(':tipo:', realState['Tipo'])
          $('.colContenido').append(template)
        })
      }
    },
    error: function(err){
      console.log(err);
    }
  })
}

function submitSearch(event){
  event.preventDefault()
  var precio = $('#rangoPrecio').val();
  var precioFrom = precio.split(";")[0]
  var precioTo = precio.split(";")[1]

  var tipo = $('#selectTipo').val();
  var ciudad = $('#selectCiudad').val();

  $.ajax({
    url: "buscador.php",
    dataType: "json",
    type: 'GET',
    data:{action:'filterResults', precioFrom:precioFrom, precioTo:precioTo, tipo:tipo, ciudad:ciudad},
    success: function(response){
      if(response){
        //Se remueven todos los resultados que anteriormente pudieron haber sido cargados
        $('.itemMostrado').remove();
        $.map(response, function(realState, index){
          var template = '<div class="itemMostrado card">'+
                            '<img src="img/home.jpg" alt="">'+
                            '<div class="card-stacked">'+
                              '<div class="card-content">'+
                                '<div><b>Direccion: </b>:direccion:</div>'+
                                '<div><b>Ciudad: </b>:ciudad:</div>'+
                                '<div><b>Telefono: </b>:telefono:</div>'+
                                '<div><b>Código postal: </b>:codigoPostal:</div>'+
                                '<div><b>Precio: </b><span class="precioTexto">:precio:</span></div>'+
                                '<div><b>Tipo: </b>:tipo:</div>'+
                              '</div>'+
                              '<div class="card-action right-align"><a href="#">Ver más</a></div>'+
                            '</div>'+
                          '</div>'
          template = template.replace(':direccion:', realState['Direccion'])
                             .replace(':ciudad:', realState['Ciudad'])
                             .replace(':telefono:', realState['Telefono'])
                             .replace(':codigoPostal:', realState['Codigo_Postal'])
                             .replace(':precio:', realState['Precio'])
                             .replace(':tipo:', realState['Tipo'])
          $('.colContenido').append(template)
        })
      }
    },
    error: function(err){
      console.log(err);
    }
  })
}
