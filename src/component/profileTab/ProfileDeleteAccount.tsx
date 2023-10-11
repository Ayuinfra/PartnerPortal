import React, { useState, useRef, useContext } from 'react'
import CustomDialog from '../common/CustomDialog';
import ProfileDeleteAccountChild from './ProfileDeleteAccountChild';
import { AuthServices } from '../../core/services/AuthServices';
import { useNavigate } from 'react-router-dom';
import { CommonContext, CommonContextType } from '../../core/context/CommonContext';
import { getUserFromLocalStorage } from '../../api/shared/CommonApi';



const ProfileDeleteAccount = () => {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const addTemplateRef = useRef<any>();
    const navigate = useNavigate();
    const user = getUserFromLocalStorage();
    const { clearContextAndLogout } = useContext(
        CommonContext
    ) as CommonContextType;
    const handleDeleteAccount = () => {
        setDeleteOpen(true)
    }
    const handleDeleteAccountClose = () => {
        setDeleteOpen(false)
    }
    const handleDeleteAccountSubmit = () => {
        addTemplateRef.current.click();
        AuthServices.ProfileDeleteAccount(user.username).then((res: any) => {
            if (res) {
                clearContextAndLogout()
                navigate(`/`)
            }
        })
    }
    return (
        <>
            <div className="card mt-4 bg-light text-dark">
                <div className="card-body">
                    <h5 className="card-title">Delete My Account</h5>
                    <p className="card-text">Note that if you delete your account, you won’t be able to restore it</p>
                    <button
                        style={{ color: "red", border: "none" }}
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
            <CustomDialog
                open={deleteOpen}
                child={<ProfileDeleteAccountChild ref={addTemplateRef} />}
                primaryBtn={'Confirm'}
                primaryBtnAction={handleDeleteAccountSubmit}
                title={'Delete Account'}
                secondryBtn='Cancel'
                secondryBtnAction={handleDeleteAccountClose}
                onClose={handleDeleteAccountClose} />
        </>
    )

}

export default ProfileDeleteAccount;

