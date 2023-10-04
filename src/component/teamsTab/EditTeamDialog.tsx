import React, { forwardRef } from "react";
import SelectField from "../common/SelectField";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { TeamRoleData } from "../common/DummyData";
import { AuthServices } from "../../core/services/AuthServices";


const EditTeamDialog = forwardRef((props:any, ref:any) => {
  const { handleTeamsEditClose, selectedTeamMember, onUpdateRole } = props;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submittedData = (data: any) => {
    const body = {
      email: selectedTeamMember?.userName,
      role: data.role,
      isActive: true,
    };
    AuthServices.UpdateTeamRole(body).then((res) => {
      if (res) {
        handleTeamsEditClose();
        onUpdateRole(selectedTeamMember.userName, data.role);
      }
    });
  };

  return (
    <>
      <h1>{selectedTeamMember?.userName}</h1>
      <h3>{selectedTeamMember?.role}</h3>
      <form onSubmit={handleSubmit((data) => submittedData(data))}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SelectField
            controlName="role"
            register={register}
            options={TeamRoleData}
            optionName="label"
            optionValue="label"
            defaultValue="label"
            errors={errors}
          />
          <Button ref={ref} style={{ display: "none" }} type="submit" />
        </div>
      </form>
    </>
  );
});

export default EditTeamDialog;
