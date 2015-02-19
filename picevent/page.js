$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://picevent.azure-mobile.net/', 'pVjoEBURoOusjXZcxWmCcjtLdpsSsa87');
    var todoItemTable = client.getTable('todoitem');
    var pictureTable = client.getTable('todoitem');

    // Read current data and rebuild UI.
    // If you plan to generate complex UIs like this, consider using a JavaScript templating library.
    function refreshTodoItems() {
        var query = todoItemTable.where({ complete: false });

        query.read().then(function(todoItems) {
            var listItems = $.map(todoItems, function(item) {
                return $('<li>')
                    .attr('data-todoitem-id', item.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
                    .append($('<div>').append($('<input class="item-text">').val(item.text)));
            });

            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
        }, handleError);
    }

    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }

    function getTodoItemId(formElement) {
        return $(formElement).closest('li').attr('data-todoitem-id');
    }

    // Handle insert
    $('#add-item').submit(function (evt) {
        console.log("submitted");
        var textbox = $('#new-item-text'),
            itemText = textbox.val();
        if (itemText !== '') {
            todoItemTable.insert({ text: itemText, complete: false }).then(refreshTodoItems, handleError);
        }
        textbox.val('').focus();
        evt.preventDefault();
    });

    // Handle Picture insert
    //$('#add-picture').submit(function (evt) {
    //    var textbox = $('#new-picture-name'),
    //        pictureName = textbox.val();
    //    if (pictureName !== '') {
    //        pictureTable.insert({ text: itemText, complete: false }).then(refreshTodoItems, handleError);
    //    }
    //    textbox.val('').focus();
    //    evt.preventDefault();
    //});



    // Handle update
    $(document.body).on('change', '.item-text', function() {
        var newText = $(this).val();
        todoItemTable.update({ id: getTodoItemId(this), text: newText }).then(null, handleError);
    });

    $(document.body).on('change', '.item-complete', function() {
        var isComplete = $(this).prop('checked');
        todoItemTable.update({ id: getTodoItemId(this), complete: isComplete }).then(refreshTodoItems, handleError);
    });

    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems, handleError);
    });

    // On initial load, start by fetching the current data
    refreshTodoItems();


    function upload(file, type, url) {

        var ajaxRequest = new XMLHttpRequest();

        ajaxRequest.onreadystatechange = function (aEvt) {
            console.log(ajaxRequest.readyState);

            if (ajaxRequest.readyState == 4)
                console.log(ajaxRequest.responseText);
        };

        ajaxRequest.upload.onprogress = function (e) {
            var percentComplete = (e.loaded / e.total) * 100;
            console.log(percentComplete + "% completed");

            uploadProgress.value = percentComplete;
        };

        ajaxRequest.onerror = function () {
            alert("ajaxRequest error");
        };

        ajaxRequest.open('PUT', url, true);
        ajaxRequest.setRequestHeader('Content-Type', type);
        ajaxRequest.setRequestHeader('x-ms-blob-type', 'BlockBlob');
        ajaxRequest.send(file);
    }

    $('#add-picture').submit(function (evt) {
 
        var files = fileControl.file;
        console.log(files);
        var file = document.getElementById('fileControl');
        console.log(file.value);


            var reader = new FileReader();

            console.log("submitting picture");
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: 'http://localhost:51287/tables/Picture/',
                data: '{"Name": "' + file.name + '"}',
                success: function (res, status, xhr) {
                    console.log(e.target.result, file.type, res);
                    //upload(e.target.result, theFile.type, res);

                },
                //error: function (res, status, xhr) {
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                    console.log(XMLHttpRequest);
                    //console.log(xhr.statusText);
                    console.log("Can't get the Shared Access Signature");
                }
            });

            reader.onloadend = (function (theFile) {
                return function (e) {



            };
            })(file);
             
            reader.readAsArrayBuffer(file);


    });




});