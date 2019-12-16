const { CronJob } = require("cron");
const fetchGithub = require("./tasks/fetch-github");

CronJob("*/1 * * * *", fetchGithub, null, true, "America/Los_Angeles");
