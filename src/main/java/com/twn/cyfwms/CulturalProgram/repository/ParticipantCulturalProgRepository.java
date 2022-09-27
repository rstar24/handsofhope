package com.twn.cyfwms.CulturalProgram.repository;
import com.twn.cyfwms.CulturalProgram.entity.ParticipantCulturalProgAndAct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ParticipantCulturalProgRepository extends JpaRepository<ParticipantCulturalProgAndAct,Long> {
    @Query(value = "select * from participantculturalprogram  where participantculturalprogid=? AND status='ACTIVE'",nativeQuery = true)
    ParticipantCulturalProgAndAct findByparticipantCulturalProId(Long participantCulturalProId);
    @Query(value = "select * from participantculturalprogram p left join culturalprogandact c on p.culturalprogramid = c.culturalprogramid where p.status ='ACTIVE' AND c.culturalprogramid=? ",nativeQuery = true)
     List<ParticipantCulturalProgAndAct> findByCulturalProgramId(Long culturalProgramId);
}
