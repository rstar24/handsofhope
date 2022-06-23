import Layout from "../../components/auth/layout/Layout";
import CYFMSHeader from "./CYFMSHeader";
import type { ReactChildren } from "../../shared/types";
import type { ReactElement } from "react";

/**
 * The CYFMSSearch functional component.
 * @returns CYFMSSearch component skeleton.
 */
const CYFMSSearch = (props: ReactChildren): ReactElement => {
  return (
    <Layout>
      <CYFMSHeader />
      Search
    </Layout>
  );
};

export default CYFMSSearch;
