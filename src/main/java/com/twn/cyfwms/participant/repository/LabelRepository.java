package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.Label;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends JpaRepository<Label, Long> {
  List<Label> findAllByPageOrderByIdAsc(String page);
}
