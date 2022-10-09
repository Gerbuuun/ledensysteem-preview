interface Study {
  id?: string;
  name?: string;
  level?: string;
  institution?: string;
  memberStudies?: MemberStudy[];
}

interface MemberStudy {
  id?: string;
  studyNumber?: string;
  startDate?: Date;
  stopDate?: Date;
  memberId?: string;
  studyId?: string;
  member?: Member;
  study?: Study;
}