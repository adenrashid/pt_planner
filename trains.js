var trains = [
    {name: 'Alamein', stops: ['Flinders Street', 'Richmond', 'East Richmond', 'Burnley', 'Hawthorn', 'Glenferrie']},
    {name: 'Glen Waverly', stops: ['Flagstaff', 'Melbourne Central', 'Parliament', 'Richmond', 'Kooyong', 'Tooronga']},
    {name: 'Sandringham', stops: ['Southern Cross', 'Richmond', 'South Yarra', 'Prahran', 'Windsor']}
];

var origin = prompt("Enter origin station", origin);
var destination = prompt("Enter destination station", destination);
getRoute();

function getRoute() {
    const first_line = trains.filter(line => line.stops.includes(origin))[0];
    const second_line = trains.filter(line => line.stops.includes(destination))[0];
    const isValidInput = !first_line || !second_line;
    const isSingleLine = first_line === second_line;

    if (isValidInput) {
        alert("Enter a valid destination");
        origin = prompt("Enter origin station", origin);
        destination = prompt("Enter destination station", destination);
        getRoute();
    } else if (isSingleLine) {
        sameLine(first_line)
    } else {
        multipleLines(first_line, second_line)
    };
}

function sameLine(line) {
    const stops = Math.abs(line.stops.indexOf(origin) - line.stops.indexOf(destination));
    const trainRunningForwards = line.stops.indexOf(origin) < line.stops.indexOf(destination);

    if (trainRunningForwards) {
        let journey = line.stops.slice(line.stops.indexOf(origin), line.stops.indexOf(destination)+1);
        getStops(journey);
    } else {
        let journey = line.stops.reverse().slice(line.stops.indexOf(origin), line.stops.indexOf(destination)+1);
        getStops(journey);
    }
    renderRoute(origin, destination, stops);
};

function multipleLines(line1, line2) {
    const originBeforeRichmond = line1.stops.indexOf(origin) < line1.stops.indexOf('Richmond');
    const destinationBeforeRichmond = line2.stops.indexOf(destination) < line2.stops.indexOf('Richmond');

    if (originBeforeRichmond) {
        var line1_journey = line1.stops.slice(line1.stops.indexOf(origin), line1.stops.indexOf('Richmond')+1)
    } else {
        var line1_journey = line1.stops.reverse().slice(line1.stops.indexOf(origin), line1.stops.indexOf('Richmond')+1)
    }
    if (destinationBeforeRichmond) {
        var line2_journey = line2.stops.slice(line2.stops.indexOf(destination), line2.stops.indexOf('Richmond')+1)
    } else {
        var line2_journey = line2.stops.reverse().slice(line2.stops.indexOf(destination), line2.stops.indexOf('Richmond')+1)
    }
    multipleLineRoute(line1_journey, line2_journey);
};

function renderRoute(origin, destination, stops) {
    document.querySelector('.origin').innerHTML = origin;
    document.querySelector('.destination').innerHTML = destination;
    document.querySelector('.stops').innerHTML = stops;
};

function getStops(journey) {
    let finalJourneyArray = [];
    for (let i = 0; i < journey.length; i++) {
        finalJourneyArray.push(journey[i])
    };
    let route = finalJourneyArray.join('--->');
    document.querySelector('.route').innerHTML = route;
}

function multipleLineRoute(line1_journey, line2_journey) {
    let final_journey = line1_journey.concat(line2_journey.reverse());
    let stops = final_journey.length - 2;
    route = final_journey.join(' ---> ').replace("Richmond ---> Richmond", 'Richmond || Richmond');
    document.querySelector('.route').innerHTML = route;
    renderRoute(origin, destination, stops);
}