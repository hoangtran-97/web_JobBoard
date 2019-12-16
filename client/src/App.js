import React from "react";
import Jobs from "./Jobs";
import "./App.css";

const JOB_API_URL = "http://localhost:3001/jobs";

const mockJobs = [
    {
        title: "SWE 1",
        company: "google"
    },
    {
        title: "SWE 1",
        company: "google"
    }
];

async function fetchJobs(updateCallBack) {
    const res = await fetch(JOB_API_URL);
    const json = await res.json();
    updateCallBack(json);
    console.log({ json });
}
function App() {
    const [jobList, updateJobs] = React.useState([]);
    React.useEffect(() => {
        fetchJobs(updateJobs);
    }, []);
    return (
        <div className="App">
            <Jobs jobs={jobList} />
        </div>
    );
}

export default App;
