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
      $(".form-control").empty();

  });

  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

          var retrievedData = snapshot.val();
          var ctrain = retrievedData.firsttrain;

          var tableHTML = "<tr><td>" + retrievedData.name + "</td><td>" + retrievedData.destination + "</td><td>" + retrievedData.frequency + "</td>";

          var now = moment().format("HH:mm");

          var trainConverted = moment(ctrain, "HH:mm");

          var newTime = moment().diff(moment(trainConverted), "minutes");
          console.log(newTime);
          var remainder = newTime % retrievedData.frequency;
          console.log(remainder);
          var tilNextTrain = retrievedData.frequency - remainder;
          console.log(tilNextTrain);
          var nextTrain = moment().add(tilNextTrain, "minutes");

          var nextTraint = moment(nextTrain, "HH:mm").format("HH:mm");
          //console.log(nextTraint);
          tableHTML = tableHTML + "<td>" + nextTraint + "</td><td>" + tilNextTrain + "</td></tr>";


          $(".train-list").append(tableHTML);
      },
      function(errorObject) {
          console.log("There is an retrival error!");
      })