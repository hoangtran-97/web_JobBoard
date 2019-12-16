/* eslint-disable */
const fetch = require("node-fetch");
const redis = require("redis");

const client = redis.createClient();

const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);


const baseURL = "https://jobs.github.com/positions.json";
async function fetchGithub() {
    let resultCount = 1;
    let onPage = 0;
    const allJobs = [];
    // fetch all pages
    while (resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log("fetched: ", jobs.length);
        onPage++;
    }
    // filter
    const jrJobs = allJobs.filter((job) => {
        const jobTitle = job.title.toLowerCase();
        if (
            jobTitle.includes("senior")
            || jobTitle.includes("manager")
            || jobTitle.includes("sr.")
            || jobTitle.includes("architect")
        ) {
            return false;
        }
        return true;
    });
    console.log("jr filtered", jrJobs.length);

    // set in redis
    console.log("Total jobs: ", allJobs.length);
    const success = await setAsync("github", JSON.stringify(jrJobs));
    console.log(success);
}
// fetchGithub();
module.exports = fetchGithub;
