package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.dto.ICAppointmentSearchDto;
import org.cyfwms.initialcontact.dto.ICAppointmentSearchResultDto;
import org.cyfwms.participant.dto.ParticipantContactNotesSearchCriteriaDto;
import org.cyfwms.participant.dto.ParticipantContactNotesSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ICAppointmentSearchRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<ICAppointmentSearchResultDto> searchICAppointment(ICAppointmentSearchDto icAppointmentSearchDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(icAppointmentSearchDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new ICAppointmentSearchResultDto(
                                rs.getLong("appointmentid"),
                                rs.getLong("filedetailsid"),
                                rs.getString("subject"),
                                rs.getString("status"),
                                rs.getDate("date")!=null?rs.getDate("date").toLocalDate(): LocalDate.of(1,1,1),
                                rs.getLong("icappointmentId")
                        )
        );
    }

    private StringBuffer createSearchQuery(ICAppointmentSearchDto icAppointmentSearchDto, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        String data=icAppointmentSearchDto.getData();
        Long fileDetailsId = icAppointmentSearchDto.getFileDetailsId();

        querySBuff.append("select p.appointmentid ,p2.filedetailsid,p2.icappointmentid,p.subject ,p.status ,p.date ");
        querySBuff.append("from appointments p left join ic_appointment p2 on p.appointmentid = p2.appointmentid where  p2.status='ACTIVE' ");

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

            querySBuff.append(" AND (p2.filedetailsid=? OR p.subject LIKE ?  OR p.status LIKE ?  OR p.date LIKE ?  OR p.time LIKE ?  OR p.location LIKE ?  OR p.duration LIKE ?  OR p.client LIKE ?  OR p.caseworker LIKE ?  OR p.recurring_appointment LIKE ?  OR p.frequency LIKE ? OR p.end_date LIKE ? OR p.notes LIKE ? ) ");
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
            querySBuff.append(" AND p2.filedetailsid = ? ");
            argsObjectList.add(fileDetailsId);}

        return querySBuff;

    }
}
