import { useState } from "react";
import "./App.css";
import Ground from "./components/Ground";
import Score from "./components/Score";

function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="bg-slate-950 h-[100vh] p-2">
      <div className=" mx-auto w-[36rem] h-[40rem]  bg-slate-900 rounded-md">
        <div className="h-[4rem] bg-slate-800 text-center rounded-t-md">
          <Score score={score} />
        </div>
        <div className="h-[36rem] w-full">
          <Ground score={score} setScore={setScore} />
        </div>
      </div>
    </div>
  );
}

export default App;
