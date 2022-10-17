package org.cyfwms.common.codetable.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.cyfwms.common.codetable.dto.DataResponseDto;
import org.cyfwms.common.codetable.service.DataReferenceService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
@RestController
@AllArgsConstructor
@RequestMapping("/v1/dataservice")
@CrossOrigin("*")
public class DataReferenceController {

    private DataReferenceService dataReferenceService;

    @GetMapping(value = "/gender", produces = "application/json")
    @ApiOperation("Get All Gender Types")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getGenderValues() {

        return dataReferenceService.getAllGenderTypes();
    }
    @GetMapping(value = "/maritalstatus", produces = "application/json")
    @ApiOperation("Get All Marital Status Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getMaritalStatus() {

        return dataReferenceService.getAllMaritalStatusValue();
    }
   @GetMapping(value = "/role", produces = "application/json")
    @ApiOperation("Get All Role Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getRoleValue() {

        return dataReferenceService.getAllRoleValue();
    }
    @GetMapping(value = "/province", produces = "application/json")
    @ApiOperation("Get All Province Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getProvince() {

        return dataReferenceService.getAllProvinceValue();
    }



    @GetMapping(value = "/education", produces = "application/json")
    @ApiOperation("Get All Education Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getEducationValue() {

        return dataReferenceService.getAllEducationValue();
    }

    @GetMapping(value = "/typeofemployee", produces = "application/json")
    @ApiOperation("Get All Employee Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getEmployeeValue() {

        return dataReferenceService.getAllEmployeeValue();
    }

    @GetMapping(value = "/initialContactStatus", produces = "application/json")
    @ApiOperation("Get All Employee Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllInitialContactStatusValue() {

        return dataReferenceService.getAllInitialContactStatusValue();
    }
    @GetMapping(value = "/initialContactReferral", produces = "application/json")
    @ApiOperation("Get All Employee Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllInitialContactReferralValue() {

        return dataReferenceService.getAllInitialContactReferralValue();
    }
    @GetMapping(value = "/presentConcerns", produces = "application/json")
    @ApiOperation("Get All Employee Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllPresentConcernsValue() {

        return dataReferenceService.getAllPresentConcernsValue();
    }
    @GetMapping(value = "/mentalHealthOrSubstanceAbuse", produces = "application/json")
    @ApiOperation("Get All Employee Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllMentalHealthOrSubstanceAbuseValue() {

        return dataReferenceService.getAllMentalHealthOrSubstanceAbuseValue();
    }
    @GetMapping(value = "/typeOfPatient", produces = "application/json")
    @ApiOperation("Get All Employee Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllTypeOfPatientValue() {

        return dataReferenceService.getAllTypeOfPatientValue();
    }
    @GetMapping(value = "/risk", produces = "application/json")
    @ApiOperation("Get All Employee Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllRiskValue() {

        return dataReferenceService.getAllRiskValue();
    }
    @GetMapping(value = "/contactMethod", produces = "application/json")
    @ApiOperation("Get All Contact Method Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllContactMethodValue() {

        return dataReferenceService.getAllContactMethodValue();
    }
    @GetMapping(value = "/culturaltype", produces = "application/json")
    @ApiOperation("Get All Contact Method Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllCulturalTypeValue() {

        return dataReferenceService.getAllCulturalTypeValue();
    }
    @GetMapping(value = "/culturalstatus", produces = "application/json")
    @ApiOperation("Get All Contact Method Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllCulturalStatusValue() {

        return dataReferenceService.getAllCulturalStatusValue();
    }
    @GetMapping(value = "/appoinmentstatus", produces = "application/json")
    @ApiOperation("Get All appointment Status Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllAppointmentStatusValue() {

        return dataReferenceService.getAllAppointmentStatusValue();
    }

    @GetMapping(value = "/frequency", produces = "application/json")
    @ApiOperation("Get All frequency Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllFrequencyValue() {

        return dataReferenceService.getAllFrequencyValue();
    }
    @GetMapping(value = "/caregiverstatus", produces = "application/json")
    @ApiOperation("Get All caregivers Status Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllCaregiversStatusValue() {

        return dataReferenceService.getAllCaregiversStatusValue();
    }

    @GetMapping(value = "/caregivertype", produces = "application/json")
    @ApiOperation("Get All caregiver type Value")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getAllCaregiversTypeValue() {

        return dataReferenceService.getAllCaregiversTypeValue();
    }
}
