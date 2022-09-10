package com.twn.cyfwms.participant.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twn.cyfwms.participant.dto.LabelDTO;
import com.twn.cyfwms.participant.dto.LabelsDTO;
import com.twn.cyfwms.participant.entity.Label;
import com.twn.cyfwms.participant.repository.LabelRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class LabelServiceImpl implements LabelService {
  @Autowired
  private LabelRepository labelRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public LabelsDTO readLabels() {
    LabelsDTO labelDTO = new LabelsDTO();
    List<Label> label = labelRepository.findAllByPageOrderByIdAsc("register");
    labelDTO.setRegister(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    label = labelRepository.findAllByPageOrderByIdAsc("contact");
    labelDTO.setContact(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    label = labelRepository.findAllByPageOrderByIdAsc("householdMembers");
    labelDTO.setHouseholdMembers(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    label = labelRepository.findAllByPageOrderByIdAsc("educationAndEmployment");
    labelDTO.setEducationAndEmployment(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    label = labelRepository.findAllByPageOrderByIdAsc("criminalHistoryRecord");
    labelDTO.setCriminalHistoryRecord(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    label = labelRepository.findAllByPageOrderByIdAsc("criminalHistory");
    labelDTO.setCriminalHistory(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    label = labelRepository.findAllByPageOrderByIdAsc("familyPhysicians");
    labelDTO.setFamilyPhysicians(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    label = labelRepository.findAllByPageOrderByIdAsc("counselors");
    labelDTO.setCounselors(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    label = labelRepository.findAllByPageOrderByIdAsc("otherInformation");
    labelDTO.setOtherInformation(modelMapper.map(label, new TypeToken<List<LabelDTO>>() {}.getType()));
    return labelDTO;
  }
}
