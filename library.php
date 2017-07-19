<?php

  if(isset($_GET['action']) && !empty($_GET['action'])) {
      $action = $_GET['action'];
      switch($action) {
          case 'getAllCities' :
            $cities = getAllCities();
            echo json_encode($cities);
            break;
          case 'getAllTypes' :
            $types = getAllTypes();
            echo json_encode($types);
            break;
          default : break;
      }
  }

  // Funcion que obtiene y devuelve todas las ciudades sin repetirlas
  function getAllCities(){
    $data_file = fopen("./data/data-1.json","r");
    $data_readed = fread($data_file, filesize("./data/data-1.json"));
    $data = json_decode($data_readed, true);
    $cities = array();

    foreach ($data as $key => $value) {
      $cities[] = $value['Ciudad'];
    }

    $cities = array_unique($cities);
    fclose($data_file);

    return $cities;
  }

  // Funcion que obtiene y devuelve todos los tipos de propiedades inmobiliarias sin repetirlos
  function getAllTypes(){
    $data_file = fopen("./data/data-1.json","r");
    $data_readed = fread($data_file, filesize("./data/data-1.json"));
    $data = json_decode($data_readed, true);
    $types = array();

    foreach ($data as $key => $value) {
      $types[] = $value['Tipo'];
    }

    $types = array_unique($types);
    fclose($data_file);

    return $types;
  }

?>
