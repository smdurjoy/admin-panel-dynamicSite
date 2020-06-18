import React, {Fragment} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./routes/AppRoute";

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <AppRoute/>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
