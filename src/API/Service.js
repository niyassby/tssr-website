import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./apiEndpoints";

export const apiSevice = {
  downloadHallTicket: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EXAM.DOWNLOAD_HALL_TICKET,
      data
    );
    return response.data;
  },
  getResult: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EXAM.RESULT_CHECK,
      data
    );
    return response.data;
  },
  verifyCertificate: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EXAM.VERIFY_CERTIFICATE,
      data
    );
    return response.data;
  },
  requestAtc: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STUDY_CENTERS.REQ_CENTER,
      data
    );
    return response.data;
  },
  verifyATC: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.STUDY_CENTERS.VERIFY_ATC,
      data
    );
    return response.data;
  },
  getCourses: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.COURSE.GET_ALL);
    return response.data;
  },
  getAllPost: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.GALLERY.GET_ALL_POST );
    return response.data;
  },
  getAllEvents: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.EVENT.GET_ALL_EVENTS,
      {
        params: {activeOnly: true}
      }
    );
    return response.data;
  },
  getStudentEligibility: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EVENT.GET_STUDENT,
      data
    );
    return response.data;
  },
  registerEvent: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EVENT.REGISTER_EVENT,
      data
    );
    return response.data;
  },
  verifyEventPassword: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EVENT.VERIFY_EVENT_PASSWORD,
      data
    );
    return response.data;
  },
  updateEventRecord: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EVENT.UPDATE_EVENT_RECORD,
      data
    );
    return response.data;
  },
  getOneEventRecord: async (recordId) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.EVENT.GET_ONE_EVENT_RECORD,
      {params: {recordId}}
    );
    return response.data;
  },
};
