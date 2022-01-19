const fs = require("fs");

const humanPercentage = 2 //Legendary
const cyborgPercentage = 15 //Epic
const shapeshifterPercentage = 24 //Rare
const alienPercentage = 27 //Uncommon
const machinePercentage = 32 // Common

const totalSupply = 2021
const namePrefix = "Degen Citizen Pass";
const description = "A Distopic setting with hedonism driving the society.";
const symbol = "DCP"

const solanaMetadata = {
    name: namePrefix,
    description: description,
    symbol: symbol,
    seller_fee_basis_points: 800, // Define how much % you want from secondary market sales 1000 = 10%
    external_url: "https://www.youtube.com/c/XXXXX",
    creators: [
        {
            address: "GrQVu2HS3AswvsW39NcRtabPNciuj8afrkH9CczxxxMR",
            share: 100,
        }
    ],
    collection: {
        name: "Degen Citizen Pass",
        family: "Degen Citizen Club"
    }
};
const IRIS = [
    "Ring",
    "Crypt",
    "Furrow"
]

const HAIR = [
    "Black",
    "Brown",
    "Blonde",
    "Yellow",
    "Red",
    "Blue",
    "Grey",
    "Purple",
    "Lightning",
    "Burning"
]
const CREDIT_YIELD = {
    50: "Low",//50%
    80: "Medium",// 30%
    100: "High",// 20%
}
const GENDER = {
    50: "Male",//50%
    100: "Female"//50%
}
const EMPATHY = {
    Humans: {
        30: 30,//30%
        100: 100,// 70%
    },
    Others: {
        30: "40",// 30%
        60: "50",// 30%
        90: "60",// 30%
        100: "70",// 10%
    }
}

const JOB_RANK = {
    Humans: {
        50: "Rare",//50%
        90: "Epic",// 40%
        100: "Legendary",// 10%
    },
    Others: {
        50: "Common",// 50%
        80: "Uncommon",// 30%
        96: "Rare",// 16%
        100: "Epic",// 4%
    }
}
const RACES = [
    {
        name: "Humans",
        percentage: humanPercentage
    },
    {
        name: "Cyborg",
        percentage: cyborgPercentage
    },
    {
        name: "Shapeshifter",
        percentage: shapeshifterPercentage
    },
    {
        name: "Alien",
        percentage: alienPercentage
    },
    {
        name: "Machine",
        percentage: machinePercentage
    }
]

const JOBS = `Prime Minister|Legendary|Humans
Bladesmith|Legendary|Humans
Magician|Epic|Humans
Weapons dealer|Epic|Humans
Drug dealer|Epic|Humans
Astronaut|Epic|Humans
Samurai|Epic|Humans
Collector|Rare|Humans
Film Director|Rare|Humans
Cook|Common|Cyborg/Machine/Alien/Shapeshifter
Driver|Common|Cyborg/Machine/Alien/Shapeshifter
Baker|Common|Cyborg/Machine/Alien/Shapeshifter
Accountant|Common|Cyborg/Machine/Alien/Shapeshifter
Dancer|Common|Cyborg/Machine/Alien/Shapeshifter
Electrician|Common|Cyborg/Machine/Alien/Shapeshifter
Mechanic|Common|Cyborg/Machine/Alien/Shapeshifter
Engineers|Common|Cyborg/Machine/Alien/Shapeshifter
Dentist|Common|Cyborg/Machine/Alien/Shapeshifter
Bartender|Common|Cyborg/Machine/Alien/Shapeshifter
Lawyer|Common|Cyborg/Machine/Alien/Shapeshifter
Plumber|Common|Cyborg/Machine/Alien/Shapeshifter
Teacher|Common|Cyborg/Machine/Alien/Shapeshifter
Singer|Common|Cyborg/Machine/Alien/Shapeshifter
Sales Agent|Common|Cyborg/Machine/Alien/Shapeshifter
Butcher|Common|Cyborg/Machine/Alien/Shapeshifter
Personal Assistant|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Model|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Piolet|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Streamer|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Paramedic|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Artist|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Agriculturist|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Animator|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Chemist|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Politician|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Stock Trader|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Crypto Investor|Uncommon|Cyborg/Machine/Alien/Shapeshifter
Plague doctor|Rare|Cyborg/Machine/Alien/Shapeshifter
Business Man|Rare|Cyborg/Machine/Alien/Shapeshifter
Journalist|Rare|Cyborg/Machine/Alien/Shapeshifter
Hitman|Rare|Cyborg/Machine/Alien/Shapeshifter
Epidemiologist|Rare|Cyborg/Machine/Alien/Shapeshifter
Credit Cops|Rare|Cyborg/Machine/Alien/Shapeshifter
Jeweler|Rare|Cyborg/Machine/Alien/Shapeshifter
Pro boxer|Rare|Cyborg/Machine/Alien/Shapeshifter
Astrobiologist|Rare|Cyborg/Machine/Alien/Shapeshifter
Defence Speacialist|Epic|Cyborg/Machine/Alien/Shapeshifter
Teraforming Speacialist|Epic|Cyborg/Machine/Alien/Shapeshifter
Biomechatronic Specialist|Epic|Cyborg/Machine/Alien/Shapeshifter
Ship Specialist|Epic|Cyborg/Machine/Alien/Shapeshifter
AI Specialist|Epic|Cyborg/Machine/Alien/Shapeshifter`.split('\n')

const RACE_DATA = () => {
    const RESULT = []
    const raceNames = []
    for (const DATA in RACES) {
        const RACE_DATA = {
            name: RACES[DATA].name,
            totalPopulation: parseInt(((RACES[DATA].percentage / 100) * (totalSupply)).toFixed(0)),
            finalIndex: 0
        }
        RESULT.push(RACE_DATA)
        raceNames.push(RACES[DATA].name)

        if (DATA <= 0) {
            RACE_DATA["finalIndex"] = RACE_DATA.totalPopulation
        } else {
            RACE_DATA["finalIndex"] = RESULT[DATA - 1].finalIndex + RACE_DATA.totalPopulation
        }
    }
    fs.writeFileSync('./data_input/race.json', JSON.stringify({ data: RESULT }, null, 2))
    return [RESULT, raceNames]
};

const JOB_DATA = () => {
    var Jobs = []
    for (var i = 0; i < JOBS.length; i++) {
        const DATA = JOBS[i].split("|")
        const rank = DATA[1]
        const name = DATA[0]
        const exclusivity = DATA[2] === "Humans" ? ["Humans"] : DATA[2].split('/')
        const notAvailable = RACE_DATA()[1].filter((e) => { return !exclusivity.includes(e) })
        const jobMetadata = {
            rank: rank,
            jobName: name,
            exclusivity: exclusivity,
            notAvailable: notAvailable,
        }
        Jobs.push(jobMetadata)
    }
    fs.writeFileSync('./data_input/jobs.json', JSON.stringify({ PROFESSION: Jobs }, null, 2))
    return Jobs
}
module.exports = { JOB_RANK, JOB_DATA, RACE_DATA, solanaMetadata, totalSupply, HAIR, IRIS, GENDER, CREDIT_YIELD, EMPATHY }