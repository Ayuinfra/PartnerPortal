import React, { forwardRef } from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

const TeamsMembersInvitation = forwardRef((props, ref: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submittedData = (selectedData: any) => {
    console.log(selectedData);
  };
  return (
    <>
      <>
        <form onSubmit={handleSubmit((data) => submittedData(data))}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <InputField
              controlName="Name"
              label="Name"
              register={register}
              type={"name"}
              rules={{}}
              errors={errors}
            />
            <InputField
              controlName="Email"
              label="Email"
              register={register}
              type={"Email"}
              rules={{}}
              errors={errors}
            />
            <SelectField
              controlName={"Roles"}
              register={register}
              optionName={"roles"}
              optionValue={"value"}
            />
            <Button ref={ref} style={{ display: "none" }} type="submit" />
          </div>
        </form>
      </>
    </>
  );
});

export default TeamsMembersInvitation;
