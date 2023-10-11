import React, { forwardRef } from "react";
import InputField from "../common/InputField";
import { useForm } from "react-hook-form";
import { AuthServices } from "../../core/services/AuthServices";

const EditName = forwardRef((props: any, ref: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleEditNameClose } = props;
  const onSubmitted = async (selectedData: any) => {
    console.log(selectedData);

    try {
      await AuthServices.EditProfile(selectedData).then((res: any) => {
        if (res?.response) {
          handleEditNameClose();
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit((data: any) => onSubmitted(data))}>
        <InputField
          label="Edit Full Name"
          register={register}
          controlName="fullName"
          errors={errors}
          rules={{ required: true }}
          className="mt-2"
          
        />
        <button type="submit" style={{ display: "none" }} ref={ref}></button>
      </form>
    </>
  );
});

export default EditName;
