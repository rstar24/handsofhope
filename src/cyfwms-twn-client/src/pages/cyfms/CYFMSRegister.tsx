import React from 'react';
import Layout from "../../components/auth/layout/Layout";
import CYFMSHeader from "./CYFMSHeader";
import type { ReactChildren } from "../../shared/types";
import type { ReactElement } from "react";

/**
 * The Register functional component.
 * @returns Register component skeleton.
 */
const CYFMSRegister = (props: ReactChildren): ReactElement => {
  return (
    <Layout>
      <CYFMSHeader />
      Register
    </Layout>
  );
};

export default CYFMSRegister;
