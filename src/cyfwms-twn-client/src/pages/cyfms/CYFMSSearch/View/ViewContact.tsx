import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../library/hooks";
import { styles } from "./ViewHome";
const ViewContact = () => {
  const data = useAppSelector((state) => state as any);
  return (
    <Box>
      {Object.entries(data.cyfmsContact.contactData).map((t: any, k) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            paddingLeft: 8,
          }}
        >
          {k !== 0 && k !== 1 && (
            <>
              <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  textTransform="capitalize"
                  style={styles.keys}
                >
                  {t[0]}
                </Typography>
              </Box>
              <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  textTransform="capitalize"
                  style={styles.values}
                >
                  {t[1]}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ViewContact;
