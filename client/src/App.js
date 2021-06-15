import React, { Fragment } from "react";
import "./App.css";

//components

import InputSubreddit from "./components/InputSubreddit";
import ListSubreddits from "./components/ListSubreddits";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputSubreddit /> 
        <ListSubreddits />
      </div>
    </Fragment>
  );
}

export default App;