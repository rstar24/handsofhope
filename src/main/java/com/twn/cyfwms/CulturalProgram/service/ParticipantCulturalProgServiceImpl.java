package com.twn.cyfwms.CulturalProgram.service;
import com.twn.cyfwms.CulturalProgram.dto.ParticipantCulturalProgDto;
import com.twn.cyfwms.CulturalProgram.entity.ParticipantCulturalProgAndAct;
import com.twn.cyfwms.CulturalProgram.repository.ParticipantCulturalProgRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.NOT_FOUND;
@Service
public class ParticipantCulturalProgServiceImpl implements ParticipantCulturalProgService {
    @Autowired
    private ParticipantCulturalProgRepository participantCulturalProgRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public ParticipantCulturalProgDto saveParticipantCulturalProg(ParticipantCulturalProgDto participantCulturalProgDto) {
        ParticipantCulturalProgAndAct participantCulturalProgAndAct = null;
        if (participantCulturalProgDto.getParticipantCulturalProId()== 0) {
            participantCulturalProgAndAct = new ParticipantCulturalProgAndAct();
            modelMapper.map(participantCulturalProgDto, participantCulturalProgAndAct);
            participantCulturalProgAndAct.setStatus("ACTIVE");
        } else {
            participantCulturalProgAndAct = participantCulturalProgRepository.findById(participantCulturalProgDto.getParticipantCulturalProId()).get();
            modelMapper.map(participantCulturalProgDto, participantCulturalProgAndAct);
        }
        participantCulturalProgAndAct = participantCulturalProgRepository.save(participantCulturalProgAndAct);
        participantCulturalProgDto.setParticipantCulturalProId(participantCulturalProgAndAct.getParticipantCulturalProId());
        return participantCulturalProgDto;
    }

    @Override
    public ParticipantCulturalProgDto readParticipantCulturalAndAct(Long participantCulturalProId) {
        ParticipantCulturalProgDto participantCulturalProgDto = new ParticipantCulturalProgDto();
        if (participantCulturalProId != 0) {
            ParticipantCulturalProgAndAct participantCulturalProgAndAct = participantCulturalProgRepository.findByparticipantCulturalProId(participantCulturalProId);
            if (participantCulturalProgAndAct != null) {
                modelMapper.map(participantCulturalProgAndAct, participantCulturalProgDto);
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return participantCulturalProgDto;
    }

    @Override
    public ResponseEntity removeParticipantCulturalProg(Long participantCulturalProId) {
        if (participantCulturalProId != 0 ) {
            ParticipantCulturalProgAndAct participantCulturalProgAndAct = participantCulturalProgRepository.findByparticipantCulturalProId(participantCulturalProId);
            if (participantCulturalProgAndAct!=null){
                participantCulturalProgAndAct.setStatus("INACTIVE");
                participantCulturalProgRepository.save(participantCulturalProgAndAct);
            }
            else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        } else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
