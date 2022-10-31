package org.cyfwms.participant.repository;

import org.cyfwms.initialcontact.dto.ICContactNotesSearchResultsDto;
import org.cyfwms.participant.dto.ParticipantContactNotesSearchCriteriaDto;
import org.cyfwms.participant.dto.ParticipantContactNotesSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Repository
public class ParticipantContactNotesSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<ParticipantContactNotesSearchResultsDto> searchParticipantContactNotes(ParticipantContactNotesSearchCriteriaDto iCContactNotesSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(iCContactNotesSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new ParticipantContactNotesSearchResultsDto(
                                rs.getLong("appointmentid"),
                                rs.getLong("participantid"),
                                rs.getString("subject"),
                                rs.getString("status"),
                                rs.getDate("date")!=null?rs.getDate("date").toLocalDate(): LocalDate.of(1,1,1),
                                rs.getLong("participantappointmentid")
                        )
        );
    }

    private StringBuffer createSearchQuery(ParticipantContactNotesSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        String data=searchCriteria.getData();
        Long participantId=searchCriteria.getParticipantId();

        querySBuff.append("select p.appointmentid ,p2.participantid,p2.participantappointmentid,p.subject ,p.status ,p.date ");
        querySBuff.append("from appointments p left join participant_appointment p2 on p.appointmentid = p2.appointmentid where  p2.status='ACTIVE' ");

//        if (participantId != null) {
//            querySBuff.append(" AND p2.appointmentid = ?");
//            argsObjectList.add(participantId);
//        }

        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");

            querySBuff.append(" AND (p2.participantid=? OR p.subject LIKE ?  OR p.status LIKE ?  OR p.date LIKE ?  OR p.time LIKE ?  OR p.location LIKE ?  OR p.duration LIKE ?  OR p.client LIKE ?  OR p.caseworker LIKE ?  OR p.recurring_appointment LIKE ?  OR p.frequency LIKE ? OR p.end_date LIKE ? OR p.notes LIKE ? ) ");
            argsObjectList.add(data);
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");

        }
        else {
            querySBuff.append(" AND p2.participantid = ? ");
            argsObjectList.add(participantId);}

        return querySBuff;

    }
}
