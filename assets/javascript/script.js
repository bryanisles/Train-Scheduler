// Initialize Firebase
var myTrainName = "";  //var for #trainName
var myGoToPlace = "";  //var for #myDestination
var myFrequency = 0;   //var for #myHz
var myNextArrival;     //var for #myArrivalTime

myTrainName = $("#trainName").val().trim();
myGoToPlace = $("#myDestination").val().trim();
myFrequency = $("#myHz").val().trim();
myNextArrival = $("#myArrivalTime").val().trim();

var config = {
	apiKey: "AIzaSyBaP3SCLri8OCHp1qGxbqOh0KujM_sJOmA",
	authDomain: "train-scheduler-4d8dd.firebaseapp.com",
	databaseURL: "https://train-scheduler-4d8dd.firebaseio.com",
	projectId: "train-scheduler-4d8dd",
	storageBucket: "train-scheduler-4d8dd.appspot.com",
	messagingSenderId: "519062675390"
};

firebase.initializeApp(config);

var myData = firebase.database();

$("#mySubmission").on("click", function(e) {
	e.preventDefault();
	
	myTrainName = $("#trainName").val().trim();
	myGoToPlace = $("#myDestination").val().trim();
	myFrequency = $("#myHz").val().trim();
	myNextArrival = $("#myArrivalTime").val().trim();

	myData.ref().push({
		trainName: myTrainName,
		destination: myGoToPlace,
		frequency: myFrequency,
		nextArrival: myNextArrival,

	});

	$("#trainName").val("");
	$("#myDestination").val("");
	$("#myHz").val("");
	$("#myArrivalTime").val("");
});

myData.ref().on("child_added", function(childSnapshot){
var mySS = childSnapshot.val();
var arrivalConvertedTime = moment(mySS.nextArrival, "HH:mm").format("X");
var currentConvertedTime = moment().format("X");
var differenceTime = (currentConvertedTime - arrivalConvertedTime) / 60;
var minutesAway = (mySS.frequency - differenceTime % mySS.frequency).toFixed(2);
var myRow = $("<tr>");
var myData = $("<td>");


myData.html(mySS.trainName);
myRow.append(myData);

myData = $("<td>");
myData.html(mySS.destination);
myRow.append(myData);

myData = $("<td>");
myData.html(mySS.frequency);
myRow.append(myData);

myData = $("<td>");
myData.html(mySS.nextArrival);
myRow.append(myData);

myData = $("<td>");
myData.html(minutesAway);
myRow.append(myData);

$("#data-output").append(myRow);
});