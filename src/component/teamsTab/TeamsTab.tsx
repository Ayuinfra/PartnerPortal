import { useRef, useState } from "react";
import { TableHeaderProps, HeaderTypes } from "../../enums/CustomTableEnum";
import CustomTable from "../common/CustomTable";
import InputField from "../common/InputField";
import { useForm } from "react-hook-form";
import SelectField from "../common/SelectField";
import { Button } from "@mui/material";
import Heading from "../common/Heading";
import DialogBox from "../common/DialogBox";
import TeamsMembersInvitation from "./TeamsMembersInvitation";

const TeamsTab = () => {
  const [teamsTabData] = useState<any>([]); //setTeamsTabData
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const addTemplateRef = useRef<any>();

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
  const header: TableHeaderProps[] = [
    {
      key: "name",
      title: "Name",
      isSortable: false,
      headerType: HeaderTypes.Text,
    },
    {
      key: "email",
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
      <Heading text="Team Name :" />
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
      <CustomTable data={teamsTabData} header={header} />
    </>
  );
};

export default TeamsTab;
