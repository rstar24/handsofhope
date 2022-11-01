package org.cyfwms.initialcontact.repository;

import org.cyfwms.caregiver.dto.CareGiverSearchReminderDto;
import org.cyfwms.caregiver.dto.CareGiverSearchReminderResultDto;
import org.cyfwms.initialcontact.dto.ICSearchReminderDto;
import org.cyfwms.initialcontact.dto.ICSearchReminderResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ICSearchReminderRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<ICSearchReminderResultDto> searchICReminder(ICSearchReminderDto iCSearchReminderDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(iCSearchReminderDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(), argsObjectList.toArray(),
                (rs, rowNum) ->
                        new ICSearchReminderResultDto(
                                rs.getLong("reminderid"),
                                rs.getLong("icreminderid"),
                                rs.getString("assignedTo"),
                                rs.getString("regarding"),
                                rs.getString("subject"),
                                rs.getString("frequency"),
                                rs.getString("status"),
                                rs.getString("description"),
                                rs.getDate("reminderDate") != null ? rs.getDate("reminderDate").toLocalDate() : LocalDate.of(1, 1, 1),
                                rs.getDate("endDate") != null ? rs.getDate("endDate").toLocalDate() : LocalDate.of(1, 1, 1)
                        )
        );
    }

    private StringBuffer createSearchQuery(ICSearchReminderDto iCSearchReminderDto, List<Object> argsObjectList) {
        StringBuffer querySBuff = new StringBuffer();
        String data = iCSearchReminderDto.getData();
        Long fileDetailsId = iCSearchReminderDto.getFileDetailsId();

        querySBuff.append("select p.reminderid ,p2.icreminderid,p.subject,p.assignedto ,p.status ,p.reminderdate,p.enddate,p.regarding ,p.frequency,p.description  ");
        querySBuff.append("from reminder p left join initialcontactreminder p2 on p.reminderid = p2.reminderid where  p2.statusofdeletion='ACTIVE' ");

        if (fileDetailsId != null) {
            querySBuff.append(" AND p2.filedetailsid = ?");
            argsObjectList.add(fileDetailsId);
        }


        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");

            querySBuff.append(" AND (p2.filedetailsid=? OR p.subject LIKE ?  OR p.reminderdate LIKE ?  OR p.enddate LIKE ?    OR p.subject LIKE ?  OR p.frequency LIKE ? OR p.status LIKE ? OR p.description LIKE ? OR p.assignedto LIKE ? ) ORDER BY p2.creationdatetime desc ");
            argsObjectList.add(data);
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");
            argsObjectList.add("%" + data + "%");


        } else {
            querySBuff.append(" AND p2.filedetailsid = ? ORDER BY p2.creationdatetime desc ");
            argsObjectList.add(fileDetailsId);
        }
        return querySBuff;
    }

}
