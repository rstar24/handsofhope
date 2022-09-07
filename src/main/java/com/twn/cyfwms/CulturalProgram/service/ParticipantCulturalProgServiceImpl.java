package com.twn.cyfwms.CulturalProgram.service;
import com.twn.cyfwms.CulturalProgram.dto.ParticipantCulturalProgDto;
import com.twn.cyfwms.CulturalProgram.entity.ParticipantCulturalProgAndAct;
import com.twn.cyfwms.CulturalProgram.repository.ParticipantCulturalProgRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
        ParticipantCulturalProgAndAct participant = null;
        if (participantCulturalProgDto.getParticipantCulturalProId()== 0) {
            participant = new ParticipantCulturalProgAndAct();
            modelMapper.map(participantCulturalProgDto, participant);

        } else {
            participant = participantCulturalProgRepository.findById(participantCulturalProgDto.getParticipantCulturalProId()).get();
            modelMapper.map(participantCulturalProgDto, participant);
        }
        participant = participantCulturalProgRepository.save(participant);
        participantCulturalProgDto.setParticipantCulturalProId(participant.getParticipantCulturalProId());
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
}
