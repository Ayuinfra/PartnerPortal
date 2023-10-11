import React, { forwardRef } from "react";
import InputField from "../common/InputField";
import { useForm } from "react-hook-form";

const EditPassword = forwardRef((props: any, ref: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmitted = (selectedData: any) => {


  }
  return (
    <>
      <form onSubmit={handleSubmit((data: any) => onSubmitted(data))}>
        <InputField
          label="Old Password"
          register={register}
          controlName="old_password"
          errors={errors}
          rules={{ required: true }}
          className="mt-2 mb-2"

        />
        <InputField
          label="New Password"
          register={register}
          controlName="password"
          errors={errors}
          rules={{ required: true }}
          className="mt-2 mb-2"

        />
        <InputField
          label="Confirm Password"
          register={register}
          controlName="password"
          errors={errors}
          rules={{ required: true }}
          className="mt-2 mb-2"

        />
        <button type="submit" style={{ display: "none" }} ref={ref}></button>
      </form>
    </>
  );
});

export default EditPassword;
