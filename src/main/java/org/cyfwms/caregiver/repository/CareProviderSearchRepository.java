package org.cyfwms.caregiver.repository;

import org.cyfwms.caregiver.dto.CareProviderSearchCriteriaDto;
import org.cyfwms.caregiver.dto.CareProviderSearchResultsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CareProviderSearchRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<CareProviderSearchResultsDto> searchCareGiver(CareProviderSearchCriteriaDto careGiverSearchCriteriaDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(careGiverSearchCriteriaDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(),argsObjectList.toArray(),
                (rs, rowNum) ->
                        new CareProviderSearchResultsDto(
                                rs.getLong("id"),
                                rs.getLong("reference_id"),
                                rs.getString("name"),
                                rs.getString("type"),
                                rs.getString("primary_caregiver"),
                                rs.getString("secondary_caregiver"),
                                rs.getString("status")

                        )
        );
    }

    private StringBuffer createSearchQuery(CareProviderSearchCriteriaDto searchCriteria, List<Object> argsObjectList) {
        StringBuffer querySBuff = new StringBuffer();
        querySBuff.append("select c.id ,c.reference_id ,c.name ,c.type ,c.primary_caregiver, c.secondary_caregiver ,c.status ");
        querySBuff.append("from cg_care_provider c where c.deletion_status='ACTIVE'");

        Long referenceId = searchCriteria.getReferenceId();
        if (referenceId != null) {
            querySBuff.append(" AND c.reference_id = ?");
            argsObjectList.add(referenceId);
        }
        String name = searchCriteria.getName();
        if (name != null && !name.trim().isEmpty()) {
            name = name.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND c.name LIKE ?");
            argsObjectList.add(name + "%");
        }

        String type = searchCriteria.getType();
        if (type != null && !type.trim().isEmpty()) {
            type = type.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND c.type LIKE ?");
            argsObjectList.add(type + "%");
        }

        String priCaregiver = searchCriteria.getPriCaregiver();
        if (priCaregiver != null && !priCaregiver.trim().isEmpty()) {
            priCaregiver = priCaregiver.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND c.primary_caregiver LIKE ?");
            argsObjectList.add(priCaregiver + "%");
        }

        String secCaregiver = searchCriteria.getSecCaregiver();
        if (secCaregiver != null && !secCaregiver.trim().isEmpty()) {
            secCaregiver = secCaregiver.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND c.secondary_caregiver LIKE ?");
            argsObjectList.add(secCaregiver + "%");
        }


        String status = searchCriteria.getStatus();
        if (status != null && !status.trim().isEmpty()) {
            status = status.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");
            querySBuff.append(" AND c.status=?");
            argsObjectList.add(status);
        }
        return querySBuff;
    }
}
