import React, { useRef, useState } from 'react'
import Heading from '../common/Heading'
import { Switch } from '@mui/material';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { support } from '../common/dummydata/DummyData';
import { getUserFromLocalStorage } from '../../api/CommonApi';
import CustomDialog from '../common/CustomDialog';
import EditPassword from './EditPassword';

const ProfileSecuritySettings = () => {
    const [editPass, setEditPassword] = useState<boolean>(false);
    const user = getUserFromLocalStorage();
    const addTemplateRef = useRef<any>();
    const handleEditPassword = () => {
        setEditPassword(true);
      };
    const handleEditPasswordClose = () => {
        setEditPassword(false);
      };
    const handleEditPasswordSubmit = () => {
        addTemplateRef.current.click();
      };
  return (
  <>
   <Heading text="Security Settings" />
      {support.map((item: any) => (
        <ul className="list-group justify-content-space-evenly mt-3">
          {" "}
          <li
            className="list-group-item"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {item.Password}

            {user?.partnerTeams?.password}
            <button
              style={{ color: "black", border: "none", fontSize: "13px" }}
              onClick={handleEditPassword}
            >
              Edit
              <BorderColorIcon fontSize="small" color="primary" />
            </button>
          </li>
          <li
            className="list-group-item"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {item.roleAuth}
            <p>{"Off"}</p>
            <Switch />
          </li>
        </ul>
      ))}

       <CustomDialog
        open={editPass}
        child={<EditPassword ref={addTemplateRef} />}
        primaryBtn="Discard Changes"
        primaryBtnAction={handleEditPasswordClose} //primary button close modal or discard
        secondryBtn="Save Changes"
        secondryBtnAction={handleEditPasswordSubmit} //secondary button submitted data
        title="Change Password"
        onClose={handleEditPasswordClose}
      />
  </>
  )
}

export default ProfileSecuritySettings
