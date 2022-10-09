interface Qualification {
  id?: string;
  name?: string;
  description?: string;
  qualifications?: MemberQualification[];
}

interface MemberQualification {
  id?: string;
  remarks?: string;
  startDate?: Date;
  stopDate?: Date;
  memberId?: string;
  qualificationId?: string;
  member?: Member;
  qualification?: Qualification;
}