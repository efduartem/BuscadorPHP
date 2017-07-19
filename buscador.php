<?php

  if(isset($_GET['action']) && !empty($_GET['action'])) {
      $action = $_GET['action'];
      switch($action) {
          case 'getAllRealStates' :
            $realStates = getAllRealStates();
            echo json_encode($realStates);
            break;
          case 'filterResults' :
            $precioFrom =  $_GET['precioFrom'];
            $precioTo =  $_GET['precioTo'];
            $tipo =  $_GET['tipo'];
            $ciudad =  $_GET['ciudad'];
            $realStates = filterResults($precioFrom, $precioTo, $tipo, $ciudad);
            echo json_encode($realStates);
            break;
          default : break;
      }
  }

  function getAllRealStates(){
    $data_file = fopen("./data/data-1.json","r");
    $data_readed = fread($data_file, filesize("./data/data-1.json"));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
  }

  function filterResults($precioFrom, $precioTo, $tipo, $ciudad){
    $data_file = fopen("./data/data-1.json","r");
    $data_readed = fread($data_file, filesize("./data/data-1.json"));
    $data = json_decode($data_readed, true);
    $realState = array();
    $realStatePrice;
    $add = true;
    foreach ($data as $key => $value) {
      $add = true;
      $realStatePrice = str_replace(array('$', ','), '' , $value['Precio']);
      if($realStatePrice < $precioFrom || $precioTo < $realStatePrice){
        $add = false;
      }

      if(!empty($tipo) && $add){
        if($tipo != $value['Tipo']){
            $add = false;
        }
      }

      if(!empty($ciudad) && $add){
        if($ciudad != $value['Ciudad']){
            $add = false;
        }
      }

      if($add){
        $realState[] = $value;
      }
    }

    fclose($data_file);
    return $realState;
  }

?>
