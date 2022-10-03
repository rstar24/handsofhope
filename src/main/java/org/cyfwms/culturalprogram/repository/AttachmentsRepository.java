package org.cyfwms.culturalprogram.repository;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.cyfwms.culturalprogram.entity.AttachmentEntity;

@Repository
public interface AttachmentsRepository extends JpaRepository<AttachmentEntity, Long> {

  @Query(value="select * from cpa_attachments c where c.culturalprogimageid=? AND c.status='ACTIVE'", nativeQuery=true)
  AttachmentEntity findByculturalProgImageId(Long culturalProgImageId);

  @Query(value = "select * from cpa_attachments c1 left join culturalprogandact c on c1.culturalprogramid = c.culturalprogramid where c1.status ='ACTIVE' AND c.culturalprogramid=? ",nativeQuery = true)
  List<AttachmentEntity> findByCulturalProgramId(Long culturalProgramId);
}
