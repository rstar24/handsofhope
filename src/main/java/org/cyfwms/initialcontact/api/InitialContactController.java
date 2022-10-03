package org.cyfwms.initialcontact.api;

import org.cyfwms.initialcontact.dto.InitialContactSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.InitialContactSearchResultsDto;
import org.cyfwms.initialcontact.dto.ReadAllOutputInitialContactDto;
import org.cyfwms.initialcontact.service.InitialContactFileDetailsService;
import org.cyfwms.initialcontact.service.InitialContactSearchService;
import org.cyfwms.initialcontact.service.ReadAllInitialContactService;
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
  InitialContactFileDetailsService fileDetailsService;
  @Autowired
  InitialContactSearchService searchService;
  @Autowired
  ReadAllInitialContactService readAllInitialContactService;

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

    @GetMapping(value = "/readAll/{fileNumber}", produces = "application/json")
    @ApiOperation("Read All Output InitialContact")
    @ResponseStatus(HttpStatus.OK)
    public ReadAllOutputInitialContactDto readAllOutPutInitialContact(@PathVariable("fileNumber") Long fileNumber) {
        return readAllInitialContactService.readAllOutPutInitialContact(fileNumber);
    }
}
