<!DOCTYPE html>
<head>
    <script type="text/javascript" src="ExternalScripts/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="ExternalScripts/jquery-ui.js"></script>
    <script type="text/javascript" src="StickyNotesScript.js"></script>
    <link rel="stylesheet" type="text/css" href="ExternalStyles/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link  href="http://fonts.googleapis.com/css?family=Reenie+Beanie:regular"rel="stylesheet"type="text/css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<input type="button" id="create-note" value="Create New Note">
<ul>
<?php
include("DataAccess.php");
$dal= new DataAccess();

$result = $dal->SelectNote();

foreach($result as $row) {

    echo '<li>';
    echo '<div class="update-note"><a id="'.$row['NoteId'].'" >U</a></div>';
    echo '<div class="delete-note"><a id="'.$row['NoteId'].'" >X</a></div></br></br>';
    echo '<a class="rotated" href="'.$row['NoteLink'].'">';
    echo '<h2>'.$row['NoteName'].'</h2>';

    echo '<p>'.$row['NoteData'].'</p></a></li>';
}

;?>

</ul>
<div id="forma"></div>
</body>
<script>
    $(document).ready(function() {
        StickyNotesScript();
        StickyNotesScript.initialize();
    });

</script>
</html>



