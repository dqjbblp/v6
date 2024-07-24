import React, { useRef, useState } from "react";

const OTPInput = (props: { length: number }) => {
  const { length } = props;
  const [values, setValues] = useState(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: any, index: any) => {
    const value = e.target.value;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: any, index: any) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>, it: number) => {
    if (e.keyCode === 39 && it < length - 1) {
      inputRefs.current[it + 1].focus();
    }
    if (e.keyCode === 37 && it > 0) {
      inputRefs.current[it - 1].focus();
    }
  };

  return (
    <div>
      {values.map((value, index) => (
        <input
          onKeyDownCapture={(e) => keyDown(e, index)}
          key={index}
          type="text"
          maxLength={1}
          value={value}
          ref={(el) => {
            inputRefs.current[index] = el as HTMLInputElement;
          }}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{ width: "30px", textAlign: "center", margin: "0 5px" }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
