package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.SearchCYFSClientDto;
import com.twn.cyfwms.participant.entity.Participant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class CYFSClientSearchSpecification {
    public static Specification<Participant> findByCriteria(final SearchCYFSClientDto searchCriteria) {

        return new Specification<Participant>() {

            @Override
            public Predicate toPredicate(
                    Root<Participant> root,
                    CriteriaQuery<?> query, CriteriaBuilder cb) {

                List<Predicate> predicates = new ArrayList<Predicate>();

                if (searchCriteria.getFirstname() != null && !searchCriteria.getFirstname().isEmpty()) {
                    predicates.add(cb.equal(root.get("firstname"), searchCriteria.getFirstname()));
                }
                if (searchCriteria.getMiddleName() != null && !searchCriteria.getMiddleName().isEmpty()) {
                    predicates.add(cb.equal(root.get("middlename"), searchCriteria.getMiddleName()));
                }
                if (searchCriteria.get() != null && !searchCriteria.getEpic().isEmpty()) {
                    predicates.add(cb.equal(root.get("epic"), searchCriteria.getEpic()));
                }
                if (searchCriteria.getPerformingGroup() != null && !searchCriteria.getPerformingGroup().isEmpty()) {
                    predicates.add(cb.equal(root.get("performingGroup"), searchCriteria.getPerformingGroup()));
                }
                if (searchCriteria.getPlannedStartDate() != null) {
                    System.out.println("searchCriteria.getPlannedStartDate():" + searchCriteria.getPlannedStartDate());
                    predicates.add(cb.greaterThanOrEqualTo(root.<Date>get("plndStartDate"), searchCriteria.getPlannedStartDate()));
                }
                if (searchCriteria.getPlannedCompletionDate() != null) {
                    predicates.add(cb.lessThanOrEqualTo(root.<Date>get("plndComplDate"), searchCriteria.getPlannedCompletionDate()));
                }
                if (searchCriteria.getTeam() != null && !searchCriteria.getTeam().isEmpty()) {
                    predicates.add(cb.equal(root.get("agileTeam"), searchCriteria.getTeam()));
                }

                return cb.and(predicates.toArray(new Predicate[] {}));
            }
        };
    }
}
