import React, { useState } from "react";

const Dropdowns = ({ newSchemas, setNewSchemas }) => {

  const [schemasOption, setSchemasOption] = useState([
    { Label: "First Name", value: "first_name" },
    { Label: "Last Name", value: "last_name" },
    { Label: "Gender", value: "gender" },
    { Label: "Age", value: "age" },
    { Label: "City", value: "city" },
    { Label: "State", value: "state" },
  ]);
  const [selectedOption, setSelectedOption] = useState("")
  const [reset, setReset] = useState("");

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedData = schemasOption.find(
      (option) => option.value === e.target.value
    );
    setSelectedOption(selectedData);
    setReset(selectedData.value);
  };

  // option move Schemas to newSchemas
  const addSchema = () => {
    if (selectedOption !== undefined && selectedOption !== "") {
      // pudh data
      setNewSchemas((prevSchemas) => [...prevSchemas, selectedOption]);
      // delete data
      setSchemasOption((prevSchemas) =>
        prevSchemas.filter((param) => param.value !== selectedOption.value)
      );
      setSelectedOption("");
      setReset("");
    }else{
      alert('please Select Schema')
    }
  }

  
  // option move newSchemas to Schemas and remove the option in existing dropdown
  const edit = (e, i) => {
    //push back to dropedown
    setSchemasOption((prevSchemas) => [...prevSchemas, newSchemas[i]]);

    // find the object using Label value from new drop down
    const fintData = schemasOption.find(
      (param) => param.Label === e.target.value
    );

    // replace  the data to newSchemas use select edit option
    const temCopy = [...newSchemas];
    temCopy[i] = fintData;
    setNewSchemas(temCopy);

    // remove Add schema to segment option
    setSchemasOption((prevSchemas) =>
      prevSchemas.filter((param) => param.value !== fintData.value)
    );

    setSelectedOption("");
    setReset("");
  };

  return (
    <div className="mt-1 scroll">
      <div>
        {newSchemas?.map((e, i) => (
          <div>
            <select
              key={i}
              value={e.Label} 
              className="dropdown fontNormal"
              onChange={(e) => edit(e, i)}
            >
              <option key={i}>{e.Label}</option>
              {schemasOption?.map((item, index) => (
                <option key={index}>{item?.Label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {/* Add schema to segment dropdown */}
      <div>
        <select
          className="dropdown fontNormal"
          onChange={handleSelectChange}
          value={reset}
        >
          <option value="">Add schema to segment</option>
          {schemasOption?.map((item, index) => (
            <option key={index} value={item?.value}>
              {item?.Label}
            </option>
          ))}
        </select>
      </div>
      <p className="addNewSchema cursor" onClick={() => addSchema()}>
        + Add new schema
      </p>
    </div>
  );
};

export default Dropdowns;
