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

		console.log("employee: " + employee + "\nquantity: " + quantity + "\ntime: " + time);

		var newEntry = {
			
			employee_number: employee,
			quantity_processed: quantity,
			time_spent: time,
			date_added: firebase.database.ServerValue.TIMESTAMP
		
		}

		database.ref().push(newEntry);

		$("#employee").val("");
		$("#quantity").val("");
		$("#display").text("00:00");

		stopwatch.time = 0;
		stopwatch.stop();

	});
	// $("#stop").on("click", stopwatch.stop);
	// $("#reset").on("click", stopwatch.reset);
	$("#start").on("click", stopwatch.start);
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