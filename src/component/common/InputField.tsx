import { TextField } from "@mui/material";
import React from "react";

type InputProps = {
  controlName: any;
  label: string;
  register: any;
  defaultValue?: any;
  type?: any;
  errors?: any;
  rules?: any;
};

const InputField: React.FC<InputProps> = ({
  label,
  controlName,
  register,
  defaultValue,
  errors,
  type,
  rules,
}) => {
  
  console.log(errors)
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label={label}
        type={type}
        {...register(controlName, { ...rules, pattern : rules.pattern })}
        defaultValue={defaultValue}
      />

      {errors[controlName] && errors[controlName].type === "required" && (
        <p className="invalid" style={{ color: "red" }}>
          {label} is required
        </p>
      )}
      {errors[controlName] && errors[controlName].type === "pattern" && (
        <p className="is-invalid" style={{ color: "red" }}>
       {rules.message}
        </p>
      )}

      {console.log(errors, "errors")}
    </>
  );
};

export default InputField;
