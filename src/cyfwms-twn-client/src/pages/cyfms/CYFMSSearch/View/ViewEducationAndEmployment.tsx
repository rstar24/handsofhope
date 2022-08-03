import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../library/hooks";
import { styles } from "./ViewHome";
import { EducationAndEmploymentLabels } from "./ViewPagesLabels";

const ViewEducationAndEmployment = () => {
  const data = useAppSelector(
    (state) => state.cyfmsEducationAndEmployment.data
  );

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
          {t[1] === "" || t[1] === "0001-01-01" ? (
            <></>
          ) : (
            <>
              {k !== 0 && k !== 5 && k !== 4 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.keys}>
                      {EducationAndEmploymentLabels[k]}
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

export default ViewEducationAndEmployment;
