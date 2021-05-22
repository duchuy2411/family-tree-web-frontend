const CONSTAINT = {
  RELATIONSHIP: [
    {
      label: 'Marriages',
      value: 'marriage'
    },
    {
      label: 'Father',
      value: 'f'
    },
    {
      label: 'Mother',
      value: 'm'
    },
    {
      label: 'Child',
      value: 'child'
    }
  ],
  GENDER: [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    }
  ],
  FATHER: 'father',
  MOTHER: 'mother',
  SPOUSE: 'spouse',
  CHILDREN: 'children',
  MALE: 'male',
  FEMALE: 'female',
  TYPE: {
    DEAD: 'D',
    MALE: 'M',
    FEMALE: 'F',
  },
  MODE_FORM: {
    ADD: 'add',
    UPDATE: 'update',
  },
  DELETE: {
    NORMAL: 1, // case leaf
    SPOUSE: 2, // case delete spouse
    ALL_SPOUSES: 3, // case delete father or mother while node spouses is deleted
  },
  MOTHER_OF: (name) => `Mother of ${name}`,
  FATHER_OF: (name) => `Father of ${name}`,
  UNDEFINED: 'Undefined',
  MARRIAGE: 'Marriage',
};

export default CONSTAINT;