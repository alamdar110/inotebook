import React from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

export default function About() {
  return (
    <div className="container text-center">
      <h1> About Us </h1> <p> 
        This is an amazing app to take notes. Created by Alamdar. Created Using React JS, Express JS, Node JS and Mongo DB </p>{" "}
    </div>
  );
}
