import { useRef, useState, useEffect, useCallback } from "react";
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
import { Roles } from "../common/DummyData";
import EditIcon from "@mui/icons-material/Edit";
import CustomDialog from "../common/DialogBox";
import EditTeamDialog from "./EditTeamDialog";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

const TeamsTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamDetails, setTeamDetails] = useState<any[]>([]);
  const [filterTeamDetails, setFilterTeamDetails] = useState<any[]>([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const addTemplateRef = useRef<any>();

  const user = getUserFromLocalStorage()?.partnerBillingDetails?.fullName;
  const userRole = getUserFromLocalStorage()?.role;
  const userProfileId = getUserFromLocalStorage()?.profileId;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    fetchTeamDetails();
  };

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleTeamsEdit = (selectedMember: any) => {
    setEditOpen(true);
    setSelectedTeamMember(selectedMember);
  };

  const handleTeamsEditClose = () => {
    // alert("called");
    setEditOpen(false);
    fetchTeamDetails();
  };

  const roleMappings: Record<string, string> = {
    "1": "Developer",
    "2": "Accountant",
    "3": "Admin",
    Developer: "Developer",
    Accountant: "Accountant",
    Admin: "Admin",
  };

  const getRoleLabel = (roleValue: any): any => {
    return roleMappings[roleValue] || roleValue;
  };

  const fetchTeamDetails = useCallback(() => {
    AuthServices.TeamDetails(userProfileId)
      .then((res: any) => {
        if (res?.response) {
          const roleOwner = {
            role: userRole,
            fullName: user,
            userName: res?.response[0]?.username,
            actions: <EditIcon color="primary" />,
          };

          const updatedTeamDetails = res?.response[0]?.partnerTeams?.map(
            (item: any) => ({
              userName: item?.email,
              role: getRoleLabel(item?.role),
              fullName: item?.fullName,
              actions: <EditIcon color="primary" />,
            })
          );

          let allTeamMembers = [roleOwner, ...updatedTeamDetails];

          setTeamDetails(allTeamMembers);
          setFilterTeamDetails(allTeamMembers);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userRole]);

  const onUpdateRole = (userName: any, newRole: any) => {
    const updatedTeamDetails = teamDetails?.map((member) => {
      if (member.userName === userName) {
        return {
          ...member,
          role: newRole,
        };
      }
      return member;
    });

    setTeamDetails(updatedTeamDetails);
  };

  // useEffect(() => {
  //   const teamMembers = teamDetails.filter(
  //     (item: any) =>
  //       item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       user.toLowerCase() === searchQuery.toLowerCase()
  //   );
  //   setFilterTeamDetails(teamMembers);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchQuery]);

  // useEffect(() => {
  //   if (selectedRole) {
  //     const filteredMembers = teamDetails.filter(
  //       (item: any) => item.role === selectedRole
  //     );
  //     console.log(filteredMembers);
  //     setFilterTeamDetails(filteredMembers);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedRole]);

  useEffect(() => {
    fetchTeamDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredMembers = teamDetails?.filter(
      (item) =>
        item?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        item?.role === selectedRole
    );
  
    setFilterTeamDetails(filteredMembers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedRole]);

  const header: TableHeaderProps[] = [
    {
      key: "fullName",
      title: "Name",
      isSortable: false,
      headerType: HeaderTypes.Text,
    },
    {
      key: "userName",
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

  const handleEditSave = () => {
    addTemplateRef.current.click();
  };

  return (
    <>
      <text>
        Team Name :<h3 style={{ color: "blue" }}>{user}</h3>{" "}
      </text>
      <div className="invite-btn">
        <Button
          variant="outlined"
          size="small"
          onClick={handleOpenDialog}
          style={{ display: "flex", flexDirection: "row", marginLeft: "20px" }}
        >
          + Invite Member
        </Button>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <InputField
          controlName="Search"
          label="Search"
          register={register}
          type="text"
          rules={{}}
          errors={errors}
          className="mb-2"
          onChange={(event: any) => setSearchQuery(event.target.value)}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "30px",
          }}
        >
          <SelectField
            controlName="role"
            register={register}
            optionName="label"
            optionValue="label"
            options={Roles}
            errors={errors}
            className="mb-3"
            changeHandler={(event: any) => setSelectedRole(event.target.value)}
          />
        </div>
      </div>
      <DialogBox
        open={isDialogOpen}
        child={
          <TeamsMembersInvitation
            ref={addTemplateRef}
            handleCloseDialog={handleCloseDialog}
          />
        }
        secondryBtnAction={update}
        secondryBtn="Send Invitation"
        primaryBtn="Discard Changes"
        title="Invite Member"
        onClose={handleCloseDialog}
        primaryBtnAction={handleCloseDialog}
      />
      <CustomTable
        data={filterTeamDetails}
        header={header}
        onRowClickHandler={(selectedMember) => handleTeamsEdit(selectedMember)}
      />

      <CustomDialog
        open={editOpen}
        child={
          <EditTeamDialog
            ref={addTemplateRef}
            selectedTeamMember={selectedTeamMember}
            handleTeamsEditClose={handleTeamsEditClose}
            onUpdateRole={onUpdateRole}
          />
        }
        primaryBtn={"Save"}
        primaryBtnAction={handleEditSave}
        secondryBtn="Remove Account"
        secondryBtnAction={handleTeamsEditClose}
        title={"Edit Member"}
        onClose={handleTeamsEditClose}
      />
    </>
  );
};

export default TeamsTab;
