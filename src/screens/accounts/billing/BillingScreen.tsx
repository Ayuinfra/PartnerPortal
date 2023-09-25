
import { useForm } from "react-hook-form";
import SelectField from "../../../component/common/SelectField";
import TabNavigation from "../../../component/common/TabNavigation";

const BillingScreen: React.FC = () => {
  const {
    register,

  } = useForm({
    mode: "onChange",
  });
 
  return (
    <>
      <TabNavigation activeTab={"billing"}  />
      <SelectField
      controlName="Billing"
      optionName="Select"
      optionValue={"Value"}
      register={register}
    
      />
    </>
  );
};

export default BillingScreen;
