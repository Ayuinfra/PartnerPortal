
import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { TableHeaderProps, HeaderTypes } from "../../enums/CustomTableEnum";
import CustomTable from "../common/CustomTable";
import InputField from "../common/InputField";
import { useForm } from "react-hook-form";
import SelectField from "../common/SelectField";
import { Button } from "@mui/material";
import DialogBox from "../common/DialogBox";
import TeamsMembersInvitation from "./TeamsMembersInvitation";
import { AuthServices } from "../../core/services/AuthServices";
import { getUserFromLocalStorage } from "../../api/shared/CommonApi";

const TeamsTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamDetails, setTeamDetails] = useState<any>([]);
  const addTemplateRef = useRef<any>();

  const user = getUserFromLocalStorage()?.partnerBillingDetails?.fullName;
  const user2 = getUserFromLocalStorage()?.role;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const fetchTeamDetails = useCallback(() => {
    AuthServices.TeamDetails()
      .then((res: { response: any }) => {
        if (res?.response) {
          setTeamDetails(res.response.map((item:any) => (
            {
              ...item,
              fullName:user,
              role:user2
            } 
          )))
          // setTeamDetails(res?.response);
          console.log(res.response, "responseeeee");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  },[user]);

  useEffect(() => {
    fetchTeamDetails();      
  }, [fetchTeamDetails]);

  const header: TableHeaderProps[] = [
    {
      key: "fullName",
      title: "Name",
      isSortable: false,
      headerType: HeaderTypes.Text,
    },
    {
      key: "username",
      title: "Email",
      isSortable: false,
      headerType: HeaderTypes.Text,
    },
    {
      key: "role",
      title: "Role",
      isSortable: false,
      headerType: HeaderTypes.Text,
    },
    {
      key: "actions",
      title: "Actions",
      isSortable: false,
      headerType: HeaderTypes.Actions,
    },
  ];

  const update = () => {
    addTemplateRef.current.click();
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleOpenDialog}
        style={{ display: "flex", flexDirection: "row", marginLeft: "20px" }}
      >
        +Invite Member
      </Button>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <InputField
          controlName="Search"
          label="Search"
          register={register}
          type={"Search"}
          rules={{}}
          errors={errors}
          className="mb-2"
        />
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "30px" }}
        >
          <SelectField
            controlName={"country"}
            register={register}
            optionName={""}
            optionValue={"Select a Country"}
            errors={errors}
            className="mb-3"
          />
        </div>
      </div>
      <DialogBox
        open={isDialogOpen}
        child={<TeamsMembersInvitation ref={addTemplateRef} />}
        secondryBtnAction={update}
        secondryBtn="Save Billing Address"
        primaryBtn="Discard Changes"
        title="Billing Details"
        onClose={handleCloseDialog}
        primaryBtnAction={handleCloseDialog}
      />
      <CustomTable data={teamDetails} header={header} />
    </>
  );
};

export default TeamsTab;
