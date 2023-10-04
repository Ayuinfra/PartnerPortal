import { useState } from "react";
import TabNavigation from "../../../component/common/TabNavigation";
import TeamsTab from "../../../component/teamsTab/TeamsTab";

const TeamsScreen: React.FC = () => {
  

  return (
    <>
      <TabNavigation activeTab={"teams"}/>
      <TeamsTab/>
     
    </>
  );
};
export default TeamsScreen;
