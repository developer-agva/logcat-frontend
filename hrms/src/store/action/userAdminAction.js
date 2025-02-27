import axios from "axios";
import { GET_ATTENDANCE_LOGS_DAY_WISE_FAIL, GET_ATTENDANCE_LOGS_DAY_WISE_REQUEST, GET_ATTENDANCE_LOGS_DAY_WISE_SUCCESS } from "../types/UserDataType";

export const getAttendanceLogsDayWise =
  () => async (dispatch, getState) => {
    const { allUserData } = getState();
    const token = localStorage.getItem("authToken"); // Get the token from localStorage (or cookies)
    // const employeId = localStorage.getItem("employeId");
    // If token does not exist, do nothing or handle the case
    if (!token) {
      return dispatch({
        type: GET_ATTENDANCE_LOGS_DAY_WISE_REQUEST,
        payload: "Authentication token not found",
      });
    }

    // Prevent duplicate fetch if data already exists
    if (allUserData.data) return;

    try {
      dispatch({ type: GET_ATTENDANCE_LOGS_DAY_WISE_REQUEST });

      // Add token to request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attendance-logs-day-wise`,
        config
      );
      dispatch({ type: GET_ATTENDANCE_LOGS_DAY_WISE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ATTENDANCE_LOGS_DAY_WISE_FAIL,
        payload: error.response?.data?.message || "Something went wrong",
      });
    }
  };