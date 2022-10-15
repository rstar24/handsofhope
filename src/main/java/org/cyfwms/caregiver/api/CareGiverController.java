package org.cyfwms.caregiver.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.cyfwms.caregiver.dto.*;
import org.cyfwms.caregiver.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Map;
@RestController
@AllArgsConstructor
@RequestMapping("/v1/caregiverservice")
@CrossOrigin("*")
public class CareGiverController {
     @Autowired
     private CareProviderService careProviderService;

    @Autowired
    private CapacityService capacityService;

    @Autowired
    private CareProviderSearchService careProviderSearchService;

    @Autowired
    private ContactNotesService contactNotesService;

    @Autowired
    private CareGiverContactNotesSearchService careGiverContactNotesSearchService;

    @Autowired
    private CareGiversBackGroundCheckService cgBackGroundCheckService;

    @GetMapping(value = "/readCareProvider/{cgproviderid}", produces = "application/json")
    @ApiOperation("Read CareGiverProvider")
    public ResponseEntity<CareProviderDto> readCareProvider(@PathVariable("cgproviderid") Long cgProviderId) {
        CareProviderDto careProviderDto=new CareProviderDto();
        try {
            careProviderDto=careProviderService.readCareProvider(cgProviderId);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(careProviderDto,HttpStatus.OK);
    }

    @PutMapping(value = "/saveCareProvider", produces = "application/json")
    @ApiOperation("Save or Update CareProvider")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CareProviderDto> saveCareProvider(@RequestBody CareProviderDto careProviderDto) {
        careProviderDto=careProviderService.CareProvider(careProviderDto);
        return new ResponseEntity<>(careProviderDto, HttpStatus.CREATED);
    }

    @ApiOperation("delete CareProvider")
    @DeleteMapping("/removeCareProvider/{referenceid}")
    public ResponseEntity<String> removeCareProvider(@PathVariable("referenceid") Long referenceId) {
        careProviderService.removeCareProvider(referenceId);
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }

    @GetMapping(value = {"/careGiverProviderSearch/{referenceId}/{name}/{type}/{priCaregiver}/{secCaregiver}/{status}"},produces = "application/json")
    @ApiOperation("Search Caregivers")
    @ResponseStatus(HttpStatus.OK)
    public List<CareProviderSearchResultsDto> searchCareGiver(@PathVariable Map<String, String> var)
    {
        CareProviderSearchCriteriaDto careProviderSearchCriteriaDto = new CareProviderSearchCriteriaDto();
        careProviderSearchCriteriaDto.setReferenceId(("null".equals(var.get("referenceId"))
                || var.get("referenceId") == null) ?null:Long.parseLong(var.get("referenceId")));
        careProviderSearchCriteriaDto.setName(
                ("null".equals(var.get("name"))
                        || var.get("name") == null) ?null:var.get("name"));

        careProviderSearchCriteriaDto.setType(
                ("null".equals(var.get("type"))
                        || var.get("type") == null) ?null:var.get("type"));

        careProviderSearchCriteriaDto.setPriCaregiver(
                ("null".equals(var.get("priCaregiver"))
                        || var.get("priCaregiver") == null) ?null:var.get("priCaregiver"));

        careProviderSearchCriteriaDto.setSecCaregiver(
                ("null".equals(var.get("secCaregiver"))
                        || var.get("secCaregiver") == null) ?null:var.get("secCaregiver"));

        careProviderSearchCriteriaDto.setStatus(
                ("null".equals(var.get("status"))
                        || var.get("status") == null) ?null:var.get("status"));
        return careProviderSearchService.searchCareGiver(careProviderSearchCriteriaDto);
    }

    @GetMapping(value = "/readCapacity/{cgproviderid}", produces = "application/json")
    @ApiOperation("Read CGCapacity")
    @ResponseStatus(HttpStatus.OK)
    public CapacityDto readCapacity(@PathVariable("cgproviderid") Long cgProviderId) {
        return capacityService.readCapacity(cgProviderId);
    }

    @PutMapping(value = "/saveCapacity", produces = "application/json")
    @ApiOperation("Save or Update Capacity")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CapacityDto> saveCapacity(@RequestBody CapacityDto capacityDto) {
        capacityDto=capacityService.saveCapacity(capacityDto);
        return new ResponseEntity<>(capacityDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getAllContactNotes/{cgcontactnotesid}", produces = "application/json")
    @ApiOperation("Read All ContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public ContactNotesDto getAllContactNotes(@PathVariable("cgcontactnotesid") Long cgContactNotesId) {
        return contactNotesService.getAllContactNotes(cgContactNotesId);
    }

    @PutMapping(value = "/saveAllContactNotes", produces = "application/json")
    @ApiOperation("Save All ContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ContactNotesDto> saveAllContactNotes(@RequestBody ContactNotesDto contactNotesDto) {
        contactNotesDto=contactNotesService.saveAllContactNotes(contactNotesDto);
        return new ResponseEntity<>(contactNotesDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/removeContactNotes/{cgcontactnotesid}")
    @ApiOperation("Remove Contact Notes")
    public ResponseEntity<String> removeContactNotes(@PathVariable("cgcontactnotesid") Long cgContactNotesId) {
        contactNotesService.removeContactNotes(cgContactNotesId);
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }

    @GetMapping(value = {"/searchContactNotes/{cgproviderid}/{data}"},produces = "application/json")
    @ApiOperation("Search CareGiverContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public List<CareGiverContactNotesSearchResultsDto> searchCareGiverContactNotes(@PathVariable Map<String, String> var)
    {
        CareGiverContactNotesSearchCriteriaDto cgContactNotesSearchCriteriaDto=new CareGiverContactNotesSearchCriteriaDto();
        cgContactNotesSearchCriteriaDto.setCgProviderId(("null".equals(var.get("cgproviderid"))
                ||var.get("cgproviderid")==null) ? null:Long.parseLong(var.get("cgproviderid")));
        cgContactNotesSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return careGiverContactNotesSearchService.searchContactNotes(cgContactNotesSearchCriteriaDto);
    }


    @GetMapping(value = "/readCareGiversBackGroundCheck/{cgproviderid}", produces = "application/json")
    @ApiOperation("Read CareGiversBackGroundCheck")
    public CareGiversBackGroundCheckDto readCareGiversBackGroundCheck(@PathVariable("cgproviderid") Long cgProviderId) {
        return cgBackGroundCheckService.readCareGiversBackGroundCheck(cgProviderId);
    }

    @PutMapping(value = "/saveCareGiversBackGroundCheck", produces = "application/json")
    @ApiOperation("Save CareGiversBackGroundCheck")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CareGiversBackGroundCheckDto> saveCareGiversBackGroundCheck(@RequestBody CareGiversBackGroundCheckDto cgBackGroundCheckDto) {
        cgBackGroundCheckDto= cgBackGroundCheckService.saveCareGiversBackGroundCheck(cgBackGroundCheckDto);
        return new ResponseEntity<>(cgBackGroundCheckDto, HttpStatus.CREATED);
    }


}
