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
    <>
      <div style={{ textAlign: "center" }}>
        <TabNavigation activeTab={"profile"} />{" "}
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
            <CameraAltIcon color="primary" />
          </label>

          <div
            style={{
              border: "2px dotted blue",

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
              alt="Not found"
            />
          </div>
        </div>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={onChangeFile}
        />
      </div>

      <h1>Details</h1>
    </>
  );
};

export default ProfileScreen;
