import React from "react";

export default function TopBar(props) {
  return (
    props.message && (
      <div className="alert alert-success" role="alert">
        {props.message}
      </div>
    )
  );
}
