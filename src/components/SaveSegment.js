import { useState } from "react";
import "../css/Style.css";
import SaveSegmetPopup from "./SaveSegmetPopup";
import Test from "./Test";

const SaveSegment = () => {
  const [popup, setPopup] = useState(false);

  return (
    <div className="SaveSegment flex justify-between">
      <div>
        {!popup&&
        <button
          className="SaveSegmentBtn cursor"
          onClick={() => setPopup(true)}
        >
          Save Segment
        </button> }
      </div>
     
      {popup && <SaveSegmetPopup setPopup={setPopup} />}
    </div>
  );
};

export default SaveSegment;
