
import TabNavigation from "../../../component/common/TabNavigation";
import ManagePlan from "../../../component/managePlan/ManagePlan";


const ManagePlanScreen: React.FC = () => {

  return (
    <>
      <TabNavigation activeTab={"ManagePlan"}/>
      <ManagePlan/>
    </>
  );
};
export default ManagePlanScreen;
