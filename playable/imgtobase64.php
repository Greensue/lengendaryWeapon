<?php
$name = "imgtobase/tinified/";
$arr = array();
if(is_dir($name)){
    if ($dh = opendir($name)) {
        while (($file = readdir($dh)) !== false){
            if ($file != "." && $file != "..") {
                $type=getimagesize($name.$file);
                $fp=fopen($name.$file,"r")or die("Can't open file"); 
                $file_content=base64_encode(fread($fp,filesize($name.$file)));//base64编码
                switch($type[2]){//判读图片类型
                    case 1:$img_type="gif";break;
                    case 2:$img_type="jpg";break;
                    case 3:$img_type="png";break;
                }
                
                $a = substr($file, -5, 1);//
                if(is_numeric($a)){
                    $fname = substr($file, 0, -5);
                    $img=$fname."[".$a."].src = 'data:image/".$img_type.";base64,".$file_content."';\n";//合成图片的base64编码
                    echo $img;
                    if(!isset($arr[$fname])){
                        $arr[$fname] = 0;
                    }else{
                        $arr[$fname]++;
                    }
                }else{
                    $fname = substr($file, 0, -4);
                    $vstr = "var ".$fname."= new Image();\n";
                    $img=$fname.".src = 'data:image/".$img_type.";base64,".$file_content."';\n";//合成图片的base64编码
                    echo $vstr.$img;
                }
            }
        }
        
        foreach ($arr as $fn=>$num){
            $app = "var ".$fn."= [";
            for ($i = 0; $i<=$num; $i++){
                $app .= "new Image(), ";
            }
            $app = substr($app, 0, -2);
            $app .= "];\n";
            echo $app;
        }
        
    }
    closedir($dh);
}elseif(is_file($name)){
    $type=getimagesize($name);
    $fp=fopen($name,"r")or die("Can't open file"); 
    $file_content=base64_encode(fread($fp,filesize($name)));//base64编码
    switch($type[2]){//判读图片类型
        case 1:$img_type="gif";break;
        case 2:$img_type="jpg";break;
        case 3:$img_type="png";break;
    }
    $img="data:image/".$img_type.";base64,".$file_content;//合成图片的base64编码
    
    echo $img."';\n";
}else{
    echo "no such file or directory\n";
}
 
?>  