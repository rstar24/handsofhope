package org.cyfwms.caregiver.repository;

import org.cyfwms.caregiver.dto.CareGiverSearchReminderDto;
import org.cyfwms.caregiver.dto.CareGiverSearchReminderResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CareGiverSearchReminderRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<CareGiverSearchReminderResultDto> searchCGReminder(CareGiverSearchReminderDto careGiverSearchAppointmentDto) {
        List<Object> argsObjectList = new ArrayList<>();
        StringBuffer querySBuff = createSearchQuery(careGiverSearchAppointmentDto, argsObjectList);
        return jdbcTemplate.query(querySBuff.toString(), argsObjectList.toArray(),
                (rs, rowNum) ->
                        new CareGiverSearchReminderResultDto(
                                rs.getLong("reminderid"),
                                rs.getLong("cgreminderid"),
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

    private StringBuffer createSearchQuery(CareGiverSearchReminderDto cgAppointmentSearchDto, List<Object> argsObjectList) {
        StringBuffer querySBuff = new StringBuffer();
        String data = cgAppointmentSearchDto.getData();
        Long cgProviderId = cgAppointmentSearchDto.getCgProviderId();

        querySBuff.append("select p.reminderid ,p2.cgreminderid,p.subject,p.assignedto ,p.status ,p.reminderdate,p.enddate,p.regarding ,p.frequency,p.description  ");
        querySBuff.append("from reminder p left join caregiverreminder p2 on p.reminderid = p2.reminderid where  p2.statusofdeletion='ACTIVE' ");

        if (cgProviderId != null) {
            querySBuff.append(" AND p2.cgproviderid = ?");
            argsObjectList.add(cgProviderId);
        }


        if (data != null && !data.trim().isEmpty()) {
            data = data.trim()
                    .replace("!", "!!")
                    .replace("%", "!%")
                    .replace("_", "!_")
                    .replace("[", "![");

            querySBuff.append(" AND (p2.cgproviderid=? OR p.subject LIKE ?  OR p.reminderdate LIKE ?  OR p.enddate LIKE ?    OR p.subject LIKE ?  OR p.frequency LIKE ? OR p.status LIKE ? OR p.description LIKE ? OR p.assignedto LIKE ? ) ORDER BY p2.creationdatetime desc ");
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
            querySBuff.append(" AND p2.cgproviderid = ? ORDER BY p2.creationdatetime desc ");
            argsObjectList.add(cgProviderId);
        }
        return querySBuff;
    }
}
