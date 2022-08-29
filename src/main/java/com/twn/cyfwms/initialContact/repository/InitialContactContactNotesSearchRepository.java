package com.twn.cyfwms.initialContact.repository;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesSearchCriteriaDto;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Repository
public class InitialContactContactNotesSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<InitialContactContactNotesSearchResultsDto> searchInitialContactsContactNotes(InitialContactContactNotesSearchCriteriaDto initialContactContactNotesSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(initialContactContactNotesSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new InitialContactContactNotesSearchResultsDto(
                                rs.getLong("contactnotesid"),
                                rs.getLong("filedetailsid"),
                                rs.getString("name"),
                                rs.getString("worker"),
                                rs.getDate("date")!=null?rs.getDate("date").toLocalDate(): LocalDate.of(1,1,1),
                                rs.getTime("time")!=null?rs.getTime("time").toLocalTime(): LocalTime.of(1,1,1),
                                rs.getString("contactMethod"),
                                rs.getString("needAddress"),
                                rs.getString("summary"),
                                rs.getString("result"),
                                rs.getString("nextstep"),
                                rs.getString("casePlanProgress"),
                                rs.getString("additionalInformation")
                        )
        );
    }
    private StringBuffer createSearchQuery(InitialContactContactNotesSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        String data=searchCriteria.getData();
            querySBuff.append("select p.contactnotesid ,p.filedetailsid, p.name ,p.worker ,p.date , p.time,p.contactmethod ,p.needaddress ,p.summary ,p.result ,p.nextstep ,p.caseplanprogress ,p.additionalinformation ");
            querySBuff.append("from initialcontactcontactnotes p left join initialcontactfiledetails p2 on p.filedetailsid = p2.filedetailsid where  p.status='ACTIVE'");
            if (data != null && !data.trim().isEmpty()) {
                data = data.trim()
                        .replace("!", "!!")
                        .replace("%", "!%")
                        .replace("_", "!_")
                        .replace("[", "![");
                querySBuff.append(" AND (p.name LIKE ?  OR p.worker LIKE ?  OR p.date LIKE ?  OR p.time LIKE ?  OR p.contactmethod LIKE ?  OR p.needaddress LIKE ?  OR p.summary LIKE ?  OR p.result LIKE ?  OR p.nextstep LIKE ?  OR p.caseplanprogress LIKE ? OR p.additionalinformation LIKE ? ) ");
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
        return querySBuff;
    }
}
