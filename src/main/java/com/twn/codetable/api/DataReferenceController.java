package com.twn.codetable.api;

import com.twn.codetable.dto.DataResponseDto;
import com.twn.codetable.service.DataReferenceService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
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

}
