import { PropTypes } from "prop-types";
import React, { useState, createContext } from "react";

import ErrorMessage from "../components/ErrorMessage";

export const ErrorContext = createContext({
    errorMessage: "",
});

export const ErrorProvider = (props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const displayError = (error) => setErrorMessage(error.message ? error.message : error);

    return (
        <ErrorContext.Provider
            value={{
                errorMessage,
                displayError,
            }}
        >
            {props.children}
            {errorMessage ? (
                <ErrorMessage errorMessage={errorMessage} displayError={displayError} />
            ) : null}
        </ErrorContext.Provider>
    );
};

ErrorProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default ErrorProvider;
