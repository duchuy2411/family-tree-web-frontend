const CONSTANTS = {
  RELATIONSHIP: [
    {
      label: "Marriages",
      value: "marriage",
    },
    {
      label: "Father",
      value: "f",
    },
    {
      label: "Mother",
      value: "m",
    },
    {
      label: "Child",
      value: "child",
    },
  ],
  GENDER: [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ],
  FATHER: "father",
  MOTHER: "mother",
  SPOUSE: "spouse",
  CHILDREN: "children",
  MALE: "male",
  FEMALE: "female",
  TYPE: {
    DEAD: 'D',
    MALE: 'M',
    FEMALE: 'F',
    UNDEFINED: 'U',
  },
  MODE_FORM: {
    ADD: "add",
    UPDATE: "update",
  },
  DELETE: {
    NORMAL: 1, // case leaf
    SPOUSE: 2, // case delete spouse
    ALL_SPOUSES: 3, // case delete father or mother while node spouses is deleted
  },
  MOTHER_OF: (name) => `Mother of ${name}`,
  FATHER_OF: (name) => `Father of ${name}`,
  UNDEFINED: "Undefined",
  MARRIAGE: "Marriage",
  Error: {
    required: 'This field is required!',
    invalid: 'Data of this field is invalid!',
    dob: 'Day of Birth must be smaller than Day of Dead!'
  },
  DAY_OF_WEEK: {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
  },
  sourceDefaultImg: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg',
  LOOP_CALENDAR: {
    0: 'None',
    1: 'All day',
    2: 'Weekly',
    3: 'Monthly',
    4: 'Annual',
  }
};

export default CONSTANTS;
