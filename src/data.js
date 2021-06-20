/**
 * Sample data for demo version
 */

const data = {
  redux: {
    name: "Bắp",
  },
  familyTreeList: [
    {
      familyName: "Family Grand Nathan",
      imgSrc: "../../assets/img/face/marc.jpg",
      updatedAt: new Date(Date.now()).toLocaleString(),
      author: "Ngô Bỏng Bắp",
      contributors: [
        // owner - người tạo ra cây, sẽ là contributor đầu tiên
        {
          id: 1,
          name: "Contributor One",
          avatarUrl: "https://i.pravatar.cc/150?u=1",
        },
        {
          id: 2,
          name: "Contributor Two",
          avatarUrl: "https://i.pravatar.cc/150?u=2",
        },
        {
          id: 3,
          name: "Contributor Three",
          avatarUrl: "https://i.pravatar.cc/150?u=3",
        },
        {
          id: 4,
          name: "Contributor Four",
          avatarUrl: "https://i.pravatar.cc/150?u=4",
        },
        {
          id: 5,
          name: "Contributor Five",
          avatarUrl: "https://i.pravatar.cc/150?u=5",
        },
      ],
    },
    {
      familyName: "Family 02",
      imgSrc: "./not-found",
      updatedAt: new Date(Date.now()).toLocaleString(),
      author: "Ngô Bỏng Bắp",
      contributors: [
        {
          id: 6,
          name: "Contributor Six",
          avatarUrl: "https://i.pravatar.cc/150?u=6",
        },
        {
          id: 7,
          name: "Contributor Seven",
          avatarUrl: "https://i.pravatar.cc/150?u=7",
        },
        {
          id: 8,
          name: "Contributor Eight",
          avatarUrl: "https://i.pravatar.cc/150?u=8",
        },
      ],
    },
    {
      familyName: "Family 03",
      imgSrc: "./not-found",
      updatedAt: new Date(Date.now()).toLocaleString(),
      author: "Ngô Bỏng Bắp",
      contributors: [
        {
          id: 9,
          name: "Contributor Nine",
          avatarUrl: "https://i.pravatar.cc/150?u=9",
        },
        {
          id: 10,
          name: "Contributor Ten",
          avatarUrl: "https://i.pravatar.cc/150?u=10",
        },
      ],
    },
  ],
  memberInfoSample: {
    avatarUrl: "https://avatarfiles.alphacoders.com/235/thumb-235557.png",
    name: "Elon Musk",
    birth: "29/03/1978",
    dead: "",
    sex: "Male",
    relationship: "Uncle",
  },
  family01: [
    {
      id: 1,
      name: "Lucy",
      gender: "Female",
    },
    {
      id: 2,
      name: "Matt",
      gender: "Male",
    },
    {
      id: 3,
      name: "Alex",
      gender: "Male",
    },
    {
      id: 4,
      name: "Wayne",
      gender: "Male",
    },
  ],
};

export default data;
