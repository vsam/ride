var LoremIpsum = require('lorem-ipsum').LoremIpsum;
var fs = require('fs');

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
    var data = generateData(1000);

    var file = fs.createWriteStream('dummyData.json');
    file.write(JSON.stringify(data));
    file.end();
}


main();