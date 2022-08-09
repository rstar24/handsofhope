import { useAppSelector } from "../../../../library/hooks";
import {
  InpatientLabels,
  OutpatientLabels,
} from "../../../../library/labels/initialContact";
import { styles } from "./Home";
import { Box, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

const PatientCareInformation = (): ReactElement => {
  const data = useAppSelector((state) => state.icPatientCareInformation.data);

  return (
    <>
      {data.typeOfPatient === "Inpatient" && (
        <Box paddingTop={3}>
          <Typography fontSize={20} fontWeight={800}>
            {data.typeOfPatient}
          </Typography>
          {Object.entries(data.inpatient).map((t: any, k: any) => (
            <Box
              sx={{
                display: "flex",
                paddingLeft: 8,
              }}
            >
              {t[1] === "" ? (
                <></>
              ) : (
                <>
                  {k !== 0 && k !== 3 && k !== 4 && k !== 5 && (
                    <>
                      <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                        <Typography variant="h6" style={styles.keys}>
                          {InpatientLabels[k]}
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
      )}

      {data.typeOfPatient === "Outpatient" && (
        <Box paddingTop={3}>
          <Typography fontSize={20} fontWeight={800}>
            {data.typeOfPatient}
          </Typography>
          {Object.entries(data.outpatient).map((t: any, k: any) => (
            <Box
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
                    <>
                      {k !== 0 && k !== 8 && k !== 10 && k !== 9 && (
                        <>
                          <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                            <Typography variant="h6" style={styles.keys}>
                              {OutpatientLabels[k]}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ flexBasis: 0, flexGrow: 1 }}
                            paddingRight={15}
                          >
                            <Typography variant="h6" style={styles.values}>
                              {t[1]}
                            </Typography>
                          </Box>
                        </>
                      )}
                    </>
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

export default PatientCareInformation;
