
function StickyNotesScript() {
    StickyNotesScript.templateDialog = "<form id='notes-form' method='post'>"+
    "<fieldset>"+
    "<legend></legend>"+
    "<input id='Id' type='hidden' value='{UserId}' name='Id'>"+
    "<div class='editor-label'>"+
    "<label for='NoteName'>Заглавие</label>"+
    "<input id='NoteName' class='text-box single-line' type='text'  value='' name='NoteName'>" +
    "</div>"+
    "<div class='editor-label'>"+
    "<label for='NoteLink'>Линк</label>"+
    "<input id='NoteLink' class='text-box single-line' type='text'  value='' name='NoteLink'>"+
    "</div>"+
    "<div class='editor-label'>"+
    "<label for='NoteData'>Описание</label>"+
    "<textarea id='NoteData' value='' name='NoteData'></textarea>" +
    "</div>"+
    "</fieldset>"+
    "</form> ";


    StickyNotesScript.initialize = function() {
        StickyNotesScript.startUp();
    };
    StickyNotesScript.startUp = function () {
        $('#create-note').on('click', function () {
            StickyNotesScript.showCreateDialog();
        });
        $('.delete-note a').on('click', function () {
            StickyNotesScript.deleteNote(this);
        });
        $('.update-note a').on('click', function () {
            StickyNotesScript.showUpdateDialog(this);
        });
    };
    //Създаване на бележка чрез ajax
    StickyNotesScript.createNote = function () {
        var name=$('#NoteName').val();
        var description=$('#NoteData').val();
        var link=$('#NoteLink').val();

        //$.post( "/StickyNotes/CreateController.php", { name: name, description:description ,link:link,userId:1 })
        //    .done(function( data ) {
        //        alert( "Data Loaded: " + data );
        //    });

            $.ajax({
                url: "/StickyNotes/CreateController.php",
                type: "POST",
                data: { name: name, description:description ,link:link,userId:1 },

                success: function(data) {
                    StickyNotesScript.showDialogDetails(data);
                },
                error: function() {
                    StickyNotesScript.showDialogError();

                }
            });
    };
    //Редактиране на бележка чрез ajax
    StickyNotesScript.updateNote = function (target) {
        var name=$('#NoteName').val();
        var description=$('#NoteData').val();
        var link=$('#NoteLink').val();
        var noteId=target.id;

        $.ajax({
            url: "/StickyNotes/UpdateController.php",
            type: "POST",
            data: { name: name, description:description,link:link ,noteId:noteId },

            success: function(data) {
                fillNewText(target,name,description,link);
                $("#forma").hide();
            },
            error: function() {
                StickyNotesScript.showDialogError();

            }
        });
    };
    //Изтриване на бележка чрез ajax
    StickyNotesScript.deleteNote = function (target) {
        var noteId=target.id;

        $.ajax({
            url: "/StickyNotes/DeleteController.php",
            type: "POST",
            data: { noteId:noteId },

            success: function(data) {
                $(target).parent().parent().hide();
            },
            error: function() {
                StickyNotesScript.showDialogError();

            }
        });
    };

//Диалог за създаване на бележка
    StickyNotesScript.showCreateDialog = function () {
        var html = StickyNotesScript.templateDialog.replace("{UserId}", 1);

        $("#forma")[0].innerHTML=html;

        $("#forma").dialog({
            title: "Create Note",
            resizable: true,
            height: 370,
            width: 430,
            modal: true,
            buttons: [
                {
                    text: 'Create',
                    click: function () {
                        StickyNotesScript.createNote();
                    }
                },
                {

                    text: 'Cancel',
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    };
    //Диалог за редактиране на вече съществуваща бележка
    StickyNotesScript.showUpdateDialog = function (target) {
        var html = StickyNotesScript.templateDialog.replace("{UserId}", 1);



        $("#forma")[0].innerHTML=html;

        $("#forma").dialog({
            title: "Update Note",
            resizable: true,
            height: 370,
            width: 430,
            modal: true,
            buttons: [
                {
                    text: 'Update',
                    click: function () {
                        StickyNotesScript.updateNote(target);
                    }
                },
                {

                    text: 'Cancel',
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
        fillPreviousText(target);

    };
    function fillPreviousText(target){
        var name=$("#forma #NoteName");
        name.val($(target).parent().parent().find('h2').text());
        var data=$("#forma #NoteData");
        data.val($(target).parent().parent().find('p').text());
        var link=$("#forma #NoteLink");
        link.val($(target).parent().parent().find('a.rotated').attr("href"));
    }

    function fillNewText(target,name,data,link){

        $(target).parent().parent().find('h2').val(name);

        $(target).parent().parent().find('p').val(data);

        $(target).parent().parent().find('a.rotated').attr("href",link);
    }

    StickyNotesScript.showDialogDetails = function(data) {
        $("#forma")[0].innerHTML="Успешно създадена бележка";
        $("#forma").dialog({
            title: "Congrats!",
            resizable: true,
            height: 300,
            width:300,
            modal: true,
            buttons: [
                {
                    text: 'Cancel',
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    };



    StickyNotesScript.showDialogError = function() {
        $("#forma").text('Грешка! Опитайте по-късно.');
        $("#forma").dialog({
            title: "Error",
            resizable: true,
            height: 300,
            modal: true,
            buttons: [
                {
                    text: 'OK',
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    };


};