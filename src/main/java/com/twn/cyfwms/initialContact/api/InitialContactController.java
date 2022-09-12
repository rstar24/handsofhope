package com.twn.cyfwms.initialContact.api;

import static org.springframework.http.HttpStatus.OK;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.twn.cyfwms.initialContact.dto.InitialContactSearchCriteriaDto;
import com.twn.cyfwms.initialContact.dto.InitialContactSearchResultsDto;
import com.twn.cyfwms.initialContact.service.InitialContactFileDetailsService;
import com.twn.cyfwms.initialContact.service.InitialContactSearchService;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/initialcontactservice")
@CrossOrigin("*")
public class InitialContactController {
  @Autowired
  InitialContactFileDetailsService fileDetailsService;

  @Autowired
  InitialContactSearchService searchService;

  @ApiOperation("Search Initial Contact(s)")
  @GetMapping(value = {"/search/{clientname}/{fileNumber}/{caseworker}/{startingDate}/{status}"}, produces = "application/json")
  @ResponseStatus(OK)
  public List<InitialContactSearchResultsDto> search(@PathVariable Map<String, String> var) {
      InitialContactSearchCriteriaDto initialContactSearchCriteriaDto=new InitialContactSearchCriteriaDto();
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
  public ResponseEntity<String> remove(@PathVariable("fileNumber") Long fileNumber) {
    return fileDetailsService.remove(fileNumber);
  }
}
