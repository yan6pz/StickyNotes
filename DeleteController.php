
<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
include("DataAccess.php");

$dal = new DataAccess();
$noteId = $_POST['noteId'];

$dal->DeleteNote($noteId);