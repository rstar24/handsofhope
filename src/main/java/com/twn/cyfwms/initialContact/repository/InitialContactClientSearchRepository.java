package com.twn.cyfwms.initialContact.repository;
import com.twn.cyfwms.initialContact.dto.InitialContactClientSearchCriteriaDto;
import com.twn.cyfwms.initialContact.dto.InitialContactClientSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
@Repository
public class InitialContactClientSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<InitialContactClientSearchResultsDto> searchParticipant(InitialContactClientSearchCriteriaDto initialContactClientSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(initialContactClientSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new InitialContactClientSearchResultsDto(
                                rs.getString("firstname"),
                                rs.getString("surname")
                        )
        );
    }
    private StringBuffer createSearchQuery(InitialContactClientSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        String data=searchCriteria.getData();
        querySBuff.append("select p.firstname ,p.surname ");
        querySBuff.append("from participant p left join participantcontact p2 on p.participantid = p2.participantid where  p.status='ACTIVE'");
        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND (p.referenceid =? OR p.dateofbirth LIKE ? OR p.firstname LIKE ? OR p.surname LIKE ?  OR p.middlename LIKE ? OR p.maritalstatus LIKE ? OR p2.homephone LIKE ? OR p2.cellphone LIKE ? OR p2.workphone LIKE ? OR p2.city LIKE ?) ");
            argsObjectList.add(data);
            argsObjectList.add(data);
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add("%" +data + "%");
            argsObjectList.add(data);
            argsObjectList.add(data);
            argsObjectList.add(data);
            argsObjectList.add("%"+data +"%");
        }
        return querySBuff;
    }
}
