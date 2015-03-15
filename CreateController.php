
<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
include("DataAccess.php");

$dal = new DataAccess();

$name = $_POST['name'];
$description = $_POST['description'];
$link = $_POST['link'];
$userId = $_POST['userId'];

$dal->CreateNote($name,$description,$link,$userId);


//Function to check if the request is an AJAX request
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}