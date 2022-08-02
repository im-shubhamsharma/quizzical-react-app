import React, { useState, useEffect } from "react";

export default function Answer(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#D6DBF5" : "",
    border: props.isHeld ? "none" : "",
  };

  return (
    <>
      <p
        className="answer--elements"
        style={styles}
        onClick={() => props.selectOption(props.id)}
      >
        {props.value}
      </p>
    </>
  );
}
