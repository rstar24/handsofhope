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
            querySBuff.append("select p.contactnotesid ,p.filedetailsid, p.name ,p.worker ,p.date , p.time,p.contactmethod ,p.needaddress ,p.summary ,p.result ,p.nextstep ,p.caseplanprogress ,p.additionalinformation ");
            querySBuff.append("from initialcontactcontactnotes p left join initialcontactfiledetails p2 on p.filedetailsid = p2.filedetailsid where  p.status='ACTIVE' ");
        Long fileDetailsId = searchCriteria.getFileDetailsId();
        if (fileDetailsId != null) {
            querySBuff.append("AND p.filedetailsid = ? ORDER BY p.creationdatetime desc ");
            argsObjectList.add(fileDetailsId);
        }
        String name = searchCriteria.getName();
        if (name != null && !name.trim().isEmpty()) {
            name = name.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.name LIKE ? ORDER BY p.creationdatetime desc ");
            argsObjectList.add(name + "%");
        }
        String worker = searchCriteria.getWorker();
        if (worker != null && !worker.trim().isEmpty()) {
            worker = worker.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.worker LIKE ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(worker + "%");
        }
        LocalDate date = searchCriteria.getDate();
        if (date != null) {
            querySBuff.append(" AND p.date = ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(date);
        }
        LocalTime time = searchCriteria.getTime();
        if (time != null) {
            querySBuff.append(" AND p.time = ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(time);
        }
        String contactMethod = searchCriteria.getContactMethod();
        if (contactMethod != null && !contactMethod.trim().isEmpty()) {
            contactMethod = contactMethod.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.contactmethod LIKE ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(contactMethod + "%");
        }
        String needAddress = searchCriteria.getNeedAddress();
        if (needAddress != null && !needAddress.trim().isEmpty()) {
            needAddress = needAddress.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.needaddress LIKE ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(needAddress + "%");
        }
        String summary = searchCriteria.getSummary();
        if (summary != null && !summary.trim().isEmpty()) {
            summary = summary.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.summary LIKE ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(summary + "%");
        }
        String result = searchCriteria.getResult();
        if (result != null && !result.trim().isEmpty()) {
            result = result.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.result LIKE ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(result + "%");
        }
        String nextStep = searchCriteria.getNextStep();
        if (nextStep != null && !nextStep.trim().isEmpty()) {
            nextStep = nextStep.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.nextstep LIKE ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(nextStep + "%");
        }
        String casePlanProgress = searchCriteria.getCasePlanProgress();
        if (casePlanProgress != null && !casePlanProgress.trim().isEmpty()) {
            casePlanProgress = casePlanProgress.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.caseplanprogress LIKE ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(casePlanProgress + "%");
        }
        String additionalInformation = searchCriteria.getAdditionalInformation();
        if (additionalInformation != null && !additionalInformation.trim().isEmpty()) {
            additionalInformation = additionalInformation.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.additionalinformation LIKE ? ORDER BY p.creationdatetime desc");
            argsObjectList.add(additionalInformation + "%");
        }
        return querySBuff;
    }
}
