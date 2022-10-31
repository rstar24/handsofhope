package org.cyfwms.caregiver.api;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.cyfwms.caregiver.dto.CGAttachmentDto;
import org.cyfwms.caregiver.service.CGAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/caregiverservice/attachments")
@CrossOrigin("*")
public class CGAttachmentController {
    @Autowired
    CGAttachmentService cgAttachmentService;

    @ApiOperation("Save/Upload/Put one/single attachment.")
    @PutMapping("/save_one")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CGAttachmentDto> saveOne(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("cgDto") String cgDto) throws IOException {
        CGAttachmentDto cgAttachmentDto = cgAttachmentService.saveCGAttachment(file, cgDto);
        return ResponseEntity.ok(cgAttachmentDto);
    }

    @ApiOperation("Read/Get one/single attachment.")
    @GetMapping("/read_one/{id}")
    public CGAttachmentDto readOne(@PathVariable Long id) {
        return cgAttachmentService.getOneFile(id);
    }

    @ApiOperation("Read/Get all attachments.")
    @GetMapping(value = "/read_all/{caregiverproviderid}", produces = "application/json")
    @ResponseStatus(OK)
    public List<CGAttachmentDto> readAll(@PathVariable("caregiverproviderid") Long caregiverProviderId) {
        return cgAttachmentService.getAllFiles(caregiverProviderId);
    }

    @ApiOperation("Soft remove/delete one/single attachment.")
    @DeleteMapping("/remove_one/{cgimageid}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeOne(@PathVariable("cgimageid") Long cgImageId) {
         cgAttachmentService.removeCGImage(cgImageId);
    }
}

