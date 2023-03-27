import React, { useState } from "react";

const SelectOption = () => {
  const arr = [1, 2, 3];
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the selected option
    console.log(selectedOption);
    // reset select option to default value
    setSelectedOption("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">select number</option>
          {arr.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SelectOption;
