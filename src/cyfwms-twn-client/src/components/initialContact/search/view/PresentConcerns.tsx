import { useAppSelector } from "../../../../library/hooks";
import { styles } from "./Home";
import { PresentConcernsLabels } from "../../../../library/labels/initialContact";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

const PresentConcerns = (): ReactElement => {
  const data = useAppSelector((state) => state.icPresentConcerns.data);

  return (
    <Box paddingTop={3}>
      {Object.entries(data).map((t: any, k: any) => (
        <Box
          sx={{
            display: "flex",
            paddingLeft: 8,
          }}
        >
          {t[1] === "" || t[1] === 0 ? (
            <></>
          ) : (
            <>
              {k !== 0 && k !== 1 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.keys}>
                      {PresentConcernsLabels[k]}
                    </Typography>
                  </Box>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }} paddingRight={15}>
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

export default PresentConcerns;
