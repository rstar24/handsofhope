package com.twn.cyfwms.CulturalProgram.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.twn.cyfwms.CulturalProgram.entity.AttachmentEntity;

@Repository
public interface AttachmentsRepository extends JpaRepository<AttachmentEntity, Long> {
  Optional<AttachmentEntity> findById(Long CulturalProgImageId);

  @Query(value="select * from cpa_attachments c where c.culturalprogramid=? AND c.status='ACTIVE'", nativeQuery=true)
  Optional<AttachmentEntity> findByCulturalProgramId(Long id);

  @Query(value="select * from cpa_attachments c where c.culturalprogimageid=? AND c.status='ACTIVE'", nativeQuery=true)
  AttachmentEntity findByculturalProgImageId(Long culturalProgImageId);

  @Query(value="select * from cpa_attachments c where c.culturalprogramid=? AND c.status='ACTIVE' order by c.creationdatedime desc", nativeQuery=true)
  List<AttachmentEntity> findByculturalProgramId(Long culturalProgramId);
}
