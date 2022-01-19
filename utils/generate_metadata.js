const fs = require("fs");
const basePath = process.cwd();
const { solanaMetadata, JOB_RANK, HAIR, IRIS, GENDER, CREDIT_YIELD, RACE_DATA, EMPATHY, totalSupply, JOB_DATA } = require(`${basePath}/src/config.js`);

const PROFESSION = JOB_DATA()
const RACE = RACE_DATA()[0]

const allData = {
    information: {
        totalSupply: totalSupply,
        metadata: solanaMetadata
    },
    characterRace: RACE
}

fs.writeFileSync('./data_input/report.json', JSON.stringify(allData, null, 2))

const randomInt = (cases) => {
    let random = Math.floor(Math.random() * 100);
    for (let prob in cases) {
        if (prob >= random) {
            return cases[prob];
        }
    }
}

const employ = (raceName, data) => {
    let rank;
    if (JOB_RANK[raceName]) {
        rank = randomInt(JOB_RANK[raceName])
    } else {
        rank = randomInt(JOB_RANK.Others)
    }

    const job = data.filter((e) => {
        if (e.exclusivity.includes(raceName) && e.rank.includes(rank)) {
            return e
        }
    })
    const result = job[Math.floor(Math.random() * job.length)]
    !data[data.indexOf(result)].workers ?
        data[data.indexOf(result)].workers = 1 :
        data[data.indexOf(result)].workers++

    return { jobName: result.jobName, rank: result.rank }
}

const traitMeta = (raceName) => {
    let empathy;
    if (EMPATHY[raceName]) {
        empathy = randomInt(EMPATHY[raceName])
    } else {
        empathy = randomInt(EMPATHY.Others)
    }

    const RESULT = Math.floor(Math.random() * empathy)
    return RESULT

}
const generateMetaPopulation = (name, start, end) => {
    const populationData = []
    for (let i = start; i < end; i++) {
        // Self awareness- Is more in Humans
        // Strength - More for machine
        // Intelligence - Is more in Machine
        // Empathy- More for Human
        // const strength = 
        // const selfAwarness =
        // const intelligence =
        const person = {
            index: i,
            gender: randomInt(GENDER),
            characterRace: name,
            eye: IRIS[Math.floor(Math.random() * IRIS.length)],
            hair: HAIR[Math.floor(Math.random() * HAIR.length)],
            empathy: traitMeta(name),
            creditYield: randomInt(CREDIT_YIELD),
            job: employ(name, PROFESSION)
        }
        populationData.push(person)
    }
    return populationData
}


//Main function
const generateMetadata = () => {
    console.log("*Running Script to Generate metadata...*")
    let RESULT = {}
    for (const data in RACE) {
        console.log(`Generating Metadata: ${RACE[data].name}`)
        RESULT[RACE[data].name] = generateMetaPopulation(RACE[data].name, data == 0 ? 0 : RACE[data - 1].finalIndex, RACE[data].finalIndex)
    }

    //Saves Peoples Data
    fs.writeFileSync('./data_input/peopleByRace.json', JSON.stringify(RESULT, null, 2))

    //Saves the Job Details
    fs.writeFileSync('./data_input/jobs.json', JSON.stringify({ PROFESSION }, null, 2))

    console.log("*Finished & Saved Data!*")
}


generateMetadata();