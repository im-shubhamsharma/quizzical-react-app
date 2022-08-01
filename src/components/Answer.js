import React, { useState, useEffect } from "react";

export default function Answer(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#D6DBF5" : "#ffffff",
    border: props.isHeld ? "none" : "",
  };
  // console.log(props);
  return (
    <p
      className="answer--elements"
      style={styles}
      onClick={() => props.selectAns(props.id)}
    >
      {props.value}
    </p>
  );
}
