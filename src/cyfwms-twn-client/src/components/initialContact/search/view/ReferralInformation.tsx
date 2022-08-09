import { useAppSelector } from "../../../../library/hooks";
import { styles } from "./Home";
import { ReferralInformationLabels } from "../../../../library/labels/initialContact";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

const ReferralInformation = (): ReactElement => {
  const data = useAppSelector((state) => state.icReferralInformation.data);

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
          {t[1] === "" || t[1] === 0 ? (
            <></>
          ) : (
            <>
              {k !== 1 && k !== 0 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.keys}>
                      {ReferralInformationLabels[k]}
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }} paddingRight={15}>
                    <Typography variant="h6" style={styles.values}>
                      {(typeof t[1]).toString() === "boolean"
                        ? t[1]
                          ? "Yes"
                          : "No"
                        : t[1]}
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

export default ReferralInformation;
