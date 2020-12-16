import { useState, useEffect } from "react";
import axios from "axios";
function useFetchAPI(url) {
const baseURL =
    process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "DEPLOYED ADDRESS example: https:hamster.com/api"
const [isLoading, setIsLoading] = useState(false);
const [response, setResponse] = useState(null);
const [error, setError] = useState(null);
const [options, setOptions] = useState({});
function handleAPICallButtonSubmit(options = {}) {

    setOptions(options);
    setIsLoading(true);
}
async function handleAPIFetchCall() {

    const requestOptionObj = {
    ...options,
    ...{
        headers: {
        authorization: null,
        },
    },
    };
    try {
    let response = await axios(baseURL + url, requestOptionObj);

    console.log(response);
    setIsLoading(false);
    } catch (e) {
    console.log(e);
    setIsLoading(false);
    }
}
useEffect(() => {
    if (!isLoading) {
    return;
    }

    handleAPIFetchCall();
}, [isLoading, url, options, baseURL]);
return [{ isLoading, response, error, setError }, handleAPICallButtonSubmit];
}
export default useFetchAPI;