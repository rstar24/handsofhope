package org.cyfwms.culturalprogram.api;

import static org.springframework.http.HttpStatus.OK;

import io.swagger.annotations.ApiOperation;
import java.io.IOException;
import java.util.List;
import lombok.AllArgsConstructor;
import org.cyfwms.culturalprogram.dto.AttachmentDTO;
import org.cyfwms.culturalprogram.service.AttachmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/cpa/attachments")
@CrossOrigin("*")
public class AttachmentsController {
	@Autowired
	private AttachmentsService attachmentsService;

	@ApiOperation("Save/Upload/Put one/single attachment.")
	@PutMapping("/save_one")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<AttachmentDTO> saveOne(
		@RequestParam(value = "file", required = false) MultipartFile file,
		@RequestParam("culturalDto") String culturalDto
	)
		throws IOException {
		AttachmentDTO culturalProgImage = attachmentsService.uploadImage(file, culturalDto);
		return ResponseEntity.ok(culturalProgImage);
	}

	@ApiOperation("Read/Get one/single attachment.")
	@GetMapping("/read_one/{id}")
	public AttachmentDTO readOne(@PathVariable Long id) {
		return attachmentsService.getOneFile(id);
	}

	@ApiOperation("Read/Get all attachments.")
	@GetMapping(value = "/read_all/{culturalprogramid}", produces = "application/json")
	@ResponseStatus(OK)
	public List<AttachmentDTO> readAll(
		@PathVariable("culturalprogramid") Long culturalProgramId
	) {
		return attachmentsService.getAllFiles(culturalProgramId);
	}

	@DeleteMapping("/remove_one/{culturalprogimageid}")
	@ApiOperation("Soft remove/delete one/single attachment.")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void removeCulturalProgImage(
		@PathVariable("culturalprogimageid") Long culturalProgImageId
	) {
		attachmentsService.removeCulturalProgImage(culturalProgImageId);
	}
}
