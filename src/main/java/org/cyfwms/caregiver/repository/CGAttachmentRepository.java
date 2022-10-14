package org.cyfwms.caregiver.repository;
import org.cyfwms.caregiver.entity.CGAttachmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CGAttachmentRepository extends JpaRepository<CGAttachmentEntity,Long> {
    @Query(value="select * from cg_attachments c where c.cgimageid=? AND c.status='ACTIVE'", nativeQuery=true)
    CGAttachmentEntity findByCgImageId(Long cgImageId);
    @Query(value = "select * from cg_attachments c1 left join caregiverprovider c on c1.cgproviderid = c.cgproviderid where c1.status ='ACTIVE' AND c.cgproviderid=? ",nativeQuery = true)
    List<CGAttachmentEntity> findByCaregiverProviderId(Long careGiverProviderId);
}
