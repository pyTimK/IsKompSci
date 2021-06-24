import React from "react";
import ReactDOM from "react-dom";
import "./styles/sass/index.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { green, orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    fontFamily: "metropolis",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: green,
    secondary: orange,
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
