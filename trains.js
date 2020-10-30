var trains = [
    {name: 'Alamein', stops: ['Flinders Street', 'Richmond', 'East Richmond', 'Burnley', 'Hawthorn', 'Glenferrie']},
    {name: 'Glen Waverly', stops: ['Flagstaff', 'Melbourne Central', 'Parliament', 'Richmond', 'Kooyong', 'Tooronga']},
    {name: 'Sandringham', stops: ['Southern Cross', 'Richmond', 'South Yarra', 'Prahran', 'Windsor']}
];

var origin = prompt("Enter origin station", origin);
var destination = prompt("Enter destination station", destination);

console.log(`Origin: ${origin}`);
console.log(`Destination: ${destination}`);

for (let i = 0; i < trains.length; i++) {
    if (trains[i].stops.includes(origin) && trains[i].stops.includes(destination)) {
        sameLine(trains[i])
    } 
};

var first_line = trains.filter(line => line.stops.includes(origin))[0]
var second_line = trains.filter(line => line.stops.includes(destination))[0]
if (first_line.name != second_line.name) {
    multipleLines(first_line, second_line)
};

function sameLine(line) {
    console.log(`Stops: ${Math.abs(line.stops.indexOf(origin) - line.stops.indexOf(destination))}`);
    if (line.stops.indexOf(origin) < line.stops.indexOf(destination)) {
        var journey = line.stops.slice(line.stops.indexOf(origin), line.stops.indexOf(destination)+1);
        var final_journey_array = [];
        for (let i = 0; i < journey.length; i++) {
            final_journey_array.push(journey[i])
        };
        console.log(final_journey_array.join(' ---> '));
    } else {
        var journey = line.stops.reverse().slice(line.stops.indexOf(origin), line.stops.indexOf(destination)+1);
        var final_journey_array = [];
        for (let i = 0; i < journey.length; i++) {
            final_journey_array.push(journey[i])
        };
        console.log(final_journey_array.join('--->'));
    }
};

function multipleLines(line1, line2) {
    if (line1.stops.indexOf(origin) < line1.stops.indexOf('Richmond')) {
        var line1_journey = line1.stops.slice(line1.stops.indexOf(origin), line1.stops.indexOf('Richmond')+1)
    } else {
        var line1_journey = line1.stops.reverse().slice(line1.stops.indexOf(origin), line1.stops.indexOf('Richmond')+1)
    }
    if (line2.stops.indexOf(destination) < line2.stops.indexOf('Richmond')) {
        var line2_journey = line2.stops.slice(line2.stops.indexOf(destination), line2.stops.indexOf('Richmond')+1)
    } else {
        var line2_journey = line2.stops.reverse().slice(line2.stops.indexOf(destination), line2.stops.indexOf('Richmond')+1)
    }
    var final_journey = line1_journey.concat(line2_journey.reverse());
    console.log(`Stops: ${final_journey.length - 2}`);
    console.log(final_journey.join(' ---> ').replace("Richmond ---> Richmond", 'Richmond || Richmond'));
};