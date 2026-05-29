import { useState } from "react";

export function useExclusiveCheckbox() {

    const [freelancer, setFreelancer] = useState(false);
    const [searchJob, setSearchJob] = useState(false);

    const activateFreelancer = () => {
        setFreelancer(true);
        setSearchJob(false);
    };

    const activateSearchJob = () => {
        setSearchJob(true);
        setFreelancer(false);
    };

    return {
        freelancer,
        searchJob,
        activateFreelancer,
        activateSearchJob
    };
}