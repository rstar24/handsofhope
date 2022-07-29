import { useAppSelector } from "../../../../library/hooks";
import { IncidentReportLabels } from "./ViewPagesLabels";
import { styles } from "./ViewHome";
import { Box, Typography } from "@mui/material";
import React from "react";

const ViewIncidentReport = () => {
  const data = useAppSelector((state) => state.icIncidentReport.data);

  return (
    <Box paddingTop={3}>
      {Object.entries(data).map((t: any, k) => (
        <Box
          maxHeight={30}
          sx={{
            display: "flex",
            paddingLeft: 8,
          }}
        >
          {t[1] === "" ? (
            <></>
          ) : (
            <>
              {k !== 0 && k !== 5 && k !== 4 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.keys}>
                      {IncidentReportLabels[k]}
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.values}>
                      {t[1]}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ViewIncidentReport;
