package com.twn.cyfwms.CulturalProgram.controller;

import static org.springframework.http.HttpStatus.*;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.twn.cyfwms.CulturalProgram.dto.AttachmentDTO;
import com.twn.cyfwms.CulturalProgram.entity.AttachmentEntity;
import com.twn.cyfwms.CulturalProgram.service.AttachmentsService;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/cpa/attachments")
@CrossOrigin("*")
public class AttachmentsController {
  @Autowired
  private AttachmentsService attachmentsService;

  @ApiOperation("Save/Upload/Put one/single attachment.")
  @PutMapping("/save_one")
  public AttachmentEntity saveOne(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("culturalDto") String culturalDto) throws IOException {
    AttachmentEntity culturalProgImage = attachmentsService.uploadImage(file, culturalDto);
    return culturalProgImage;
  }

  @ApiOperation("Read/Get one/single attachment.")
  @GetMapping("/read_one/{id}")
  public AttachmentDTO readOne(@PathVariable Long id) {
    return attachmentsService.getOneFile(id);
  }

  @ApiOperation("Read/Get all attachments.")
  @GetMapping(value = "/read_all/{culturalprogramid}", produces = "application/json")
  @ResponseStatus(OK)
  public List<AttachmentDTO> readAll(@PathVariable("culturalprogramid") Long culturalProgramId) {
    return attachmentsService.getAllFiles(culturalProgramId);
  }

  @ApiOperation("Soft remove/delete one/single attachment.")
  @DeleteMapping("/remove_one/{culturalprogimageid}")
  @ResponseStatus(OK)
  public ResponseEntity<String> removeOne(@PathVariable("culturalprogimageid") Long culturalProgImageId) {
    return attachmentsService.removeCulturalProgImage(culturalProgImageId);
  }
}
