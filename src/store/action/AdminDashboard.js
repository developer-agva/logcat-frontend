import axios from "axios";
import Cookies from "universal-cookie";

import {
  ALL_USERS_DETAILS_REQUEST,
  ALL_USERS_DETAILS_SUCCESS,
  ALL_USERS_DETAILS_FAIL,
  UPDATE_ALL_USERS_REQUEST,
  UPDATE_ALL_USERS_SUCCESS,
  UPDATE_ALL_USERS_FAIL,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_REQUEST,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_SUCCESS,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_FAIL,
  DEVICE_ACTION_REQUEST,
  DEVICE_ACTION_SUCCESS,
  DEVICE_ACTION_FAIL,
  DEVICE_DELETE_SUCCESS,
  DEVICE_DELETE_FAIL,
  DEVICE_DELETE_REQUEST,
  DEVICE_DELETE_DATA_ACTION_REQUEST,
  DEVICE_DELETE_DATA_ACTION_SUCCESS,
  DEVICE_DELETE_DATA_ACTION_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_REQUEST_FAIL,
  USER_DELETE_REQUEST_SUCCESS,
  ALL_ACTIVE_USERS_REQUEST,
  ALL_ACTIVE_USERS_SUCCESS,
  ALL_ACTIVE_USERS_FAIL,
  ALL_PENDING_USERS_REQUEST,
  ALL_PENDING_USERS_SUCCESS,
  ALL_PENDING_USERS_FAIL,
  PUT_APP_DISAPPROVE_PENDING_REQUEST,
  PUT_APP_DISAPPROVE_PENDING_SUCCESS,
  PUT_APP_DISAPPROVE_PENDING_FAIL,
  GET_HOSPITAL_ADMIN_USER_REQUEST,
  GET_HOSPITAL_ADMIN_USER_FAIL,
  GET_HOSPITAL_ADMIN_USER_SUCCESS,
  GET_USERDATA_BY_DEVICEiD_FAIL,
  GET_USERDATA_BY_DEVICEiD_SUCCESS,
  GET_USERDATA_BY_DEVICEiD_REQUEST,
  DELETE_USER_FROM_ASSIGNED_REQUEST_REQUEST,
  DELETE_USER_FROM_ASSIGNED_REQUEST_SUCCESS,
  DELETE_USER_FROM_ASSIGNED_REQUEST_FAIL,
  GET_ACCESS_DATA_ACTION_REQUEST,
  GET_ACCESS_DATA_ACTION_SUCCESS,
  GET_ACCESS_DATA_ACTION_FAIL,
  GET_ACCESS_REVIEW_DATA_ACTION_REQUEST,
  GET_ACCESS_REVIEW_DATA_ACTION_SUCCESS,
  GET_ACCESS_REVIEW_DATA_ACTION_FAIL,
  GET_ACTIVE_ADMIN_REQUEST,
  GET_ACTIVE_ADMIN_SUCCESS,
  GET_ACTIVE_ADMIN_FAIL,
  POST_REQUEST_ACTION_BY_HOSPITAL_ADMIN_REQUEST,
  POST_REQUEST_ACTION_BY_HOSPITAL_ADMIN_SUCCESS,
  POST_REQUEST_ACTION_BY_HOSPITAL_ADMIN_FAIL,
  GET_EMPLOYEE_LIST_SUCCCESS,
  GET_EMPLOYEE_LIST_FAIL,
  GET_EMPLOYEE_LIST_REQUEST
} from "../types/AdminDashboard";
const cookies = new Cookies();

