interface Association {
  readonly id?: string;
  name?: string;
  description?: string;
  startDate?: Date;
  stopDate?: Date;
  groups?: Group[];
  groupTypes?: GroupType[];
  groupSubtypes?: GroupSubtype[];
  memberTypes?: MemberType[];
  memberships?: AssociationMembership[];
  preferences?: Preference[];
}

interface AssociationMembership {
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

interface MemberType {
  readonly id?: string;
  name?: string;
  plural?: string;
  description?: string;
  associationId?: string;
  memberships?: AssociationMembership[];
  association?: Association;
}