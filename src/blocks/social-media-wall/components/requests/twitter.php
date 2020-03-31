<?php

    $token = "AAAAAAAAAAAAAAAAAAAAAIc4BwEAAAAA4GCwcNoyNC8KuWoeYpmzI8WE5xI%3DDABQhYIrpGO2GaX98qGcSJnmqGTKt7NRWZCjSzFYGwv3UtDtgN";
    header('Content-Type: application/json');
    $ch = curl_init('https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=799199295794741248&count=4'); 
    $auth = "Authorization: Bearer ".$token; 
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $auth )); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

    $result = curl_exec($ch); 
    curl_close($ch); 
    
    $response = json_decode($result); 
    $products_arr=array();

    foreach($response as $resp) {
        array_push($products_arr, $resp);
    }

    echo json_encode($products_arr);