import _ from "lodash";
import api from "../../utils/api";
import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";

// const API = api.baseUrl;

export const slice = createSlice({
  name: "customTree",
  initialState: {
    calendar: [],
    isUpdating: false,
    viewImage: { isShow: false, current: 0 },
    arrImages: [],
    arrMemory: [],
    isFetchingMemory: false,
    isCreating: false,
  },
  reducers: {
    UPDATE_CALENDAR: (state) => {
      return { ...state, isUpdating: true };
    },
    UPDATE_CALENDAR_SUCCESS: (state, action) => {
      return { ...state, isUpdating: false, calendar: action.payload };
    },
    UPDATE_CALENDAR_FAIL: (state) => {
      return { ...state, isUpdating: false };
    },
    CREATE_CALENDAR: (state) => {
      return { ...state, isUpdating: true };
    },
    CREATE_CALENDAR_SUCCESS: (state, action) => {
      return { ...state, isUpdating: false, calendar: action.payload };
    },
    CREATE_CALENDAR_FAIL: (state) => {
      return { ...state, isUpdating: false };
    },
    DELETE_CALENDAR: (state, action) => {
      return { ...state, calendar: action.payload };
    },
    SHOW_VIEW_IMAGE: (state, action) => {
      return { ...state, viewImage: { ...state.viewImage, isShow: true, current: action.payload } };
    },
    NEXT_IMAGE: (state) => {
      return { ...state, viewImage: { ...state.viewImage, current: state.viewImage.current + 1 } };
    },
    PREV_IMAGE: (state) => {
      return { ...state, viewImage: { ...state.viewImage, current: state.viewImage.current - 1 } };
    },
    HIDE_VIEW_IMAGE: (state) => {
      return { ...state, viewImage: { ...state.viewImage, isShow: false } };
    },
    SET_ARR_IMAGES: (state, action) => {
      return { ...state, arrImages: [...action.payload] };
    },
    FETCH_MEMORY: (state) => {
      return { ...state, isFetchingMemory: true };
    },
    FETCH_MEMORY_SUCCESS: (state, action) => {
      return { ...state, isFetchingMemory: false, arrMemory: action.payload };
    },
    FETCH_MEMORY_FAIL: (state) => {
      return { ...state, isFetchingMemory: false };
    },
    CREATE_MEMORY: (state) => {
      return { ...state, isCreating: true };
    },
    CREATE_MEMORY_SUCCESS: (state, action) => {
      return { ...state, isCreating: false, arrMemory: [action.payload, ...state.arrMemory] };
    },
    CREATE_MEMORY_FAIL: (state) => {
      return { ...state, isCreating: false };
    },
    DELETE_MEMORY_SUCCESS: (state, action) => {
      return { ...state, arrMemory: _.filter(state.arrMemory, (ele) => ele.id !== action.payload) };
    },
    CREATING_SPINNER: (state) => {
      return { ...state, isCreating: true };
    },
  },
});

export const {
  SHOW_VIEW_IMAGE,
  HIDE_VIEW_IMAGE,
  SET_ARR_IMAGES,
  FETCH_MEMORY,
  FETCH_MEMORY_SUCCESS,
  FETCH_MEMORY_FAIL,
  CREATE_MEMORY,
  CREATE_MEMORY_SUCCESS,
  CREATE_MEMORY_FAIL,
  DELETE_MEMORY_SUCCESS,
  CREATING_SPINNER,
  NEXT_IMAGE,
  PREV_IMAGE,
} = slice.actions;

export const fetchCalendar = (treeId) => async () => {
  const rs = await api.fetchCalendar(treeId);
  if (rs.status === 200) {
    return _.get(rs.data, "data");
  }
  return false;
};

export const createCalendar = (payload) => async () => {
  const rs = await api.createCalendar(payload);
  if (rs.status === 200) {
    return _.get(rs, "data.data");
  }
  swal({ text: _.get(rs, "data.message", "Something error!") });
  return false;
};

export const updateCalendar = (eventId, payload) => async () => {
  const rs = await api.updateCalendar(eventId, payload);
  if (rs.status === 200) {
    return _.get(rs, "data");
  }
  swal({ text: _.get(rs, "data.message", "Something error!") });
  return false;
};

export const updateCalendarReschedule = (eventId, payload) => async () => {
  const rs = await api.updateCalendarReschedule(eventId, payload);
  if (rs.status === 200) {
    return _.get(rs, "data");
  }
  swal({ text: _.get(rs, "data.message", "Something error!") });
  return false;
};

export const updateCalendarCancel = (eventId, payload) => async () => {
  const rs = await api.updateCalendarCancel(eventId, payload);
  if (rs.status === 200) {
    return _.get(rs, "data");
  }
  swal({ text: _.get(rs, "data.message", "Something error!") });
  return false;
};

export const deleteCalendar = (eventId) => async () => {
  const rs = await api.deleteCalendar(eventId);
  if (rs.status === 200) {
    return _.get(rs, "data");
  }
  swal({ text: _.get(rs, "data.message", "Something error!") });
  return false;
};

export const fetchMemory = (treeId) => async (dispatch) => {
  dispatch(FETCH_MEMORY());
  const rs = await api.fetchMemory(treeId);
  if (rs.status === 200) {
    dispatch(FETCH_MEMORY_SUCCESS(_.get(rs.data, "data")));
  } else {
    swal({ text: _.get(rs, "data.message", "Something error!") });
    dispatch(FETCH_MEMORY_FAIL());
  }
  return rs;
};

export const createMemory = (payload) => async (dispatch) => {
  dispatch(CREATE_MEMORY());
  const rs = await api.createMemory(payload);
  if (rs.status === 200) {
    const data = _.get(rs, "data.data");
    dispatch(CREATE_MEMORY_SUCCESS(data));
    return true;
  } else {
    swal({ text: _.get(rs, "data.message", "Something error!") });
    dispatch(CREATE_MEMORY_FAIL());
  }
  return false;
};

export const deleteMemory = (memoryId) => async (dispatch) => {
  const rs = await api.deleteMemory(memoryId);
  if (rs.status === 200) {
    dispatch(DELETE_MEMORY_SUCCESS(memoryId));
    return true;
  } else {
    swal({ text: _.get(rs, "data.message", "Something error!") });
  }
  return false;
};

export const uploadArrayImage = (files) => async () => {
  const rs = await api.uploadArrImage(files, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (rs.status === 200) {
    return _.get(rs.data, "data");
  }
  return false;
};

export const selectCalendar = (state) => state.calendar.calendar;
export const selectViewImage = (state) => state.calendar.viewImage;
export const selectArrMemory = (state) => state.calendar.arrMemory;
export const selectStatusCreating = (state) => state.calendar.isCreating;
export const selectArrayViewImages = (state) => state.calendar.arrImages;

export default slice.reducer;
