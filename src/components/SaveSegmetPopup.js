import Dropdowns from "./Dropdowns";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import axios from "axios";
import { headers } from "../headers/Headers";

const SaveSegmetPopup = ({ setPopup }) => {
  const [isLoadin, setIsLoadin] = useState(false);
  const [nameOfSegment, setNameOfSegment] = useState("");
  const [newSchemas, setNewSchemas] = useState([]);

  const formSubmit = async () => {
    if (nameOfSegment !== "" && newSchemas?.length !== 0) {
      setIsLoadin(true);

      const transFormedSchema = newSchemas.map((item) => {
        return { [item.value]: item.Label };
      });

      const finalData = JSON.stringify({
        segment_name: nameOfSegment,
        schema: transFormedSchema,
      });

      try {
        const response = await axios.post(
          "https://webhook.site/f7448929-b5ba-4b0d-abfe-84fe8d6b6f58",
          finalData,
          { headers }
        );

        setPopup(false);
        setIsLoadin(false);
        alert("successfully submitted ");
      } catch (error) {
        alert(" Error");
        setIsLoadin(false);
      }
    } else {
      alert("shcema and segment is required");
    }
  };
  return (
    <div className="SaveSegmetPopup flex">
      <section>
        <div className="SaveSegmetPopupTopBar flex  align-center">
          <span
            className="material-symbols-outlined ml-2 icon cursor"
            onClick={() => setPopup(false)}
          >
            arrow_back_ios
          </span>
          <p className="ml-1 font-13">Saving Segment</p>
        </div>

        <div className="leftBox">
          <p className="fontNormal ">Enter the Name of the Segment</p>

          <input
            className="with-100 fontNormal p-1 mt-5 "
            placeholder="Name of the Segment"
            onChange={(e) => setNameOfSegment(e.target.value)}
          ></input>

          <p className="  fontNormal  mt-5">
            To Save your Segment. You neet to add the Schemas to build the query
          </p>

          <Dropdowns newSchemas={newSchemas} setNewSchemas={setNewSchemas} />
        </div>
      </section>
      {/* buttom section */}
      <div className="saveBtnSection flex align-center">
        <button
          className="saveBtn fontNormal cursor"
          onClick={() => formSubmit()}
        >
          Save the Segment
        </button>
        <button className="cancelBtn cursor" onClick={() => setPopup(false)}>
          Cancel
        </button>
      </div>
      {/* loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadin}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SaveSegmetPopup;
