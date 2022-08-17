package com.twn.cyfwms.initialContact.repository;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesSearchCriteriaDto;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
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
                                rs.getLong("filedetailsid"),
                                rs.getString("name"),
                                rs.getString("worker"),
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
        querySBuff.append("select p.filedetailsid, p.name , p.worker,p.contactmethod ,p.needaddress ,p.summary ,p.result ,p.nextstep ,p.caseplanprogress ,p.additionalinformation ");
        querySBuff.append("from initialcontactcontactnotes p left join initialcontactfiledetails p2 on p.filedetailsid = p2.filedetailsid where 1=1");
        String name=searchCriteria.getName();
        if (name!=null && !name.trim().isEmpty()){
            name=name.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.name LIKE ?");
            argsObjectList.add(name + "%");
        }
        String worker=searchCriteria.getWorker();
        if (worker!=null && !worker.trim().isEmpty()){
            worker=worker.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.worker LIKE ?");
            argsObjectList.add(worker + "%");
        }
        String contactMethod=searchCriteria.getContactMethod();
        if (contactMethod!=null && !contactMethod.trim().isEmpty()){
            contactMethod=contactMethod.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.contactMethod LIKE ?");
            argsObjectList.add(contactMethod + "%");
        }
        String needAddress=searchCriteria.getNeedAddress();
        if (needAddress!=null && !needAddress.trim().isEmpty()){
            needAddress=needAddress.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.needAddress LIKE ?");
            argsObjectList.add(needAddress + "%");
        }
        String summary=searchCriteria.getSummary();
        if (summary!=null && !summary.trim().isEmpty()){
            summary=summary.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.summary LIKE ?");
            argsObjectList.add(summary + "%");
        }
        String result=searchCriteria.getResult();
        if (result!=null && !result.trim().isEmpty()){
            result=result.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.result LIKE ?");
            argsObjectList.add(result + "%");
        }
        String nextStep=searchCriteria.getNextStep();
        if (nextStep!=null && !nextStep.trim().isEmpty()){
            nextStep=nextStep.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.nextstep LIKE ?");
            argsObjectList.add(nextStep + "%");
        }
        String casePlanProgress=searchCriteria.getCasePlanProgress();
        if (casePlanProgress!=null && !casePlanProgress.trim().isEmpty()){
            casePlanProgress=casePlanProgress.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.casePlanProgress LIKE ?");
            argsObjectList.add(casePlanProgress + "%");
        }
        String additionalInformation=searchCriteria.getAdditionalInformation();
        if (additionalInformation!=null && !additionalInformation.trim().isEmpty()){
            additionalInformation=additionalInformation.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND p.additionalInformation LIKE ?");
            argsObjectList.add(additionalInformation + "%");
        }
        return querySBuff;
    }
}
