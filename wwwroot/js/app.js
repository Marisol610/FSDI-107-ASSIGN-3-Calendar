var isItImportant = false; //flag
var detailsVisible = true;
var DetailsShowButton = true;
var server = 'https://fsdi.azurewebsites.net/api';

function toggleImportant() {
    if (isItImportant) {
        $("#iconImp").removeClass('fas').addClass('far');
        isItImportant = false;
    }
    else {
        $("#iconImp").removeClass('far').addClass('fas');
        isItImportant = true;
    }
}
function toggleDetails() {
    if (detailsVisible) {
        $("#secForm").hide();
        detailsVisible = false;

    }
    else {
        $("#secForm").show();
        detailsVisible = true;

    }
}
$("#btnShowDetails").click(function (e) {
    detailsButtonShow = $(this).text()
    if (detailsButtonShow == "Hide Details") {
        $(this).text("Show Details").removeClass('far fa-eye-slash').addClass('fas fa-eye')
    }
    else {
        $(this).text('Hide Details').addClass('far fa-eye-slash')
    }

});





function createTask() {

    //get values from input
    var title = $("#txtTitle").val();
    var dueDate = $("#txtDate").val();
    var desc = $("#taskDescription").val();
    var location = $("#txtLocation").val();

    // apply validations
    if (title.length < 5) {
        $("#alertError").show();
        // show the alert panel
        // start a time to hide it
        //arrow function java6 latest update
        setTimeout(() => $("#alertError").hide(), 4000);
        return; // as soon as Java hits the return it stops and it won't continue
    }
    

    



/*validate the date for competency 

var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
if (!(date_regex.test(testDate))) {
    return false;
}*/ 
// Mr. insunza I apologize, I couldn't get the code to work :(





//create an object
var task = new Task(title, isItImportant, dueDate, desc, location);
// send object to server
$.ajax({
    type: 'POST',
    url: server + '/tasks',
    data: JSON.stringify(task),
    contentType: 'application/json',
    success: function (response) {
        console.log("Server says:", response);

        displayTask(response);
        // clear the form
        clear();
        //show a succesful message to the user
    },
    error: function (details) {
        console.log("Error:", details);
    }
});
}

// show some kind error message to the user




function displayTask(task) {// this task contains title etc...
    var cssClass = '';
    if (task.important) cssClass = 'fas';
    else cssClass = 'far';


    // parse the date object
    var date = new Date(task.dueDate);
    

    var syntax =

        `<div id='task${task.id}' class='task'>
        <h5>${task.title}</h5>
        
        
        <label class='task-section'>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</label>
        <label class='task-section'>${task.description}</label>
        <label class='task-section'>${task.location}</label><i id="iconstar" class= "${cssClass} far fa-star"></i>
               <i id="icontrash" class="fas fa-trash-alt" onclick='deleteTask(${task.id})'></i>


       </div> 
    </div>`;


    $("#pendingTasks").append(syntax);


}

function deleteTask(id) {
    console.log('Deleting', id);

    $.ajax({
        type: 'DELETE',
        url: server + '/tasks/' + id,
        success: function (response) {
            console.log("Deleted");
            $("#task" + id).remove(); // this is something like $("#task13").remove;
        },
        error: function (details) {
            console.log("Error"), details;
        }
    });

}


function clear() {
    $("#txtTitle").val("");
    $("#txtDate").val("");
    $("#taskDescription").val("");
    $("#txtLocation").val("");
    if (isItImportant) {
        toggleImportant();
    }
}

function fetchTaskFromServer() {

    $.ajax({
        type: 'GET',
        url: server + '/tasks',
        success: function (response) {
            console.log("Data from server", response);

            for (let i = 0; i < response.length; i++) {
                let task = response[i];
                if (task.user === "Marisol") {
                    displayTask(task);
                }


            }

        },
        error: function (details) {
            console.log("Error getting data", details);
        }
    });

    // travel the array (for loop)
    //get each object from the array
    //send the object to the display task

}





function init() {
    console.log("My Calendar");

    toggleDetails();

    fetchTaskFromServer();
    // load date

    // hook events
    $("#iconImp").click(toggleImportant);
    $("#btnShowDetails").click(toggleDetails);
    $("#btnSave").click(createTask);


    $("#alertError").hide();
}

function testGet() {

    $.ajax({
        type: 'GET',
        url: '/api/test',
        success: function (response) {
            console.log("Succeed", response);
        },
        error: function (details) {
            console.log("Error :(", details);
        }
    });

}



window.onload = init;
/**
 *
 * hide alertError when page loads
 * show it when there is an error
 */
