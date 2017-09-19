<?php

 header('Access-Control-Allow-Origin: *');  

    $method = $_REQUEST['method'];
    $url    = $_REQUEST['url'];

function normalizeString($str = '')
{
    $str = strip_tags($str); 
    $str = preg_replace('/[\r\n\t ]+/', ' ', $str);
    $str = preg_replace('/[\"\*\/\:\<\>\?\'\|]+/', ' ', $str);
    $str = strtolower($str);
    $str = html_entity_decode( $str, ENT_QUOTES, "utf-8" );
    $str = htmlentities($str, ENT_QUOTES, "utf-8");
    $str = preg_replace("/(&)([a-z])([a-z]+;)/i", '$2', $str);
    $str = str_replace(' ', '-', $str);
    $str = rawurlencode($str);
    $str = str_replace('%', '-', $str);
    $str = str_replace('.','-',$str);
    return $str;
}

// echo "<pre>";

    if($method == "SAVE"){
    
    // get title
        exec("youtube-dl --format best --no-check-certificate --write-sub --no-warnings --get-filename " . $url ." -o %(title)s.%(ext)s", $out);
        $title = $out[0];
    
    // goto storage, create folder, download
        $title = normalizeString($title);

        if(!is_dir("Storage/".$title))
        {

                $command = "cd Storage & mkdir " . $title . " & cd ". $title . " & "; 
                $command .= "youtube-dl --format best --no-check-certificate --write-sub --no-warnings " . $url ." -o %(title)s.%(ext)s & ";
                $command .= " start .";
                exec($command,$out2);
        }
        else{
            $command = "cd Storage & cd " . $title . " & start .";
            exec($command); 
        }

        echo "Downloading video " . $out[0];
        // echo "<pre>";
        // print_r($title);
        // print_r($out2);        
    }

    else if($method == "SHOW"){
        $command = "youtube-dl -g --format best --no-check-certificate --no-warnings " . $url;
        exec($command, $out);
        $out = "<a href='".$out[0]."'> download video </a> ";
        echo $out;
    }

    else{
        echo "ERROR !";
    }
