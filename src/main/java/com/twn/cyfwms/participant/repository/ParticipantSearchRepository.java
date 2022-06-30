package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.dto.ParticipantSearchCriteriaDto;
import com.twn.cyfwms.participant.dto.ParticipantSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ParticipantSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ParticipantSearchResultsDto> searchParticipants(ParticipantSearchCriteriaDto participantSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<Object>();
        StringBuffer querySBuff = createSearchQuery(participantSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(
                querySBuff.toString(), argsObjectList.toArray(),
                (rs, rowNum) ->
                        new ParticipantSearchResultsDto(
                                rs.getLong("participantid"),
                                rs.getString("firstname"),
                                rs.getString("middlename"),
                                rs.getString("surname"),
                                rs.getString("maritalstatus"),
                                rs.getDate("dateofbirth"),
                                rs.getString("city"),
                                rs.getString("homephone"),
                                rs.getString("cellphone"),
                                rs.getString("workhhone")
                        )
        );
    }

    private StringBuffer createSearchQuery(ParticipantSearchCriteriaDto searchCriteria, List<Object> argsObjectList){

        StringBuffer  querySBuff = new StringBuffer();
        querySBuff.append("select p.participantid, p.firstname, p.middlename, p.surname, p.maritalstatus,  p.dateofbirth, p2.city, p2.homephone, p2.cellphone, p2.workhhone ");
        querySBuff.append("from participant p inner join participantcontact p2 on p.participantid = p2.participantid ");

        String firstName = searchCriteria.getFirstname();
        if ( firstName != null && !firstName.trim().isEmpty()) {
            firstName = firstName.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.firstname LIKE ?");
            argsObjectList.add(firstName);
        }

        String middleName = searchCriteria.getMiddleName();
        if ( middleName != null && !middleName.trim().isEmpty()) {
            middleName = middleName.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.middlename LIKE ?");
            argsObjectList.add(middleName);
        }

        String surname = searchCriteria.getSurname();
        if ( surname != null && !surname.trim().isEmpty()) {
            surname = surname.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.surname LIKE ?");
            argsObjectList.add(surname);
        }

        LocalDate dateOfBirth = searchCriteria.getDateOfBirth();
        if ( dateOfBirth != null) {
            querySBuff.append(" AND p.dateofbirth = ?");
            argsObjectList.add(dateOfBirth);
        }

        String maritalStatus = searchCriteria.getMaritalStatus();
        if ( maritalStatus != null && !maritalStatus.trim().isEmpty()) {
            maritalStatus = maritalStatus.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.maritalstatus=");
            argsObjectList.add(maritalStatus);
        }
        String city = searchCriteria.getCity();
        if ( city != null && !city.trim().isEmpty()) {
            city = city.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p2.city LIKE ?");
            argsObjectList.add(city);
        }
        String phoneNumber = searchCriteria.getPhoneNumber();
        if ( phoneNumber != null && !phoneNumber.trim().isEmpty()) {
            phoneNumber = phoneNumber.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND (p2.homephone = ? OR p2.cellphone = ? OR p2.workhhone = ?)");
            argsObjectList.add(phoneNumber);
            argsObjectList.add(phoneNumber);
            argsObjectList.add(phoneNumber);
        }
        return querySBuff;
    }
}
