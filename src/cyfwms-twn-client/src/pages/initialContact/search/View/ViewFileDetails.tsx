import { useAppSelector } from "../../../../library/hooks";
import {
  FileDetailsLabelsClosed,
  FileDetailsLabelsProgress,
} from "./ViewPagesLabels";
import { styles } from "./ViewHome";
import { Box, Typography } from "@mui/material";
import React from "react";
import { DataArray } from "@mui/icons-material";

const ViewFileDetails = () => {
  const data = useAppSelector((state) => state.icFileDetails.data);
  console.log("-----", Object.keys(data).length);
  return (
    <Box paddingTop={3}>
      {Object.entries(data).map((t: any, k: any) => (
        <Box
          maxHeight={40}
          sx={{
            display: "flex",
            paddingLeft: 8,
          }}
        >
          {Object.keys(data).length === 7 ? (
            <>
              {t[1] !== "" && (
                <>
                  {k !== 0 && k !== 6 && (
                    <>
                      <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                        <Typography variant="h6" style={styles.keys}>
                          {FileDetailsLabelsProgress[k]}
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
            </>
          ) : (
            <>
              {t[1] !== "" && t[1] !== "0001-01-01" && (
                <>
                  {k !== 0 && k !== 7 && (
                    <>
                      <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                        <Typography variant="h6" style={styles.keys}>
                          {FileDetailsLabelsClosed[k]}
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
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ViewFileDetails;
