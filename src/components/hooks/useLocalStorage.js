import { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode'




function useLocalStorage (key, initialValue = ""){

        const [jwtTokenValue, setJwtTokenValue] = useState(()=>{
        return localStorage.getItem(key) || initialValue;
    });
    
    
    useEffect(()=>{
        localStorage.setItem(key, jwtTokenValue);
    }, [jwtTokenValue, setJwtTokenValue]);

    function jwtDecodeFunc(token){
        return jwtDecode(token)
    }
    
    return [jwtTokenValue, setJwtTokenValue,  jwtDecodeFunc];
}


export default useLocalStorage;