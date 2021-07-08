import axiosClient from "api";

const treeManagementAPI = {
  getAllPublicTreesWithPagination: ({ createBefore, page, itemsPerPage }) => {
    const url = "/tree-management/trees/using-pagination";

    return axiosClient.get(url, {
      params: {
        CreatedBefore: createBefore,
        Page: page,
        ItemsPerPage: itemsPerPage,
      },
    });
  },

  getAllPrivateTreesWithPagination: ({ createBefore, page, itemsPerPage }) => {
    const url = "/tree-management/trees/list/using-pagination";

    return axiosClient.get(url, {
      params: {
        CreatedBefore: createBefore,
        Page: page,
        ItemsPerPage: itemsPerPage,
      },
    });
  },

  getTreesFromKeywordWithPagination: ({ query, createBefore, page, itemsPerPage }) => {
    const url = "/tree-management/trees-from-keyword/using-pagination";

    return axiosClient.get(url, {
      params: {
        q: query,
        CreatedBefore: createBefore,
        Page: page,
        ItemsPerPage: itemsPerPage,
      },
    });
  },
};

export default treeManagementAPI;
