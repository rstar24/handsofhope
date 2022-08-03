import { useAppSelector } from "../../../../library/hooks";
import { InpatientLabels, OutpatientLabels } from "./ViewPagesLabels";
import { styles } from "./ViewHome";
import { Box, Typography } from "@mui/material";
import React from "react";

const ViewPatientCareInformation = () => {
  const data = useAppSelector((state) => state.icPatientCareInformation.data);
  console.log(data);
  return (
    <>
      {data.typeOfPatient === "Inpatient" && (
        <Box paddingTop={3}>
          <Typography fontSize={20} fontWeight={800}>
            {data.typeOfPatient}
          </Typography>
          {Object.entries(data.inpatient).map((t: any, k: any) => (
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
                  {k !== 1 && (
                    <>
                      <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                        <Typography variant="h6" style={styles.keys}>
                          {InpatientLabels[k]}
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
      )}

      {data.typeOfPatient === "Outpatient" && (
        <Box paddingTop={3}>
          <Typography fontSize={20} fontWeight={800}>
            {data.typeOfPatient}
          </Typography>
          {Object.entries(data.outpatient).map((t: any, k: any) => (
            <Box
              maxHeight={30}
              sx={{
                display: "flex",
                paddingLeft: 8,
              }}
            >
              <>
                {t[1] === "" ? (
                  <></>
                ) : (
                  <>
                    <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                      <Typography variant="h6" style={styles.keys}>
                        {OutpatientLabels[k]}
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
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default ViewPatientCareInformation;
