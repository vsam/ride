var firebase = require("firebase/app");
require("firebase/database");
var LoremIpsum = require('lorem-ipsum').LoremIpsum;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateData(numElements) {

    const lorem = new LoremIpsum({
      wordsPerSentence: {
        max: 2,
        min: 2
      }
    });


    var list = Array(numElements)
        .fill()
        .map((val, idx) => {
            var name = 'Driver';
            var type = 'driver';

            if (Math.random() > 0.5) {
                name = 'Passenger';
                type = 'rider';
            }

            return {
                id: idx,
                type: type,
                name: name + ' #' + idx,
                startLocation: lorem.generateWords(2),
                endLocation: lorem.generateWords(2),
                date: randomInt(1, 12) + '/' + randomInt(1, 30) + '/' + 19,
                price: randomInt(10, 50),
                seats: randomInt(1, 4),
            };
        }
    );

    return list;
}


function main() {
    const firebaseConfig = {
        apiKey: "AIzaSyDUkpXP3wSqSt5Rj8Aq8JYsmQlYO_2Zu4Q",
        authDomain: "ride-f1e96.firebaseapp.com",
        databaseURL: "https://ride-f1e96.firebaseio.com",
        projectId: "ride-f1e96",
        storageBucket: "ride-f1e96.appspot.com",
        messagingSenderId: "499959516483",
        appId: "1:499959516483:web:ff0f89a8aa351fd4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var databaseRef = firebase.database().ref("testTickets");

    var data = generateData(20);

    databaseRef.set(data);
}

main()