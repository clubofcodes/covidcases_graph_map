import { useState } from "react";

export const useApiFetch = (api) => {
    //new state variable to store data or error.
    const [casesData, setCasesData] = useState([]);
    const [apiError, setApiError] = useState(null);

    //arrow function to get data from api and store in state variable.
    const fetchCasesData = async () => fetch(api)
        .then(response => response.json())
        .then((resData) => {
            setCasesData(resData);
            setApiError(null);
        }, (error) => setApiError(error.message));

    return {casesData, apiError, fetchCasesData};
}