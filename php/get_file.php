<?php 
$url = $_GET['URL'];
$files = scandir($url);
echo json_encode($files)
?>
