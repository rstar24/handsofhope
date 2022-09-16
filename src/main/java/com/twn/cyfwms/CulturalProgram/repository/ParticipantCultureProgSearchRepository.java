package com.twn.cyfwms.CulturalProgram.repository;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActSearchCriteriaDto;
import com.twn.cyfwms.CulturalProgram.dto.ParticipantCultureProgSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
@Repository
public class ParticipantCultureProgSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<ParticipantCultureProgSearchResultsDto> searchParticipantCulturalProgAndAct(CulturalProgAndActSearchCriteriaDto culturalProgAndActSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(culturalProgAndActSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->  new ParticipantCultureProgSearchResultsDto(
                                rs.getLong("participantculturalprogid"),
                                rs.getLong("culturalProgramId"),
                                rs.getString("fullName"),
                                rs.getString("role"),
                        rs.getString("notes")
                        )

        );
    }

    private StringBuffer createSearchQuery(CulturalProgAndActSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        String data=searchCriteria.getData();
        querySBuff.append("select p.participantculturalprogid ,p.culturalprogramid , CONCAT(firstname,' ', surname) AS fullName, p.role,p.notes ");
        querySBuff.append("from participantculturalprogram p  left join participant p2 on p.participantid = p2.participantid where  p.status='ACTIVE'");
        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND (culturalprogramid=? OR p.notes LIKE ? OR p.role LIKE ? ) ");
            argsObjectList.add(data);
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
        }
        return querySBuff;
    }
}
