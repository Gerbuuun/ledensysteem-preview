interface Preference {
  id?: string;
  name?: string;
  description?: string;
  associationId?: string;
  association?: Association;
}

interface MemberPreference {
  id?: string;
  value?: string;
  memberId?: string;
  preferenceId?: string;
  member?: Member;
  preference?: Preference;
}