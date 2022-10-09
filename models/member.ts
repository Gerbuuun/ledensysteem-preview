interface Member {
  readonly id?: string;
  title?: string;
  initials?: string;
  firstName?: string;
  insertion?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  iban?: string;
  address?: string;
  number?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  gender?: "Male"|"Female";
  birthday?: Date;
  associations?: AssociationMembership[];
  contacts?: Contact[];
  groups?: Group[];
  preferences?: MemberPreference[];
  qualifications?: MemberQualification[];
  studies?: MemberStudy[];
  socials?: Social[];
}

interface Contact {
  id?: string;
  contactName?: string;
  connection?: string;
  phoneNumber?: string;
  email?: string;
  memberId?: string;
  member?: Member;
}