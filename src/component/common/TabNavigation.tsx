import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { RoutePath } from '../../core/constants/RoutesPath';

interface TabNavigationProps {
  activeTab: string;
}

const ProfileContent: React.FC = () => {
  return <div>Profile Content</div>;
};

const ManagePlanContent: React.FC = () => {
  return <div>Manage Plan Content</div>;
};

const BillingContent: React.FC = () => {
  return <div>Billing Content</div>;
};

const UsageContent: React.FC = () => {
  return <div>Usage Content</div>;
};

const TeamsContent: React.FC = () => {
  return <div>Teams Content</div>;
};

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <>
      <Tabs
        value={activeTab}
        aria-label="Navigation tabs"
      >
        <Tab label="Profile" value="profile" onClick={() => navigate(`/${RoutePath.Profile}`)}/>
        <Tab label="Manage Plan" value="managePlan"    onClick={() => navigate(`/${RoutePath.ManagePlan}`)}/>
        <Tab label="Billing" value="billing"   onClick={() => navigate(`/${RoutePath.Billing}`)} />
        <Tab label="Usage" value="usage"   onClick={() => navigate(`/${RoutePath.Usage}`)} />
        <Tab label="Teams" value="teams"    onClick={() => navigate(`/${RoutePath.Teams}`)}/>
      </Tabs>

  
      {activeTab === 'profile' && <ProfileContent />}
      {activeTab === 'managePlan' && <ManagePlanContent />}
      {activeTab === 'billing' && <BillingContent />}
      {activeTab === 'usage' && <UsageContent />}
      {activeTab === 'teams' && <TeamsContent />}
    </>
  );
};

export default TabNavigation;
