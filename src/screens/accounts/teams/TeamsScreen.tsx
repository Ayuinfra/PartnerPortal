import { useState } from "react";
import TabNavigation from "../../../component/common/TabNavigation";
import TeamsTab from "../../../component/teamsTab/TeamsTab";

const TeamsScreen: React.FC = () => {
  const [activeTeamsTab, setActiveTeamsTab] = useState<string>("teams");

  return (
    <>
      <TabNavigation activeTab={activeTeamsTab}/>
      <TeamsTab/>
     
    </>
  );
};
export default TeamsScreen;
