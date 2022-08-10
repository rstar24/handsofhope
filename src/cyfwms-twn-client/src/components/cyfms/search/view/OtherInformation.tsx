import { useAppSelector } from "../../../../library/hooks";
import { OtherInformationLabels } from "../../../../library/labels/cyfms";
import { styles } from "../../../../pages/cyfms/View";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

const OtherInformation = (): ReactElement => {
  const data = useAppSelector((state) => state.cyfmsOtherInformation.data);

  return (
    <Box paddingTop={3}>
      {Object.entries(data).map((t: any, k: any) => (
        <Box
          maxHeight={30}
          sx={{
            display: "flex",
            paddingLeft: 8,
          }}
        >
          {t[1] === "" || t[1] === "0001-01-01" ? (
            <></>
          ) : (
            <>
              {k !== 0 && k !== 1 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.keys}>
                      {OtherInformationLabels[k]}
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

export default OtherInformation;
