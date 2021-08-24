import React from "react";

export default function Simple({ message = "" }) {
  return <div style={{ color: "red" }}>This is React. Simple message: {message}</div>;
}
