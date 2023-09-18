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
  rules,
}) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label={label}
        {...register(controlName, { ...rules })}
        defaultValue={defaultValue}
      />

      {errors[controlName] && errors[controlName].type === "required" && (
        <p className="invalid" style={{ color: "red" }}>
          {label} is required
        </p>
      )}
      {errors[controlName] && errors[controlName].type === "pattern" && (
        <p className="is-invalid" style={{ color: "red" }}>
          {label} is invalid
        </p>
      )}
      {console.log(errors, "errors")}
    </>
  );
};

export default InputField;
