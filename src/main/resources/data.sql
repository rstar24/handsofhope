-- CYFMS view page label data:
-- -- Register label:
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('1', 'register', 'referenceId', 'Reference ID') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('2', 'register', 'firstname', 'First Name') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('3', 'register', 'middleName', 'Middle Name') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('4', 'register', 'surname', 'Last Name') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('5', 'register', 'dateOfBirth', 'Date of Birth') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('6', 'register', 'gender', 'Gender') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('7', 'register', 'maritalStatus', 'Marital Status') ON DUPLICATE KEY UPDATE id = id;
-- -- Contact label:
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('8', 'contact', 'addressLine1', 'Address Line 1') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('9', 'contact', 'addressLine2', 'Address Line 2') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('10', 'contact', 'city', 'City') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('11', 'contact', 'province', 'Province') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('12', 'contact', 'postalCode', 'Postal Code') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('13', 'contact', 'homePhone', 'Home Phone') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('14', 'contact', 'workPhone', 'Work Phone') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('15', 'contact', 'cellPhone', 'Cell Phone') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('16', 'contact', 'emailAddress', 'Email Address') ON DUPLICATE KEY UPDATE id = id;
-- -- Household Members label:
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('17', 'householdMembers', 'name', 'Name') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('18', 'householdMembers', 'gender', 'Gender') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('19', 'householdMembers', 'dateOfBirth', 'Date of Birth') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('20', 'householdMembers', 'relationship', 'Relationship') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('21', 'householdMembers', 'residing', 'Residing') ON DUPLICATE KEY UPDATE id = id;
-- -- Education and Employment label:
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('22', 'educationAndEmployment', 'attendingSchool', 'Attending School') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('23', 'educationAndEmployment', 'school', 'School') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('24', 'educationAndEmployment', 'grade', 'Grade') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('25', 'educationAndEmployment', 'employed', 'Employed') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('26', 'educationAndEmployment', 'typeOfEmployment', 'Type of Employment') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('27', 'educationAndEmployment', 'desiredProfession', 'Desired Profession') ON DUPLICATE KEY UPDATE id = id;
-- -- Criminal History label:
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('28', 'criminalHistoryRecord', 'charges', 'Charges') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('29', 'criminalHistoryRecord', 'arrestDate', 'Arrest Date') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('30', 'criminalHistoryRecord', 'conviction', 'Conviction') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('31', 'criminalHistoryRecord', 'sentence', 'Sentence') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('32', 'criminalHistory', 'probation', 'Probation') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('33', 'criminalHistory', 'parole', 'Parole') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('34', 'criminalHistory', 'conditions', 'Conditions') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('35', 'criminalHistory', 'courtWorkerAndContactInfo', 'Court Worker(s) and Contact Information') ON DUPLICATE KEY UPDATE id = id;
-- -- Family Physicians label:
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('36', 'familyPhysicians', 'name', 'Name') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('37', 'familyPhysicians', 'phone', 'Phone') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('38', 'familyPhysicians', 'cell', 'Cell') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('39', 'familyPhysicians', 'listOfMedication', 'List of Medication') ON DUPLICATE KEY UPDATE id = id;
-- -- Counselor(s) / CFS Worker(s) label:
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('40', 'counselors', 'role', 'Role') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('41', 'counselors', 'name', 'Name') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('42', 'counselors', 'startDate', 'Start Date') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('43', 'counselors', 'endDate', 'End Date') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('44', 'counselors', 'contactInformation', 'Contact Information') ON DUPLICATE KEY UPDATE id = id;
-- -- Other Information:
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('46', 'otherInformation', 'weakness', 'Weakness') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('47', 'otherInformation', 'skills', 'Skills') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('48', 'otherInformation', 'experiences', 'Experiences') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('45', 'otherInformation', 'strength', 'Strength') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO `cyfmsLabels` (`id`, `page`, `tag`, `value`) VALUES ('49', 'otherInformation', 'effectiveCopingSkills', 'Effective Coping Skills') ON DUPLICATE KEY UPDATE id = id;

-- Initial Contact view page label data:
-- -- File Details label:
-- -- Referral Informtion label:
-- -- Incident Report label:
-- -- Present Concerns label:
-- -- Patient Care Information label:
