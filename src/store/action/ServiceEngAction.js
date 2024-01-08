import axios from "axios";
import Cookies from 'universal-cookie';
import {
  GET_ALL_TICKETS_DATA_REQUEST,
  GET_ALL_TICKETS_DATA_SUCCESS,
  GET_ALL_TICKETS_DATA_FAIL,
  UPDATE_STATUS_DATA_REQUEST,
  UPDATE_STATUS_DATA_SUCCESS,
  UPDATE_STATUS_DATA_FAIL,
  DELETE_STATUS_DATA_REQUEST,
  DELETE_STATUS_DATA_SUCCESS,
  DELETE_STATUS_DATA_FAIL,
  GET_TICKET_DETAILS_BY_ID_REQUEST,
  GET_TICKET_DETAILS_BY_ID_SUCCESS,
  GET_TICKET_DETAILS_BY_ID_FAIL,
  POST_DOC_BY_SERVICE_REQUEST,
  POST_DOC_BY_SERVICE_SUCCESS,
  POST_DOC_BY_SERVICE_FAIL,
  INSTALLATION_REPORT_REQUEST,
  INSTALLATION_REPORT_REQUEST_SUCCESS,
  INSTALLATION_REPORT_REQUEST_FAIL,
  GET_TICKET_DETAILS_BY_TICKET_NO_FAIL,
  GET_TICKET_DETAILS_BY_TICKET_NO_SUCCESS,
  GET_TICKET_DETAILS_BY_TICKET_NO_REQUEST,
  GET_SERVICE_ENGINNER_STATUS_REQUEST,
  GET_SERVICE_ENGINNER_STATUS_SUCCESS,
  GET_SERVICE_ENGINNER_STATUS_FAIL,
  GET_SERVICE_ENGINNER_DATA_FAIL,
  GET_SERVICE_ENGINNER_DATA_SUCCESS,
  GET_SERVICE_ENGINNER_DATA_REQUEST,
  GET_RE_ASSIGN_TICKETS_REQUEST,
  GET_RE_ASSIGN_TICKETS_SUCCESS,
  GET_RE_ASSIGN_TICKETS_FAIL,
  GET_ALL_SERVICES_REQUEST,
  GET_ALL_SERVICES_SUCCESS,
  GET_ALL_SERVICES_FAIL,
  GET_SINGLE_SERVICES_FAIL,
  GET_SINGLE_SERVICES_SUCCESS,
  GET_SINGLE_SERVICES_REQUEST,
  GET_OTP_FOR_SERVICES_TICKET_REQUEST,
  GET_OTP_FOR_SERVICES_TICKET_SUCCESS,
  GET_OTP_FOR_SERVICES_TICKET_FAIL,
  GET_VERIFY_OTP_SERIVES_REQUEST,
  GET_VERIFY_OTP_SERIVES_SUCCESS,
  GET_VERIFY_OTP_SERIVES_FAIL,
  POST_TICKET_STATUS_DATA_REQUEST,
  POST_TICKET_STATUS_DATA_SUCCESS,
  POST_TICKET_STATUS_DATA_FAIL,

} from "../types/ServiceEngType";
import { toast } from "react-hot-toast";
const cookies = new Cookies();
export const getAllTicketsDataAction = ({ searchData, page, limit, filter }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_TICKETS_DATA_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    console.log('00990', filter)
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/support/get-tickets?page=${page}&limit=${limit}&search=${searchData}&filter=${filter}`,
      config
    );
    dispatch({
      type: GET_ALL_TICKETS_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TICKETS_DATA_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const putStatusDataAction = ({ id, status, priority }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_STATUS_DATA_REQUEST
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/support/update-ticket`,
        {
          id,
          status,
          priority
        },
        config
      );
      dispatch({
        type: UPDATE_STATUS_DATA_SUCCESS,
        payload: data,
      });
      if (data.statusCode == 200) {
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: UPDATE_STATUS_DATA_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.msg,
      })
    }
  };

