import { useState, useEffect, useContext } from "react";
import axios from "axios";


import useLocalStorage from "./useLocalStorage"

import { AuthContext } from "../context/AuthContext";


//=====================================================================================//
//=====================================================================================//

function useFetchAPI(url) {

    const baseURL =
        process.env.NODE_ENV === "development" ?
        "http://localhost:3001/api" :
        "DEPLOYED ADDRESS example: https:hamster.com/api";
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});
    const [isMessageOpen, setIsMessageOpen] = useState(false);


    const [, setJwtToken, jwtDecodeFunc] = useLocalStorage("jwtToken");

    const { dispatch } = useContext(AuthContext);




    //=====================================================================================//
    //=====================================================================================//
    function handleMessageOpen() {
        setIsMessageOpen(true);
    }


    //=====================================================================================//
    //=====================================================================================//
    function handleMessageClose() {
        console.log("====");
        setError(null);
        setResponse(null);
        setIsMessageOpen(false);
    }


    //=====================================================================================//
    //=====================================================================================//
    function handleAPICallButtonSubmit(options = {}) {
        setOptions(options);
        setIsLoading(true);
    }


    //=====================================================================================//
    //=====================================================================================//
    async function handleAPIFetchCall() {
        const requestOptionObj = {
            ...options,
            ... {
                headers: {
                    authorization: null,
                },
            },
        };
        try {
            handleMessageOpen();
            let response = await axios(baseURL + url, requestOptionObj);



            if (response.data.jwtToken) {
                setJwtToken(response.data.jwtToken);
                let decoded = jwtDecodeFunc(response.data.jwtToken);
                dispatch({
                    type: "LOGIN",
                    user: decoded,
                });
                setIsLoading(false)
            } else {
                setResponse(response.data.message);
                setIsLoading(false);
            }


        } catch (e) {

            setError(e.response.data.message);
            setIsLoading(false);
        }
    }


    //=====================================================================================//
    //=====================================================================================//
    useEffect(() => {
        if (!isLoading) {
            return;
        }
        handleAPIFetchCall();
    }, [isLoading, url, options, baseURL]);


    //=====================================================================================//
    //=====================================================================================//
    return [
        { isLoading, response, error, setError, setResponse },
        handleAPICallButtonSubmit,
        isMessageOpen,
        handleMessageOpen,
        handleMessageClose,
    ];
}


export default useFetchAPI;