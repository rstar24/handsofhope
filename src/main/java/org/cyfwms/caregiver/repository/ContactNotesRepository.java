package org.cyfwms.caregiver.repository;
import org.cyfwms.caregiver.entity.ContactNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ContactNotesRepository extends JpaRepository<ContactNotes,Long> {
    @Query(value = "select * from caregivercontactnotes where cgProviderId=? AND status='ACTIVE'",nativeQuery = true)
    List<ContactNotes> findByCgProviderId(Long cgProviderId);
}
