package com.twn.cyfwms.CulturalProgram.repository;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActSearchCriteriaDto;
import com.twn.cyfwms.CulturalProgram.dto.CultureProgAndActSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Repository
public class CultureProgAndActSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<CultureProgAndActSearchResultsDto> searchCulturalProgAndAct(CulturalProgAndActSearchCriteriaDto culturalProgAndActSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(culturalProgAndActSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new CultureProgAndActSearchResultsDto(
                                rs.getLong("CulturalProgramId"),
                                rs.getLong("referenceId"),
                                rs.getString("name"),
                                rs.getString("type"),
                                rs.getString("caseworker"),
                                rs.getDate("startDate")!=null?rs.getDate("startDate").toLocalDate(): LocalDate.of(1,1,1),
                        rs.getString("status")
                        )
        );
    }
    private StringBuffer createSearchQuery(CulturalProgAndActSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        String data=searchCriteria.getData();
        querySBuff.append("select c.culturalProgramId ,c.referenceid ,c.name ,c.type ,c.caseworker, c.startDate ,c.status ");
        querySBuff.append("from culturalprogandact c where c.deletionofstatus='ACTIVE'");
        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND (c.referenceid =? OR c.name LIKE ? OR c.type LIKE ? OR  c.caseworker LIKE ? OR c.startDate LIKE ? OR c.status LIKE ? ) ");
            argsObjectList.add(data);
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add(data);
            argsObjectList.add("%" +data + "%");
        }
        return querySBuff;
    }
}
