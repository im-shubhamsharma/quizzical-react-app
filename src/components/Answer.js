import React, { useState, useEffect } from "react";

export default function Answer(props) {
  return <p className="answer--elements">{props.value}</p>;
}
