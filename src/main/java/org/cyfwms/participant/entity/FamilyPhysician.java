package org.cyfwms.participant.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "familyphysician")
public class FamilyPhysician implements Serializable {
	@Id
	@Column(name = "familyPhysicianid", updatable = false, nullable = false)
	@Getter
	@Setter
	@SequenceGenerator(
		name = "familyPhysicianidGenerator",
		sequenceName = "familyPhysicianidGenerator",
		allocationSize = 100
	)
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "familyPhysicianidGenerator"
	)
	private Long familyPhysicianId;

	@Getter
	@Setter
	@Column(name = "name")
	private String name;

	@Getter
	@Setter
	@Column(name = "phone")
	private String phone;

	@Getter
	@Setter
	@Column(name = "cell")
	private String cell;

	@Getter
	@Setter
	@Column(name = "listofmedication")
	private String listOfMedication;

	@Getter
	@Setter
	@Column(name = "status")
	private String status;

	@CreationTimestamp
	@Getter
	@Setter
	@Column(name = "creationdate")
	private LocalDate creationDate;

	@UpdateTimestamp
	@Getter
	@Setter
	@Column(name = "lastwritten")
	private LocalDateTime lastwritten;

	@Getter
	@Setter
	@Column(name = "participantid")
	private Long participantId;
}
