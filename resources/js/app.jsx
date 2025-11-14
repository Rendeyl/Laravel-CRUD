import React from "react";
import "../css/app.css";
import ReactDOM from "react-dom/client";
import Hola from "./components/Hola.jsx";
import Hello from "./components/Hello.jsx";

function App() {
    return( 
    <>
    <Hola/>
    <Hello/>
    </>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
