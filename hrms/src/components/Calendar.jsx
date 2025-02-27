import React, { useEffect, useMemo, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCalenderLogsApiAction, postApplyCompOffLeaveAction, postApplyRegularizationAction } from "../store/action/userDataAction";
import { Bounce, ToastContainer, toast } from "react-toastify";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [modalOpen, setModalOpen] = useState(false); // Modal visibility state
  const [selectedDay, setSelectedDay] = useState(null); // Selected day state
  const [reason, setReason] = useState("");
  const [selectType, setSelectType] = useState("");
  const [reasonType, setReasonType] = useState("");
  const dispatch = useDispatch();
  const { data: dataaa } = useSelector((state) => state.calenderLogsData);
  const dayLogs = dataaa?.data;

  const { data: leaveData, error: newError } = useSelector((state) => state.compoffReducer);
  console.log('leaveData', leaveData, newError)

  const { data, error } = useSelector((state) => state.compoffReducer)

  const { loading, data: dataa } = useSelector((state) => state.userData);
  const userDataList = dataa?.data || [];

  const { data: data1, error: error1 } = useSelector((state) => state.regularizeReducer)
  useEffect(() => {
    const monthYear = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    dispatch(getCalenderLogsApiAction(monthYear));
  }, [currentMonth, currentYear, dispatch]);


  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    };
    if (data1?.message) {
      toast.success(data1?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    }
  }, [data1?.message])
  useEffect(() => {
    toast.error(error1, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }, [error1])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };


  const handleDayClick = (day) => {
    if (!day) return;

    let today = new Date();
    const selectedDate = new Date(currentYear, currentMonth, day);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Get the time condition
    const inTimeData = getDayType(day);
    const newTime = getNewTimeForComparison(day);
    console.log('inTimeData', inTimeData, newTime);

    // Comparing inTimeData with newTime to ensure inTimeData is greater than or equal to newTime
    if (inTimeData && newTime && inTimeData?.inTimeData > newTime) {
      toast.error("Regularization can only be applied before 9:30 AM", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return; // Prevent opening modal if condition fails
    }


   // Check if the selected date is in the current month and not in the future
   if (
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getFullYear() === today.getFullYear() &&
    selectedDate <= today // Ensure it's today or a past date
  ) {
    // Allow short leave for today or any date within the current month
    setSelectedDay(day);
    setModalOpen(true);
  } else {
    // Error message for invalid date selection
    toast.error(
      "You can only select short leave for today or regularization for dates within the current month up to today.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      }
    );}
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectType) {
      alert("Select leave type");
      return;
    }
    if (!reason) {
      alert("Provide a reason for leave");
      return;
    }
    let leaveType = selectType;

    if (leaveType === 'compOff') {
      // Create a Date object and format it
      let compOffDate = `${selectedDay} ${months[currentMonth]} ${currentYear}`;
      dispatch(postApplyCompOffLeaveAction(compOffDate, reason));
      setModalOpen(false);
      return;
    } else {

      const compOffDate = `${selectedDay} ${months[currentMonth]} ${currentYear}`;
      // For other leave types, similar formatting
      const date = new Date(compOffDate + " 00:00:00"); // Force local time
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate); // Output: 2025-01-20

      dispatch(postApplyRegularizationAction(leaveType, formattedDate, reason));
      setModalOpen(false);
      return;
    }

  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDay(null); // Reset the selected day
  };

  const getNewTimeForComparison = (day) => {
    const formattedDate = `${day} ${months[currentMonth]} ${currentYear}`;
    let newTime = null;

    dayLogs?.find((off) => {
      if (off.AttendanceDate === formattedDate) {
        const timeParts = off?.shiftTime?.startAt.split(':'); // Splitting the time into hours and minutes
        const startTime = new Date();

        // Set the hours and minutes for the start time
        startTime.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0, 0);

        // Adding 30 minutes
        startTime.setMinutes(startTime.getMinutes() + 30);

        // Formatting the new time as 'HH:mm'
        newTime = startTime.getHours().toString().padStart(2, '0') + ':' + startTime.getMinutes().toString().padStart(2, '0');
      }
    });

    return newTime;
  };

  const getDayType = (day) => {
    // Format the date properly
    const formattedDate = `${day} ${months[currentMonth]} ${currentYear}`;
    let inTimeData = null;

    // Find the corresponding day off log from dayLogs
    const dayOff = dayLogs?.find((off) => off.AttendanceDate === formattedDate);

    // Debugging: Log to check if we found the dayOff data
    // console.log('Formatted Date:', formattedDate);
    // console.log('Found DayOff:', dayOff);

    // If dayOff is found, extract inTimeData
    if (dayOff) {
      inTimeData = dayOff?.InTime?.split(' ')[1]?.slice(0, 5); // Extract time from InTime field
    }

    // Debugging: Log the extracted inTimeData
    // console.log('inTimeData:', inTimeData);

    // Return both AttendanceStatus and inTimeData as an object
    return {
      AttendanceStatus: dayOff?.AttendanceStatus || null,
      inTimeData: inTimeData || null,
      isLeaveTaken: dayOff?.isLeaveTaken || null,
      Status: dayOff?.Status || null,
    };
  };

  const getDayClass = (day) => {
    if (!day) return "bg-transparent";
    const today = new Date();
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    // Get day type from getDayType
    const { AttendanceStatus, inTimeData, isLeaveTaken, Status } = getDayType(day);

    console.log("AttendanceStatus:", AttendanceStatus);
    console.log("Status:", Status);

    if (isToday) {
      return "bg-blue-400 text-white";
    }

    // Debugging: Ensure condition is being hit
    if (AttendanceStatus === "Absent" && Status === 'Present') {
      console.log("Condition matched!");
      return "text-red-800 border-2 border-red-300";  // Absent without leave
    }

    if (AttendanceStatus === "Absent" && isLeaveTaken === true) {
      return "bg-white text-black border-2 border-black";  // Leave taken
    }
    if (AttendanceStatus === "Absent" && Status === 'Present') {
      return "text-red-800 border-2 border-red-300";  // Absent without leave
    }
    if (AttendanceStatus === "Absent" && Status === 'Absent') {
      return "text-red-800 border-2 border-red-300";  // Absent without leave
    }
    if (AttendanceStatus === "Absent" || Status === 'WeeklyOff') {
      return "bg-gray-100 text-gray-800 hover:bg-gray-300 hover:text-white";  // Absent without leave
    }
    if (AttendanceStatus === "Full Day") {
      return "text-green-800 border-2 border-lime-300 hover:bg-green-500";  // Present full day
    }

    if (AttendanceStatus === "Half Day") {
      return "text-yellow-800 border-2 border-amber-200";  // Half-day
    }

    if (AttendanceStatus === "Holiday") {
      return "text-blue-800 border-2 border-blue-300";  // Holiday
    }

    if (inTimeData) {
      return "text-blue-800 border-2 border-blue-300";  // Example: Late, based on inTimeData
    }

    return "bg-gray-100 text-gray-800 hover:bg-gray-300"; // Default case
  };




  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // First day of the month (0-6)
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate(); // Total days in the month
  const calendarDays = [];
  // Add empty slots for the days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Use null for empty slots
  }

  // Add the actual days of the month
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i); // Push actual days
  }

  const handleInputChange = (e) => {
    setSelectType(e.target.value);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-200 p-4">
          <button
            className="text-gray-600 hover:text-gray-900 text-xl"
            onClick={handlePrevMonth}
          >
            <MdChevronLeft />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">
            {months[currentMonth]} {currentYear}
          </h2>
          <button
            className="text-gray-600 hover:text-gray-900 text-xl"
            onClick={handleNextMonth}
          >
            <MdChevronRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 p-4">
          {daysOfWeek?.map((day, days) => {
            return (
              <div key={days} className="text-center font-semibold text-gray-600">
                {day}
              </div>
            )
          }
          )}
          {calendarDays.map((day, index) => {
            if (day) {
              return (
                <div
                  key={`day-${index}`} // Descriptive key
                  onClick={() => handleDayClick(day)}
                  className={`h-12 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${getDayClass(day)}`}
                >
                  {day}
                </div>
              );
            }
            // Render an empty slot for non-day elements
            return <div key={`empty-${index}`} className="h-12"></div>;
          })}

        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-semibold mb-4">
              Selected Date: {selectedDay} {months[currentMonth]} {currentYear}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="leaveType"
                className="block text-sm font-medium text-gray-700"
              >
                Leave Type<span className="text-red-500">*</span>
              </label>
              <select
                id="leaveType"
                name="leaveType"
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select Leave Type</option>
                {selectedDay === new Date().getDate() ? (
                  <>
                    {userDataList?.maxShortLeave === '0' ? (
                      <option disabled>Short leave / {userDataList?.maxShortLeave}</option>
                    ) : (
                      <option value="shortLeave">Short leave</option>
                    )}
                  </>
                ) : (
                  <>
                    {userDataList?.maxRegularization === '0' ? (
                      <option disabled>Regularization / {userDataList?.maxRegularization}</option>
                    ) : (
                      <>
                        <option value="regularized">Regularization</option>
                        <option value="optionalLeave">Optional Leave</option>
                        <option value="compOff">Comp-Off</option>
                      </>
                    )}
                  </>
                )}
              </select>
            </div>
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Reason :
              </label>
              <textarea
                id="reason"
                name="reason"
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Provide your reason"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-black"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Calendar;