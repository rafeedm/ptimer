document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();
  console.log(app);
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      document.write(user.displayName);
      console.log(user);
    });
}

//stopwatch object
var sw = {
  /* [INIT] */
  etime: null, // holds HTML time display
  erst: null, // holds HTML reset button
  ego: null, // holds HTML start/stop button
  timer: null, // timer object
  now: 0, // current timer
  init: function () {
    // Get HTML elements
    sw.etime = document.getElementById("stopwatch");
    sw.erst = document.getElementById("reset");
    sw.ego = document.getElementById("controller");

    // Attach listeners
    sw.erst.addEventListener("click", sw.reset);
    sw.erst.disabled = false;
    sw.ego.addEventListener("click", sw.start);
    sw.ego.disabled = false;
  },

  /* [ACTIONS] */
  tick: function () {
    // tick() : update display if stopwatch running

    // Calculate hours, mins, seconds
    sw.now++;
    var remain = sw.now;
    var hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    var mins = Math.floor(remain / 60);
    remain -= mins * 60;
    var secs = remain;

    // Update the display timer
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
  },

  start: function () {
    // start() : start the stopwatch

    sw.timer = setInterval(sw.tick, 1000);
    sw.ego.value = "Stop";
    sw.ego.removeEventListener("click", sw.start);
    sw.ego.addEventListener("click", sw.stop);
  },

  stop: function () {
    // stop() : stop the stopwatch

    clearInterval(sw.timer);
    sw.timer = null;
    sw.ego.value = "Start";
    sw.ego.removeEventListener("click", sw.stop);
    sw.ego.addEventListener("click", sw.start);
  },

  reset: function () {
    // reset() : reset the stopwatch

    // Stop if running
    if (sw.timer != null) {
      sw.stop();
    }

    // Reset time
    sw.now = -1;
    sw.tick();
  },
};

window.addEventListener("load", sw.init);

//keyboard shortcuts
document.onkeyup = function (e) {
  if (e.which == 27) {
    if (window.confirm("Are you sure you want to clock out for the day?")) {
      document.getElementById("reset").click();
    }
  } else if (e.ctrlKey && e.which == 13) {
    document.getElementById("controller").click();
  }
};

//google sign in
// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log("Name: " + profile.getName());
//   console.log("Image URL: " + profile.getImageUrl());
//   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

// document.addEventListener("DOMContentLoaded", function () {
//   // // The Firebase SDK is initialized and available here!
//   //
//   // firebase.auth().onAuthStateChanged(user => { });
//   // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
//   // firebase.messaging().requestPermission().then(() => { });
//   // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
//   //

//   try {
//     let app = firebase.app();
//     console.log(app);
//     let features = ["auth", "database", "messaging", "storage"].filter(
//       (feature) => typeof app[feature] === "function"
//     );
//     document.getElementById(
//       "load"
//     ).innerHTML = `Firebase SDK loaded with ${features.join(", ")}`;
//   } catch (e) {
//     console.error(e);
//     document.getElementById("load").innerHTML =
//       "Error loading the Firebase SDK, check the console.";
//   }
// });
