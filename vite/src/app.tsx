import * as React from 'react';
import ReactDOM from "react-dom/client";
import Login from "./Login";


const App = () => {


  let mailgunKey = getEnv("mailgun_key");

  let importantFunction = () => {
    //..
    //..
      //..
  }
  
  let sendMail = () => {
    
  }

  return (
    <div>
      <div>New project</div>
      <div><Login /></div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);