export const getAllUsersDetalisById = ({ page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_USERS_DETAILS_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users-list?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: ALL_USERS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_DETAILS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const getActiveUserAction = ({ page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ACTIVE_USERS_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/active-users-list?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: ALL_ACTIVE_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ACTIVE_USERS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const getPendingUserAction = ({ page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PENDING_USERS_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/pending-users-list?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: ALL_PENDING_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PENDING_USERS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};
export const appDisapprovePendingDataAction =
  ({ accountStatus, _id }) => async (dispatch) => {
    try {
      dispatch({
        type: PUT_APP_DISAPPROVE_PENDING_REQUEST,
      });

      const token = cookies.get("ddAdminToken");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/user-account-status/${_id}`,
        { accountStatus },
        config
      );
      dispatch({
        type: PUT_APP_DISAPPROVE_PENDING_SUCCESS,
        payload: data,
      });
      if(data && data.statusCode==200){
        alert('success')
      }
    } catch (error) {
      dispatch({
        type: PUT_APP_DISAPPROVE_PENDING_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const updateAllUsersDetailsById =
  ({ userType, _id }) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ALL_USERS_REQUEST,
      });

      const token = cookies.get("ddAdminToken");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("userType", userType);
      console.log("_id", _id);

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/change-userType/${_id}`,
        { userType },
        config
      );
      dispatch({
        type: UPDATE_ALL_USERS_SUCCESS,
        payload: data,
      });
      // if(data &&)
    } catch (error) {
      dispatch({
        type: UPDATE_ALL_USERS_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };
export const getDefaultDataForDashboard = (durationData) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_DEFAULT_DATA_FOR_DASHBOARD_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    console.log("durationData000", durationData)
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getTotalDevicesCount/${durationData}`,
      config
    );
    dispatch({
      type: ALL_DEFAULT_DATA_FOR_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_DEFAULT_DATA_FOR_DASHBOARD_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const deviceAssignAction =
  ({ _id, deviceId }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: DEVICE_ACTION_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/assignedDeviceToUser`,
          {
            _id,
            deviceId,
          },
          config
        );
        dispatch({
          type: DEVICE_ACTION_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: DEVICE_ACTION_FAIL,
          payload:
            error &&
            error.response &&
            error.response.data &&
            error.response.data.data &&
            error.response.data.data.err &&
            error.response.data.data.err.msg,
        });
      }
    };

export const deviceDeleteAction = () => async (dispatch) => {
  try {
    dispatch({
      type: DEVICE_DELETE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const _id = localStorage.getItem("userId");
    console.log("userId", _id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getAssignedDeviceByUserId/${_id}`,
      config
    );
    dispatch({
      type: DEVICE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_DELETE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const deviceDataDeleteAction =
  ({ userId, DeviceId }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: DEVICE_DELETE_DATA_ACTION_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        console.log("token", token)
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deleteAssignedDeviceById`,
          {
            userId,
            DeviceId,
          },
          config
        );
        dispatch({
          type: DEVICE_DELETE_DATA_ACTION_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: DEVICE_DELETE_DATA_ACTION_FAIL,
          payload:
            error &&
            error.response &&
            error.response.data &&
            error.response.data.data &&
            error.response.data.data.err &&
            error.response.data.data.err.msg,
        });
      }
    };

export const userDeleteAction =
  ({ userId }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: USER_DELETE_REQUEST,
        });
        const token = cookies.get("ddAdminToken");
        console.log("userId", userId)
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/logger/users/delete-byid/${userId}`,
          config
        );
        dispatch({
          type: USER_DELETE_REQUEST_SUCCESS,
          payload: data,
        });
        if (data.statusCode == 200) {
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
      } catch (error) {
        dispatch({
          type: USER_DELETE_REQUEST_FAIL,
          payload:
            error &&
            error.response &&
            error.response.data &&
            error.response.data.data &&
            error.response.data.data.err &&
            error.response.data.data.err.msg,
        });
      }
    };

export const getHospitalAdminUserRequestAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_HOSPITAL_ADMIN_USER_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const _id = localStorage.getItem("userId");
    console.log("userId", _id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/get-user-device-req`,
      config
    );
    dispatch({
      type: GET_HOSPITAL_ADMIN_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HOSPITAL_ADMIN_USER_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const getUserDataByDeviceId = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERDATA_BY_DEVICEiD_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const _id = localStorage.getItem("userId");
    console.log("userId", _id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-device-access-list/${deviceId}`,
      config
    );
    dispatch({
      type: GET_USERDATA_BY_DEVICEiD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERDATA_BY_DEVICEiD_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const deleteUserFromAssignedDeviceAction = ({ _id }) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_FROM_ASSIGNED_REQUEST_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    console.log("token", token)
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/delete-access-from-user/${_id}`,
      config
    );
    dispatch({
      type: DELETE_USER_FROM_ASSIGNED_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FROM_ASSIGNED_REQUEST_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};


export const getAccessUserDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACCESS_DATA_ACTION_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const _id = localStorage.getItem("userId");
    console.log("userId", _id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-device-access-users`,
      config
    );
    dispatch({
      type: GET_ACCESS_DATA_ACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACCESS_DATA_ACTION_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const getAccessUserReviewDataAction = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACCESS_REVIEW_DATA_ACTION_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getAssignedDeviceByUserId/${userId}`,
      config
    );
    dispatch({
      type: GET_ACCESS_REVIEW_DATA_ACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACCESS_REVIEW_DATA_ACTION_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const getActiveAdminDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACTIVE_ADMIN_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/active-admin-list`,
      config
    );
    dispatch({
      type: GET_ACTIVE_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACTIVE_ADMIN_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const postRequestActionByHospitalAdmin = ({ isAssigned, userId, deviceId }) => async (dispatch) => {
  try {
    dispatch({
      type: POST_REQUEST_ACTION_BY_HOSPITAL_ADMIN_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/accept-or-reject-device-req`,
      {
        isAssigned,
        userId,
        deviceId
      },
      config
    );
    dispatch({
      type: POST_REQUEST_ACTION_BY_HOSPITAL_ADMIN_SUCCESS,
      payload: data,
    });
    if(data && data.statusCode==200){
     return alert('Data Accept')
    }
  } catch (error) {
    dispatch({
      type: POST_REQUEST_ACTION_BY_HOSPITAL_ADMIN_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const getEmployeeListAction = ({page,limit}) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EMPLOYEE_LIST_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/employee-list?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: GET_EMPLOYEE_LIST_SUCCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEE_LIST_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};