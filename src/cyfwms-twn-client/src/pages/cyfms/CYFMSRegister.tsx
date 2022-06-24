import Layout from "../../components/auth/layout/Layout";
import CYFMSHeader from "../../components/cyfms/CYFMSHeader";
import CYFMSSideNav from "../../components/cyfms/CYFMSSideNav";
import React from "react";
import type { ReactElement } from "react";

/**
 * The Register functional component.
 * @returns Register component skeleton.
 */
const CYFMSRegister = (): ReactElement => {
  return (
    <Layout>
      <CYFMSHeader />
      <CYFMSSideNav />
    </Layout>
  );
};

export default CYFMSRegister;
