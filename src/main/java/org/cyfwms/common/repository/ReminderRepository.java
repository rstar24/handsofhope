package org.cyfwms.common.repository;

import org.cyfwms.common.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepository extends JpaRepository<Reminder,Long> {
}
