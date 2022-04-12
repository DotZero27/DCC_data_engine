const fs = require("fs");
const population = JSON.parse(fs.readFileSync("./data_input/peopleByRace.json"));

const UpdateList = (metadata, data) => {
    const result = data.filter((e) => {
        if (e.jobName === metadata.job.jobName) {
            return e;
        }
    })
    const PERSON_DATA = {
        jobName: metadata.job.jobName,
        rank: metadata.job.rank,
        notAvailable: metadata.job.notAvailable,
        workers: 1,
        eyes: [{ name: metadata.eye, people: 1 }]
    }

    if (result.length === 0) {
        data.push(PERSON_DATA)
    } else {
        const getEyeData = data[data.indexOf(result[0])].eyes.filter((e) => {
            if (e.name === metadata.eye) {
                return e
            }
        })
        getEyeData.length === 0 ?
            data[data.indexOf(result[0])].eyes.push({ name: metadata.eye, people: 1 })
            : getEyeData[0].people++

        data[data.indexOf(result[0])].workers++
    }
}

const getAllPopulation = () => {
    const allData = []
    for (const race in population) {
        for (people in population[race]) {
            allData.push(population[race][people])
        }
    }
    return allData
}

//Main function
const generateStats = () => {
    console.log("*Running Script to Get Stats*")
    getAllPopulation()
    fs.writeFileSync('./data_input/population.json', JSON.stringify(getAllPopulation(), null, 2))
    console.log("*Finished & Saved Data!*")
}


(() => {
    generateStats()
})();