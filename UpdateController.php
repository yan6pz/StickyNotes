
<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
include("DataAccess.php");

$dal = new DataAccess();

$name = $_POST['name'];
$description = $_POST['description'];
$link = $_POST['link'];
$noteId = $_POST['noteId'];

$dal->UpdateNote($name,$description,$link,$noteId);