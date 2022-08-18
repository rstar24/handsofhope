package com.twn.cyfwms.initialContact.repository;

import com.twn.cyfwms.initialContact.dto.InitialContactSearchCriteriaDto;
import com.twn.cyfwms.initialContact.dto.InitialContactSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Repository
public class InitialContactSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<InitialContactSearchResultsDto> searchInitialContacts(InitialContactSearchCriteriaDto initialContactSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(initialContactSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new InitialContactSearchResultsDto(
                                rs.getLong("filedetailsid"),
                                rs.getString("clientname"),
                                rs.getLong("filenumber"),
                                 rs.getString("caseworker"),
                                rs.getDate("startingDate")!=null?rs.getDate("startingDate").toLocalDate(): LocalDate.of(1,1,1),
                                rs.getString("status"),
                             rs.getString("typeofpatient")

                        )
                );
    }

    private StringBuffer createSearchQuery(InitialContactSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        querySBuff.append("select p.filedetailsid, p.clientname, p.fileNumber,p.caseworker,p.startingDate,p.status ,p2.typeofpatient ");
        querySBuff.append("from initialcontactfiledetails p left join initialcontactpatientcareinfo p2 on p.filedetailsid = p2.filedetailsid where 1=1");
            String clientName=searchCriteria.getClientName();
            if (clientName!=null && !clientName.trim().isEmpty()){
                clientName=clientName.trim()
                        .replace("!", "!!")
                        .replace("%", "!%")
                        .replace("_", "!_")
                        .replace("[", "![");
                        querySBuff.append(" AND p.clientname LIKE ?");
                argsObjectList.add(clientName + "%");
            }
            Long fileNumber = searchCriteria.getFileNumber();
            if (fileNumber != null) {
                querySBuff.append(" AND p.fileNumber = ?");
                argsObjectList.add(fileNumber);
            }
            String caseworker= searchCriteria.getCaseworker();
            if (caseworker!=null && !caseworker.trim().isEmpty()){
                caseworker=caseworker.trim()
                        .replace("!", "!!")
                        .replace("%", "!%")
                        .replace("_", "!_")
                        .replace("[", "![");
                querySBuff.append(" AND p.caseworker LIKE ?");
                argsObjectList.add(caseworker + "%");
            }
            LocalDate startingDate = searchCriteria.getStartingDate();
            if (startingDate != null) {
                querySBuff.append(" AND p.startingDate = ?");
                argsObjectList.add(startingDate);
            }
            String status=searchCriteria.getStatus();
            if (status!=null && !status.trim().isEmpty()){
                status=status.trim()
                        .replace("!", "!!")
                        .replace("%", "!%")
                        .replace("_", "!_")
                        .replace("[", "![");
                querySBuff.append(" AND p.status LIKE ?");
                argsObjectList.add(status + "%");

            }

          String typeOfPatient=searchCriteria.getTypeOfPatient();
          if (typeOfPatient!=null && !typeOfPatient.trim().isEmpty()){
              typeOfPatient=typeOfPatient.trim()
                      .replace("!", "!!")
                      .replace("%", "!%")
                      .replace("_", "!_")
                      .replace("[", "![");
              querySBuff.append(" AND p2.typeofpatient LIKE ?");
              argsObjectList.add(typeOfPatient + "%");

          }
        return querySBuff;
    }
}
