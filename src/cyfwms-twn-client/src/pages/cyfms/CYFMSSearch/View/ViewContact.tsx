import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../../library/hooks";
import { styles } from "./ViewHome";
import { ContactLabel } from "./ViewPagesLabels";
const ViewContact = () => {
  const data = useAppSelector((state) => state as any).cyfmsContact.contactData;
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
          {t[1] === "" ? (
            <></>
          ) : (
            <>
              {k !== 0 && k !== 1 && (
                <>
                  <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                    <Typography variant="h6" style={styles.keys}>
                      {ContactLabel[k]}
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

export default ViewContact;
