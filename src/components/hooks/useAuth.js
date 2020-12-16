import { useState } from "react";

function useChangeInputConfig(inputType) {
    const [value, setValue] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [canSubmit, setCanSubmit] = useState(true);

    function onChange(e) {
        let value = e.target.value;
        setValue(value);
        checkInput(value);
    }

    function clearInput() {
        setValue("")
    }

    function checkInput(value) {
        if (value.length === 0) {
            setIsError(true);
            setErrorMessage(`${inputType} is required`);
            setCanSubmit(true);
        } else {
            setIsError(false);
            setCanSubmit(false);
            setErrorMessage(``);
        }
    }
    return [value, onChange, isError, errorMessage, canSubmit, clearInput];
}
export default useChangeInputConfig;