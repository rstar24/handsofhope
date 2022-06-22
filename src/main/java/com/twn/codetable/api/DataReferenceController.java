package com.twn.codetable.api;

import com.twn.codetable.dto.DataResponseDto;
import com.twn.codetable.service.DataReferenceService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping("/v1/dataservice")
public class DataReferenceController {

    private DataReferenceService dataReferenceService;


    @GetMapping(value = "/gender", produces = "application/json")
    @ApiOperation("Get All Gender Types")
    @ResponseStatus(HttpStatus.OK)
    public DataResponseDto getGenderValues() {

        return dataReferenceService.getAllGenderTypes();
    }


}
