import { CFooter } from "@coreui/react";
import React from "react";

const TheFooter = (props) => {
  return (
    <CFooter fixed={false}>

      <div className="mfs-auto">
        <strong>
          <span className="mr-1">Powered by</span>
        </strong>
      </div>
    </CFooter>
  );
};
export default TheFooter;