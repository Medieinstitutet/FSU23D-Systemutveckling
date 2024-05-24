import * as React from 'react';
import ReactDOM from "react-dom/client";
import Login from "./Login";


const App = () => {

  return (
    <div>
      <div>New project</div>
      <div><Login /></div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);