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
                                rs.getString("fullName"),
                                rs.getLong("filenumber"),
                                rs.getString("caseworker"),
                                rs.getDate("startingDate")!=null?rs.getDate("startingDate").toLocalDate(): LocalDate.of(1,1,1),
                                rs.getString("status")
                        )
                );
    }

    private StringBuffer createSearchQuery(InitialContactSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer  querySBuff = new StringBuffer();
        querySBuff.append("select p.filedetailsid, CONCAT(firstname,' ', surname) AS fullName, p.fileNumber,p.caseworker,p.startingDate,p.status ");
        querySBuff.append("from initialcontactfiledetails p left join participant p2 on p.clientname = p2.participantid where p.statusofdeletion='ACTIVE'");
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
        return querySBuff;
    }
}
