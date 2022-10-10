package org.cyfwms.initialcontact.api;

import org.cyfwms.initialcontact.dto.ICSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.ICSearchResultsDto;
import org.cyfwms.initialcontact.dto.ICCommonDataDto;
import org.cyfwms.initialcontact.service.ICFileDetailsService;
import org.cyfwms.initialcontact.service.ICSearchService;
import org.cyfwms.initialcontact.service.ICCommonDataService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/initialcontactservice")
@CrossOrigin("*")
public class InitialContactController {
  @Autowired
  ICFileDetailsService fileDetailsService;
  @Autowired
  ICSearchService searchService;
  @Autowired
  ICCommonDataService iCCommonDataService;

  @ApiOperation("Search Initial Contact(s)")
  @GetMapping(value = {"/search/{clientname}/{fileNumber}/{caseworker}/{startingDate}/{status}"}, produces = "application/json")
  @ResponseStatus(OK)
  public List<ICSearchResultsDto> search(@PathVariable Map<String, String> var) {
      ICSearchCriteriaDto initialContactSearchCriteriaDto=new ICSearchCriteriaDto();
      initialContactSearchCriteriaDto.setClientName(
              ("null".equals(var.get("clientname"))
                      || var.get("clientname") == null) ?null:var.get("clientname"));
      initialContactSearchCriteriaDto.setFileNumber(("null".equals(var.get("fileNumber"))
              || var.get("fileNumber") == null) ?null:Long.parseLong(var.get("fileNumber")));
      initialContactSearchCriteriaDto.setCaseworker(
              ("null".equals(var.get("caseworker"))
                      || var.get("caseworker") == null) ?null:var.get("caseworker")
      );
      LocalDate dateTime=null;
      if(!"null".equals(var.get("startingDate"))) {
          DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
          dateTime = LocalDate.parse(var.get("startingDate"), formatter);
      }
      initialContactSearchCriteriaDto.setStartingDate(dateTime);
      initialContactSearchCriteriaDto.setStatus(
              ("null".equals(var.get("status"))
                      || var.get("status") == null) ?null:var.get("status"));
      return searchService.search(initialContactSearchCriteriaDto);
  }

  @ApiOperation("Soft delete Initial Contact")
  @DeleteMapping("/remove/{fileNumber}")
  public ResponseEntity<String> removeICFileDetails(@PathVariable("fileNumber") Long fileNumber) {
     fileDetailsService.removeICFileDetails(fileNumber);
      return new ResponseEntity("Operation Successful", HttpStatus.OK);
  }

    @GetMapping(value = "/readAll/{fileNumber}", produces = "application/json")
    @ApiOperation("Read All Output InitialContact")
    @ResponseStatus(HttpStatus.OK)
    public ICCommonDataDto iCCommonData(@PathVariable("fileNumber") Long fileNumber) {
        return iCCommonDataService.iCCommonData(fileNumber);
    }
}
