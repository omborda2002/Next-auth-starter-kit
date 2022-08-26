import React from "react";
import Layout from "../../components/Layout";
import Dashboard from "../../components/Dashboard";
function dashboard() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default dashboard;

dashboard.getLayout = function getLayout(page) {
  /**
   * @description here all data can be fetched from the layout of each pages
   */
  
  return <Layout>{page}</Layout>;
};
