import { useState } from "react";
import TabNavigation from "../../../component/common/TabNavigation";
import ManagePlanTab from "../../../component/managePlan/ManagePlanTab";

const ManagePlanScreen: React.FC = () => {
  const [activeManagePlan] = useState<string>("ManagePlan"); //setManagePlanTab

  return (
    <>
      <TabNavigation activeTab={activeManagePlan}/>
      <ManagePlanTab/>
     
    </>
  );
};
export default ManagePlanScreen;
