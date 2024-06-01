package org.cyfwms.initialcontact.repository;

import java.util.List;
import org.cyfwms.initialcontact.entity.ICReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICReminderRepository extends JpaRepository<ICReminder, Long> {
	@Query(
		value = "select * from initialcontactreminder where fileDetailsId=? AND statusofdeletion='active'",
		nativeQuery = true
	)
	List<ICReminder> findByFileDetailsId(Long fileDetailsId);
}
