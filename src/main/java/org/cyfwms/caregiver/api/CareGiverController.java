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

    @ApiOperation("Read a Care Provider.")
    @GetMapping(value = "/care_provider/read/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public CareProviderDto readCareProvider(@PathVariable("id") Long id) {
        return careProviderService.read(id);
    }

    @ApiOperation("Save/Update a Care Provider.")
    @PutMapping(value = "/care_provider/save", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public CareProviderDto saveCareProvider(@RequestBody CareProviderDto cpDto) {
        return careProviderService.save(cpDto);
    }

    @ApiOperation("Soft delete a Care Provider.")
    @DeleteMapping("/care_provider/remove/{referenceId}")
    @ResponseStatus(HttpStatus.OK)
    public void removeCareProvider(@PathVariable("referenceId") Long referenceId) {
        careProviderService.remove(referenceId);
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
