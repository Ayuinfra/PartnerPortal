
import TabNavigation from "../../../component/common/TabNavigation";
import ManagePlanTab from "../../../component/managePlan/ManagePlanTab";

const ManagePlanScreen: React.FC = () => {

  return (
    <>
      <TabNavigation activeTab={"ManagePlan"}/>
      <ManagePlanTab/>
     
    </>
  );
};
export default ManagePlanScreen;
