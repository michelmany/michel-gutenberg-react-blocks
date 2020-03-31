<?php

    header('Content-Type: application/json');
    $ch = curl_init('https://www.linkedin.com/oauth/v2/accessToken?grant_type=client_credentials&client_id=86lyk1yfeg3l6q&client_secret=ymMvlTZz2l4vRp7f'); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

    $result = curl_exec($ch); 
    curl_close($ch); 
    
    $response = json_decode($result); 
    $products_arr=array();


    var_dump($response);
    
    die;
    
    /*
    foreach($response as $resp) {
        array_push($products_arr, $resp);
    }

    echo json_encode($products_arr);*/