interface Group {
  readonly id?: string;
  name?: string;
  description?: string;
  email?: string;
  isActive?: boolean;
  startDate?: Date;
  lastActive?: Date;
  associationId?: string;
  groupTypeId?: string;
  editions?: GroupEdition[];
  members?: GroupMembership[];
  socials?: Social[];
  association?: Association;
  type?: GroupType;
}

interface GroupEdition {
  readonly id?: string;
  name?: string;
  description?: string;
  isActive?: boolean;
  groupId?: string;
  memberships?: GroupMembership[];
  group?: Group;
}

interface GroupMembership {
  readonly id?: string;
  function?: string;
  startDate?: Date;
  stopDate?: Date;
  memberId?: string;
  groupId?: string;
  editionId?: string;
  member?: Member;
  group?: Group;
  edition?: GroupEdition;
}

interface GroupType {
  readonly id?: string;
  name?: string;
  plural?: string;
  description?: string;
  associationId?: string;
  groups?: Group[];
  association?: Association;
}