export const deleteStatusDataAction = ({ id, ticket_status, priority, service_engineer, isFeedback }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DELETE_STATUS_DATA_REQUEST
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/support/update-ticket`,
        {
          id,
          ticket_status,
          priority,
          service_engineer,
          isFeedback,
        },
        config
      );
      dispatch({
        type: DELETE_STATUS_DATA_SUCCESS,
        payload: data,
      });
      // if (data.statusCode == 200) {
      //   window.location.reload();
      // }
    } catch (error) {
      dispatch({
        type: DELETE_STATUS_DATA_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.msg,
      })
    }
  };

export const getTicketsDetailsByDeviceIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TICKET_DETAILS_BY_ID_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("id", id)
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/support/get-ticket/${id}`,
      config
    );
    dispatch({
      type: GET_TICKET_DETAILS_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TICKET_DETAILS_BY_ID_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const uploadDocByServiceAction = (deviceId, file) => async (dispatch) => {
  try {
    dispatch({
      type: POST_DOC_BY_SERVICE_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('11', deviceId)
    let { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/s3/upload-single`,
      {
        deviceId,
        file
      },
      config
    );
    dispatch({
      type: POST_DOC_BY_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DOC_BY_SERVICE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};
export const instalationReportAction = ({ deviceId, concernedPName, dateOfWarranty, hospitalName, address }) => async (dispatch) => {
  try {
    dispatch({
      type: INSTALLATION_REPORT_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/support/add-installation-record`,
      {
        deviceId,
        concernedPName,
        dateOfWarranty,
        hospitalName,
        address,
      },
      config
    );
    dispatch({
      type: INSTALLATION_REPORT_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTALLATION_REPORT_REQUEST_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const getTicketDetailsInSupport = (ticket) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TICKET_DETAILS_BY_TICKET_NO_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/support/get-ticket-details/${ticket}`,
      config
    );
    dispatch({
      type: GET_TICKET_DETAILS_BY_TICKET_NO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TICKET_DETAILS_BY_TICKET_NO_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const getServiceEngStatus = (userStatus, email) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SERVICE_ENGINNER_STATUS_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/logger/change-user-status`,
      {
        userStatus,
        email,
      },
      config
    );
    dispatch({
      type: GET_SERVICE_ENGINNER_STATUS_SUCCESS,
      payload: data,
    });
    if (data && data.statusCode === 200) {
      window.location.reload()
    }
  } catch (error) {
    dispatch({
      type: GET_SERVICE_ENGINNER_STATUS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const getServiceEngData = (email) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SERVICE_ENGINNER_DATA_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/user-status/${email}`,
      config
    );
    dispatch({
      type: GET_SERVICE_ENGINNER_DATA_SUCCESS,
      payload: data,
    });
    // if(data && data.statusCode===200){
    //   window.location.reload()
    // }
  } catch (error) {
    dispatch({
      type: GET_SERVICE_ENGINNER_DATA_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const postReAssignList = (service_engineer, id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RE_ASSIGN_TICKETS_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/support/re-assign-ticket`,
      {

        service_engineer,
        id,
      },
      config
    );
    dispatch({
      type: GET_RE_ASSIGN_TICKETS_SUCCESS,
      payload: data,
    });
    // if(data && data.statusCode===200){
    //   window.location.reload()
    // }
  } catch (error) {
    dispatch({
      type: GET_RE_ASSIGN_TICKETS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const getServicesDataAction = (filter,searchData) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SERVICES_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    console.log('filter',filter)
    console.log('search',searchData)
    const config = {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/get-all?sortBy=${filter}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_ALL_SERVICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SERVICES_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const getSingleServicesDataAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_SERVICES_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/get-by-deviceId?deviceId=${deviceId}&project_code=SBXMH`,
      config
    );
    dispatch({
      type: GET_SINGLE_SERVICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SERVICES_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const sendTicketStatusDataAction = (deviceId, date, message, name, hospitalName, wardNo, email, department, contactNo) => async (dispatch) => {
  try {
    dispatch({
      type: POST_TICKET_STATUS_DATA_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/SBXMH`,
      { deviceId, date, message, name, hospitalName, wardNo, email, department, contactNo },
      config
    );
    dispatch({
      type: POST_TICKET_STATUS_DATA_SUCCESS,
      payload: data,
    });
    if (data.statusCode === 200) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload()
      }, 500);
    }
  } catch (error) {
    console.log('error', error &&
      error.response &&
      error.response.data &&
      error.response.data.data &&
      error.response.data.data.err &&
      error.response.data.data.err.msg)
    if (error.response &&
      error.response.data &&
      error.response.data.data &&
      error.response.data.data.err &&
      error.response.data.data.err.statusCode === 400) {
      toast.error(error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg)
    }
    dispatch({
      type: POST_TICKET_STATUS_DATA_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err
    })
  }
};

export const getOtpForTicketServicesAction = ({ name, deviceId, email, contactNo, hospitalName, wardNo, department, message, date }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_OTP_FOR_SERVICES_TICKET_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/SBXMH`,
      { name, deviceId, email, contactNo, hospitalName, wardNo, department, message, date },
      config
    );
    dispatch({
      type: GET_OTP_FOR_SERVICES_TICKET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_OTP_FOR_SERVICES_TICKET_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};

export const getVerifiedOtpServiceAction = (otp, deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_VERIFY_OTP_SERIVES_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/verify-otp-for-ticket-close/SBXMH`,
      {
        otp,
        deviceId
      },
      config
    );
    dispatch({
      type: GET_VERIFY_OTP_SERIVES_SUCCESS,
      payload: data,
    });
    if (data.statusCode === 200) {
      toast.success(data.message)
    }
  } catch (error) {
    console.log('error', error &&
      error.response &&
      error.response.data &&
      error.response.data.data &&
      error.response.data.data.err &&
      error.response.data.data.err.msg)
    if (error.response &&
      error.response.data &&
      error.response.data.data &&
      error.response.data.data.err &&
      error.response.data.data.err.statusCode === 400) {
      toast.error(error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg)
    }
    dispatch({
      type: GET_VERIFY_OTP_SERIVES_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err
    })
  }
};