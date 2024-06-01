package org.cyfwms.caregiver.entity;

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
@Table(name = "caregivercapacity")
public class Capacity implements Serializable {
	@Id
	@Getter
	@Setter
	@Column(name = "cgcapacityid", updatable = false, nullable = false)
	@SequenceGenerator(
		name = "cgCapacityIdIdGenerator",
		sequenceName = "cgCapacityIdIdGenerator",
		allocationSize = 100
	)
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "cgCapacityIdIdGenerator"
	)
	private Long cgCapacityId;

	@Getter
	@Setter
	@Column(name = "maximumcapacity")
	private Long maximumCap;

	@Getter
	@Setter
	@Column(name = "currentutilization")
	private Long currUtil;

	@Getter
	@Setter
	@Column(name = "currentutilization_details")
	private String currUtilDetails;

	@Getter
	@Setter
	@Column(name = "preferences")
	private String preferences;

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
	@Column(name = "cgproviderid")
	private Long cgProviderId;
}
