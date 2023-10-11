import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { AuthServices } from "../../core/services/AuthServices";
const EditNumber=forwardRef((props:any,ref:any)=>{
    const {handleSubmit} = useForm();
    const {handleEditNumberClose} = props;
    const onSubmitted = async (selectedData: any) => {
        console.log(selectedData);
    
        try {
          await AuthServices.EditProfile(selectedData).then((res: any) => {
            if (res?.response) {
              handleEditNumberClose();
            }
          });
        } catch (e) {
          console.log(e);
        }
      };
    return(
        <>
            <form  id="login" onSubmit={handleSubmit((data: any) => onSubmitted(data))}>
                       
                <PhoneInput
                country={'in'}
                
                // value={phone}
                // onChange={phone => setState({ phone })}
                />
                 <button type="submit" style={{ display: "none" }} ref={ref}></button>
            </form>
        </>
    )
})
export default EditNumber;