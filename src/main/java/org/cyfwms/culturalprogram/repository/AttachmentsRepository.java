package org.cyfwms.culturalprogram.repository;

import java.util.List;
import org.cyfwms.culturalprogram.entity.AttachmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachmentsRepository extends JpaRepository<AttachmentEntity, Long> {
	@Query(
		value = "select * from cpa_attachments c1 left join culturalprogandact c on c1.culturalprogramid = c.culturalprogramid where c1.status ='ACTIVE' AND c.culturalprogramid=? ",
		nativeQuery = true
	)
	List<AttachmentEntity> findByCulturalProgramId(Long culturalProgramId);
}
