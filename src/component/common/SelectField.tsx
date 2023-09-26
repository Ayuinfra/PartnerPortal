import { Select } from "@mui/material";

interface SelectFieldProps {
  controlName: string;
  labelName?: string;
  placeholder?: string;
  defaultValue?: string | number;
  register: any;
  errors?: any;
  rules?: any;
  options?: any[];
  optionName: string;
  optionValue: string | number;
  className?: string;
  changeHandler?: any;
  labelClassName?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  controlName,
  labelName,
  placeholder,
  defaultValue,
  register,
  errors,
  rules,
  options,
  optionName,
  optionValue,
  className,
  changeHandler,
  labelClassName,
}) => {
  return (
    <div className={`form-group ${className ? className : ""}`}>
      {labelName && (
        <label className={labelClassName ? labelClassName : ""}>
          {labelName}
        </label>
      )}
      <Select
        fullWidth
        name={controlName}
        ref={register(controlName, rules ? rules : {})}
        defaultValue={defaultValue ? defaultValue : ""}
        className={`form-control ${
          errors && errors[controlName] ? "is-invalid" : ""
        }`}
        onChange={changeHandler ? changeHandler : undefined}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options &&
          options.map((option) => (
            <option key={option[optionValue]} value={option[optionValue]}>
              {option[optionName]}
            </option>
          ))}
      </Select>
      {errors && errors[controlName] && (
        <div className="ERROR">{errors[controlName].message}</div>
      )}
    </div>
  );
};

export default SelectField;
