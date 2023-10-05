import React, { forwardRef } from "react";

import InputField from "../common/InputField";

import SelectField from "../common/SelectField";

import { useForm } from "react-hook-form";


import { Button } from "@mui/material";

const EditBilling = forwardRef((props: any, ref: any) => {
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleSubmited = (formData: any) => {
   
  };

  return (
    <>
      <form onSubmit={handleSubmit((data: any) => handleSubmited(data))}>
        {/* <InputField
          label={"Full Name"}
          register={register}
          controlName="fullName"
          errors={errors}
          className="mb-2"
        />

        <InputField
          label={"Billing Address"}
          register={register}
          controlName="address"
          errors={errors}
          className="mb-2"
        />

        <InputField
          label={"City"}
          register={register}
          controlName="city"
          errors={errors}
          className="mb-2"
        /> */}

        <SelectField
          controlName="country"
          register={register}
          optionName={""}
          optionValue={"Select a Country"}
          placeholder="Select a Country"
          errors={errors}
          className="mb-2"
          defaultValue="Select a Country"
        />

        {/* <InputField
          label={"Zip Code"}
          register={register}
          controlName="zipcode"
          errors={errors}
          className="mb-2"
        /> */}

        <Button
          variant="outlined"
          ref={ref}
          style={{ display: "none" }}
          type="submit"
        ></Button>
      </form>
    </>
  );
});

export default EditBilling;
