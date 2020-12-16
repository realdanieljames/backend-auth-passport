import { useState } from "react";




function useAlertMessage() {
    const [isMessageOpen, setIsMessageOpen] = useState(true);

    
    function handleMessageOpen() {
        setIsMessageOpen(true)
    }

    function handleMessageClose() {
        setIsMessageOpen(false)
    }
    

    return [isMessageOpen, handleMessageOpen, handleMessageClose]
}


export default useAlertMessage;