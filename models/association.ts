type Association = {
  readonly id?: string;
  name?: string;
  description?: string;
  startDate?: Date;
  stopDate?: Date;
  groups?: Group[];
  groupTypes?: GroupType[];
  memberTypes?: MemberType[];
  memberships?: AssociationMembership[];
  preferences?: Preference[];
}

type AssociationMembership = {
  readonly id?: string;
  startDate?: Date;
  stopDate?: Date;
  associationId?: string;
  memberId?: string;
  memberTypeId?: string;
  association?: Association;
  memberType?: MemberType;
  member?: Member;
}

type MemberType = {
  readonly id?: string;
  name?: string;
  plural?: string;
  description?: string;
  associationId?: string;
  memberships?: AssociationMembership[];
  association?: Association;
}