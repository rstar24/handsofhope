package org.cyfwms.initialcontact.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;
import org.cyfwms.common.entity.Reminder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "initialcontactreminder")
public class ICReminder implements Serializable {
	@Id
	@Getter
	@Setter
	@Column(name = "icreminderid", updatable = false, nullable = false)
	@SequenceGenerator(
		name = "icreminderIdGenerator",
		sequenceName = "icreminderIdGenerator",
		allocationSize = 100
	)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "icreminderIdGenerator")
	private Long icReminderId;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "reminderid", referencedColumnName = "reminderid")
	private Reminder reminder;

	@CreationTimestamp
	@Getter
	@Setter
	@Column(name = "creationdatetime")
	private LocalDateTime creationDateTime;

	@UpdateTimestamp
	@Getter
	@Setter
	@Column(name = "lastwritten")
	private LocalDateTime lastWritten;

	@Getter
	@Setter
	@Column(name = "statusofdeletion")
	private String statusOfDeletion;

	@Getter
	@Setter
	@Column(name = "file_number")
	private Long fileNumber;

	@Column(name = "filedetailsid")
	@Getter
	@Setter
	private Long fileDetailsId;
}
