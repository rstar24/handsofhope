package org.cyfwms.common.repository;

import java.time.LocalDate;
import java.util.List;
import org.cyfwms.common.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
	List<Reminder> findByReminderDate(LocalDate date);
}
