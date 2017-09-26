  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAra0iGH-v6B_95cypVNEW6-aG2fzGIM1Y",
      authDomain: "detrain-69c36.firebaseapp.com",
      databaseURL: "https://detrain-69c36.firebaseio.com",
      projectId: "detrain-69c36",
      storageBucket: "detrain-69c36.appspot.com",
      messagingSenderId: "932919688789"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";

  $(document).on("click", ".submit-train", function(event) {
      event.preventDefault();

      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = $("#first-train-time").val().trim();
      frequency = $("#frequency").val().trim();

      database.ref().push({
          name: trainName,
          destination: destination,
          firsttrain: firstTrainTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  });

  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

      var retrievedData = snapshot.val();

      var tableHTML = "<tr><td>" + retrievedData.name + "</td><td>" + retrievedData.destination + "</td><td>" + retrievedData.frequency + "</td></tr>";

      var now = moment().format("HH:mm");
      var firstTrainConverted = moment(retrievedData.firsttrain, "HH:mm");
      //console.log(now);
      console.log(firstTrainConverted);
      var nextArrival = moment(firstTrainConverted).add(retrievedData.frequency, "m");
      console.log(nextArrival);

      $(".train-list").append(tableHTML);
  }, function(errorObject) {
      console.log("There is an retrival error!");
  });