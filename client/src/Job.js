import React from "react";
import { Typography, Paper } from "@material-ui/core";

const Job = ({ job, onClick }) => (
    <Paper className="job" onClick={onClick}>
        <div className="job-column">
            <Typography variant="h6">{job.title}</Typography>
            <Typography variant="h5">{job.company}</Typography>
            <Typography>{job.location}</Typography>
        </div>
        <div>
            <Typography>{job.created_at.split(" ").slice(0, 3)}</Typography>
        </div>
    </Paper>
);

export default Job;
