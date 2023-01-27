import React, { useState } from "react";

export default function TextForm() {

  //change dark and light modes
  const darkmode = ()=>{
    if(document.body.style.background === "white"){

      document.body.style.background="black"
      document.body.style.color="white"
      document.getElementById("mybox").style.backgroundColor = "lightblue";
      document.getElementById("btnmode").style.backgroundColor = "whitesmoke";
      document.getElementById("btnmode").style.color = "black";
      document.getElementById("btnmode").innerText = "light mode";
    }else{

      document.body.style.background="white"
      document.body.style.color="black"
      document.getElementById("mybox").style.backgroundColor = "white";
      document.getElementById("btnmode").style.backgroundColor = "black";
      document.getElementById("btnmode").style.color = "white";
      document.getElementById("btnmode").innerText = "dark mode";
    }
  }
  
  const [text, setText] = useState("");

  //onchange event to get text from textArea
  const handleText = (e) => {
    setText(e.target.value);
  };

  //onClick event to upperCase the text
  const clickOnUpper = () => {
    let a = text.toUpperCase();
    setText(a);
  };

  //onClick event to lowerCase the text
  const clickOnLower = () => {
    let a = text.toLowerCase();
    setText(a);
  };

  //onClick event to clear the text
  const clearTextbtn = () => {
    setText("");
  };

  //this if function is remove to unwanted space from words and empyt character
  let count1 = 0;
  let count2 = 0;
  if (text.length === 0) {
  } else {
    count1 = text.split(" ").length;
    count2 = text.length - text.split(" ").length + 1;
  }

  return (
    <div className="container">
      <div className="mb-3">
        <button
          type="button"
          id="btnmode"
          className="btn btn-dark my-3"
          onClick={darkmode}
        >
          dark mode
        </button>


        <h6>Enter Your Text Below</h6>
        <textarea
          className="form-control my-2"
          id="mybox"
          value={text}
          rows="8"
          onChange={handleText}
        ></textarea>
      </div>

      <button
        type="button"
        className="btn btn-primary mx-2"
        onClick={clickOnUpper}
        disabled={text.length === 0}
      >
        Convert to Upper
      </button>
      <button
        type="button"
        className="btn btn-secondary mx-2"
        onClick={clickOnLower}
        disabled={text.length === 0}
      >
        Convert to Lower
      </button>
      <button
        type="button"
        className="btn btn-warning mx-2"
        onClick={clearTextbtn}
        disabled={text.length === 0}
      >
        Clear Text
      </button>

      <div className="conatiner my-3">
        <h3>Your text summary</h3>
        <p>
          <strong>
            words {count1}, characters {count2}
          </strong>
        </p>
        <h3>Preview</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
