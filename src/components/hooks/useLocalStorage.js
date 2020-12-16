import { useState, useEffect } from "react";


function useLocalStorage (key, initialValue = ""){

        const [jwtTokenValue, setJwtTokenValue] = useState(()=>{
        return localStorage.getItem(key) || initialValue;
    });
    
    
    useEffect(()=>{
        localStorage.setItem(key, jwtTokenValue);
    }, [jwtTokenValue, setJwtTokenValue]);
    
    return [jwtTokenValue, setJwtTokenValue];
}


export default useLocalStorage;