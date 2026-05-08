export const API_ENDPOINTS = {
  
  STUDY_CENTERS: {
    REQ_CENTER: "/api/externalApi/requestAtc",
    VERIFY_ATC: "/api/externalApi/verify-atc"
  },
  
  EXAM: {
    DOWNLOAD_HALL_TICKET: "/api/hallticket/DownloadhallTicket",
    RESULT_CHECK: "/api/result/fetchResult",
    VERIFY_CERTIFICATE: "/api/result/verifyCertificate",
  },
  COURSE: {
    GET_ALL: "/api/externalApi/getAllCourses",
  },
  GALLERY: {
    GET_ALL_POST: "/api/gallery/fetchAllGalleryPosts",
  },
  EVENT: {
    GET_ALL_EVENTS: "/api/events/getAllEvents",
    GET_STUDENT: "/api/events/checkStudentEligibility",
    REGISTER_EVENT: "/api/events/recordEvent",

    GET_EVENT_BY_ID: "/api/events/getEventById",
    VERIFY_EVENT_PASSWORD: "/api/events/verifyPassword",
    UPDATE_EVENT_RECORD: "/api/events/updateEventRecord",
    GET_ONE_EVENT_RECORD: "/api/events/getSingleEventRecord",
  },
  
};
 