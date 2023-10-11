import React, { forwardRef } from 'react'

const ProfileDeleteAccountChild = forwardRef((props, ref: any) => {
    return (
        <>
            <span>Are you sure you want to delete your account?</span>
            <button ref={ref} style={{ display: "none" }} type='submit'></button>
        </>
    )
})

export default ProfileDeleteAccountChild;
