// Initialize Firebase
var config = {
  apiKey: "AIzaSyChhz9pRqG8nMLMrRu-J0AOgzQ4G965AeI",
  authDomain: "vigilant-guacamole.firebaseapp.com",
  databaseURL: "https://vigilant-guacamole.firebaseio.com",
  projectId: "vigilant-guacamole",
  storageBucket: "vigilant-guacamole.appspot.com",
  messagingSenderId: "23239919280"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

window.onload = function() {
	$("#lap").on("click", function(event){

		var employee = $("#employee").val().trim();
		var quantity = $("#quantity").val().trim();
		var time = $("#display").text();

		$("#display").css('color', 'green');

		console.log("employee: " + employee + "\nquantity: " + quantity + "\ntime: " + time);

		var newEntry = {
			
			employee_number: employee,
			quantity_processed: quantity,
			time_spent: time,
			date_added: firebase.database.ServerValue.TIMESTAMP
		
		}

        if (employee !== "" && quantity !== "") {
        	database.ref().push(newEntry);
        } else {
        	alert("Please enter employee ID and quantity to get started");
        };


		$("#employee").val("");
		$("#quantity").val("");
		$("#display").text("00:00");

		stopwatch.time = 0;
		stopwatch.stop();

	});
	// $("#stop").on("click", stopwatch.stop);
	// $("#reset").on("click", stopwatch.reset);
	$("#start").on("click", function(){

		var employee = $("#employee").val().trim();
		var quantity = $("#quantity").val().trim();

		$("#display").css('color', 'red');

		if (employee === ""  || quantity === "") {

			alert("Please enter employee number and quantity to proceed.");

		} else if (employee.substr(0,1) !== "#" ) { 

			alert("Employee number must be of the form '#11' (pound sign followed by numerals).");

		} else {
			if (employee !== "" && quantity !== "" && employee.substr(0,1) === "#") {

				stopwatch.start();
				
			};
		}

	});

};

var intervalId;

var clockRunning = false;

var stopwatch = {

	time: 0,
	lap: 1,

	reset: function() {

		stopwatch.time = 0;
		stopwatch.lap = 1;

		$("#display").text("00:00");

		$("#laps").text("");
	},
	start: function() {

		if (!clockRunning) {
			intervalId = setInterval(stopwatch.count, 1000);
			clockRunning = true;
		}

		$("#lap").focus();
	},
	stop: function() {

		clearInterval(intervalId);
		clockRunning = false;

		$("#employee").focus();

	},
	recordLap: function() {

		var converted = stopwatch.timeConverter(stopwatch.time);

		$("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

		stopwatch.lap++;
	},
	count: function() {

		stopwatch.time++;

		var converted = stopwatch.timeConverter(stopwatch.time);
		console.log(converted);

		$("#display").text(converted);
	},
	timeConverter: function(t) {

		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		if (minutes === 0) {
			minutes = "00";
		}
		else if (minutes < 10) {
			minutes = "0" + minutes;
		}

		return minutes + ":" + seconds;
	}

};