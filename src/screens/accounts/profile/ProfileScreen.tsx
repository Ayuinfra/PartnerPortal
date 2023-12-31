import React, { useState } from "react";
import TabNavigation from "../../../component/common/TabNavigation";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import ProfileDeleteAccount from "../../../component/profileTab/ProfileDeleteAccount";
import ProfileSecuritySettings from "../../../component/profileTab/ProfileSecuritySetting";
import ProfileDetails from "../../../component/profileTab/ProfileDetails";
import { AuthServices } from "../../../core/services/AuthServices";
import { getUserFromLocalStorage } from "../../../api/shared/CommonApi";
import { pink } from "@mui/material/colors";
import CustomButton from "../../../component/common/CustomButton";
import CustomDialog from "../../../component/common/CustomDialog";

const ProfileScreen = () => {
  const [imgSrc, setImgSrc] = useState<any>("");
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [openRemovePicture, setOpenRemovePicture] = useState<boolean>(false)
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setImgSrc(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
      setShowCheck(true);
    }
  };


  const user = getUserFromLocalStorage();

  const handleUploadDp = () => {
    try {
      const formData = new FormData();
      formData.append("file", file);


      AuthServices.ProfilePicture(formData, user.profileId).then((res: any) => {
        if (res) {
          setShowEdit(true);
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleUpload = () => {
    setImgSrc(URL.createObjectURL(file.target.files[0]));
    setFile(file.target.files[0]);
    setShowCheck(true);
  };
  const handleRemovePicture = () => {
    setOpenRemovePicture(true)
  }
  const handleRemovePictureClose = () => {
    setOpenRemovePicture(false)
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <TabNavigation activeTab={"profile"} />
        {showCheck && (
          <DoneIcon
            fontSize="large"
            color="primary"
            style={{ float: "right" }}
            onClick={handleUploadDp}
          />
        )}
        <div
          style={{
            position: "relative",
            width: "210px",
            height: "210px",
            margin: "50px auto",
            alignContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <label
            htmlFor="raised-button-file"
            style={{
              position: "absolute",
              top: "10px",
              left: "30px",
              cursor: "pointer",
            }}
          >
            {file ? (
              <DeleteIcon sx={{ color: pink[500] }} fontSize="medium" onClick={handleRemovePicture} />
            ) : (
              <CameraAltIcon color="primary" />
            )}
          </label>
          <div
            style={{
              border: "3px dotted black",
              width: "200px",
              height: "200px",
              borderRadius: "100px",
              overflow: "hidden",
              padding: "5px",
              alignContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              src={imgSrc}
              style={{
                width: "100%",
              }}
              alt=""
            />
          </div>
        </div>
        {showEdit && (
          <CustomButton
            children={"Edit Profile Picture"}
            type={"button"}
            onClick={handleUpload}
          />
        )}

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={onChangeFile}
        />

      </div>
      <ProfileDetails />
      <ProfileSecuritySettings />
      <ProfileDeleteAccount />
      <CustomDialog
      
        open={openRemovePicture}
        child={
          undefined
        }
        primaryBtn="Discard Changes"
        primaryBtnAction={handleRemovePictureClose}
        // secondryBtn="Save Changes"
        // secondryBtnAction={handleEditNumberSubmit} 
        title="Edit Phone No."
        onClose={handleRemovePictureClose}
      />
    </>
  );
};
export default ProfileScreen;
