import React from 'react';
import { Tabs } from 'rsuite';
const CustomTabs = ({ tabItems }) => {
  return (
    <Tabs defaultActiveKey="1">
      {tabItems.map((tab, index) => (
        <Tabs.Tab eventKey={String(index + 1)} title={tab.title} key={index}>
          {tab.content}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
