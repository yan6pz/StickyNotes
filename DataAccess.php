
<?php

include("BaseModel.php");


 class DataAccess extends BaseModel {

     public function CreateNote($name,$description,$link,$userId){
         $db = $this->database->prepare("INSERT INTO notes (NoteName,NoteData,NoteLink,UserId) VALUES (:name,:description,:link,:userId)");
         $db->bindParam(':name', $name);
         $db->bindParam(':description', $description);
         $db->bindParam(':link', $link);
         $db->bindParam(':userId', $userId);

         $db->execute();

         return 'true';
     }

    function SelectNote(){
        //Изпълнявам селект заявка
        $result=$this->database->query("SELECT NoteId,NoteName, NoteData, NoteLink FROM notes");
        //връщам резултатите
        return $result;
    }
    function DeleteNote($id){
        $result = $this->database->query("Delete from notes WHERE NoteId='$id'");

        return $result;

    }
    public function UpdateNote($noteName,$noteData,$noteLink,$id){

        $db = $this->database->prepare("UPDATE notes SET NoteName=:name,NoteData=:description,NoteLink=:link WHERE NoteId=:noteId");
        $db->bindParam(':name', $noteName);
        $db->bindParam(':description', $noteData);
        $db->bindParam(':link', $noteLink);
        $db->bindParam(':noteId', $id);

        $db->execute();

        return "true";

    }


}