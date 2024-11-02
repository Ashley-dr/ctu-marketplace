/* eslint-disable no-unused-vars */
import React from "react";
import { FourSquare, Mosaic } from "react-loading-indicators";

function Loader() {
  return (
    <div>
      <Mosaic
        color={["#33C2CC", "#33CC36", "#B8CC33", "#FCCA00"]}
        size="medium"
        text="Loading"
        speedPlus={-1}
      />
    </div>
  );
}

export default Loader;
