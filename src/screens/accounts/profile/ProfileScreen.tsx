import React from "react";

import TabNavigation from "../../../component/common/TabNavigation";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ProfileScreen = () => {
  const [imgSrc, setImgSrc] = React.useState<any>("");

  const onChangeFile = (file: any) => {
    console.log(file);

    setImgSrc(URL.createObjectURL(file.target.files[0]));
  };

  return (
    <div>
      <TabNavigation activeTab={"profile"} />{" "}
      <label htmlFor="raised-button-file">
        <CameraAltIcon color="primary" />
      </label>
      <img
        src={imgSrc}
        style={{
          border: "2px dotted blue",

          width: "200px",

          height: "200px",

          borderRadius: "100px",
        }}
        alt="Not foound"
      />
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={onChangeFile}
      />
    </div>
  );
};

export default ProfileScreen;
