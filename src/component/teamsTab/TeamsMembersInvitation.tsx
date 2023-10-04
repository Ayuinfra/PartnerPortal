import React, { forwardRef} from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { AuthServices } from "../../core/services/AuthServices";
import { TeamRoleData } from "../common/DummyData";


const TeamsMembersInvitation = forwardRef((props : any, ref: any) => {
  const {handleCloseDialog} = props;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submittedData = (data: any) => {
 

    AuthServices.SendTeamInvitation(data).then((res: any) => {
      if (res?.response) {
        handleCloseDialog();
      }
    });
  };

  return (
    <>
      <>
        <form onSubmit={handleSubmit((data) => submittedData(data))}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <InputField
              controlName="fullName"
              label="Name"
              register={register}
              type={"name"}
              rules={{}}
              errors={errors}
            />
            <InputField
              controlName="email"
              label="Email"
              register={register}
              type={"Email"}
              rules={{}}
              errors={errors}
            />
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
    </>
  );
});

export default TeamsMembersInvitation;
