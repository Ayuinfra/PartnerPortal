import React, { useEffect, useRef, useState } from "react";
import Heading from "../common/Heading";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CustomDialog from "../common/CustomDialog";
import EditName from "./EditName";
import EditNumber from "./EditNumber";
import { AuthServices } from "../../core/services/AuthServices";
import { getUserFromLocalStorage } from "../../api/shared/CommonApi";
import { ProfileData } from "../common/DummyData";

type ptDetails = {
    fullName: string
    country: string
    city: string
    zipcode: string
    address: string
}

export type userType = {
    companyName: string
    contactPersonName: string
    email: string
    contactNo: number
    profileId: string
    partnerBillingDetails: ptDetails
}

const ProfileDetails = () => {


    const [userUpdate, setUserUpdated] = useState<userType | null>(null);
    const [editName, setEditName] = useState<boolean>(false);
    const [editPhone, setEditPhone] = useState<boolean>(false);
    const addTemplateRef = useRef<any>();
    const user = getUserFromLocalStorage();



    const fetchBilling = () => {
        try {
            AuthServices.UserProfileDetails(user?.username).then((res: any) => {
                if (res) {
                    setUserUpdated({
                        companyName: res.response.partnerProfile.companyName,
                        contactNo: res.response.partnerProfile.contactNo,
                        contactPersonName: res.response.partnerProfile.contactPersonName,
                        email: res.response.partnerProfile.email,
                        partnerBillingDetails: {
                            address: res.response.username,
                            city: res.response.partnerBillingDetails.city,
                            country: res.response.partnerBillingDetails.country,
                            fullName: res.response.partnerBillingDetails.fullName,
                            zipcode: res.response.partnerBillingDetails.zipcode,
                        },
                        profileId: user.profileId
                    })


                }
            });
        } catch (ex) {
            console.log(ex);
        }
    };


    //Edit name
    const handleEditName = () => {
        setEditName(true)
        // const userObj = {...userUpdate};
        // if(userObj.partnerBillingDetails){
        //  
        //   // userObj.partnerBillingDetails?.fullName = 'abc'
        // }

    };
    const handleEditNameClose = () => {
        setEditName(false);
        fetchBilling();
    };
    const handleEditNameSubmit = () => {
        addTemplateRef.current.click();
    };

    //edit Number

    const handleEditNumber = () => {
        setEditPhone(true);
    };
    const handleEditNumberClose = () => {
        setEditPhone(false);
        fetchBilling();
    };
    const handleEditNumberSubmit = () => {
        addTemplateRef.current.click();
    };

    useEffect(() => {
        fetchBilling();
    }, []);

    return (
        <>
            <Heading text="Details" />
            {/* {userProfile.map((item: any)=>(
            <div className="row" key={item.key}>
                <div className="col-md-4">
                  <p>{profileData[item.key]}</p>
                </div> 
                <div className="col-md-4">
                  {item.value}
                </div>  
                <div className="col-md-4">
                  <button
                    style={{ color: "black", border: "none", fontSize: "13px" }}
                    onClick={handleEditName}
                  >
                    Edit <BorderColorIcon fontSize="small" color="primary" />
                  </button>
                </div>  
            </div>
        ))} */}
            <ul className="list-group">
                <li
                    className="list-group-item "
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <p>{ProfileData.name}</p>
                    {user?.partnerProfile?.contactPersonName}
                    <button
                        style={{ color: "black", border: "none", fontSize: "13px" }}
                        onClick={handleEditName}
                    >
                        Edit <BorderColorIcon fontSize="small" color="primary" />
                    </button>
                </li>
                <li
                    className="list-group-item"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <p> {ProfileData.address}</p>
                    {user?.username}
                    <p>Verified</p>
                </li>
                <li
                    className="list-group-item"
                    style={{ display: "flex", justifyContent: "space-between" }}
                    onClick={handleEditNumber}
                >
                    <p>{ProfileData.phone}</p>

                    {user?.partnerProfile?.contactNo}++
                    <button
                        style={{ color: "black", border: "none", fontSize: "13px" }}
                    >
                        Edit
                        <BorderColorIcon fontSize="small" color="primary" />
                    </button>
                </li>
                <li
                    className="list-group-item"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <p> {ProfileData.roleName}</p>
                    {user?.role}

                    <p>{"  "}</p>
                </li>
            </ul>
            <CustomDialog
                open={editName}
                child={
                    <EditName
                        ref={addTemplateRef}
                        handleEditNameClose={handleEditNameClose}
                    />
                }
                primaryBtn="Discard Changes"
                primaryBtnAction={handleEditNameClose} //primary button close modal or discard
                secondryBtn="Save Changes"
                secondryBtnAction={handleEditNameSubmit} //secondary button submitted data
                title={"Edit Full Name"}
                onClose={handleEditNameClose}
            />
            <CustomDialog
                open={editPhone}
                child={
                    <EditNumber
                        ref={addTemplateRef}
                        handleEditNumberClose={handleEditNumberClose}
                    />
                }
                primaryBtn="Discard Changes"
                primaryBtnAction={handleEditNumberClose} //primary button close modal or discard
                secondryBtn="Save Changes"
                secondryBtnAction={handleEditNumberSubmit} //secondary button submitted data
                title="Edit Phone No."
                onClose={handleEditNumberClose}
            />
        </>
    );
};

export default ProfileDetails;
