import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { appDisapprovePendingDataAction, getActiveUserAction } from '../../../store/action/AdminDashboard';
import SpinnerCustom from '../../../container/SpinnerCustom';
import { Modal } from 'react-bootstrap';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Toaster, toast } from 'react-hot-toast';

function ActiveUsers() {

  const [openModal, setOpenModal] = useState(false);

  const activeUsersReducer = useSelector(
    (state) => state.activeUsersReducer
  );
  const { loading, data } = activeUsersReducer;
  const registerUsers = data && data.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveUserAction({ page: 1, limit: 10 }));
  }, []);

  return (
    <>
      <div
      >
        <Toaster/>
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        >
        </div>
        <div >
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    Name
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    Speciality
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    Contact Number
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    User Id
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    Last Active
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    Remove
                  </td>
                </tr>
              </thead>
              <tbody>
                {registerUsers && registerUsers.length > 0 ?
                  registerUsers && registerUsers.map((item, index) => {
                    return (
                      <tr class="bg-white border-b hover:bg-gray-50">
                        <td class="px-6 py-4 text-center font-semibold text-gray-900">
                          {item.firstName}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.speciality ? item.speciality : 'NA'}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.contactNumber}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item._id}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          {item.lastLogin.split('GMT')[0]}
                        </td>
                        <td class="px-6 py-4 text-center ">
                          <button onClick={() => {
                            setOpenModal(true)
                          }} style={{ backgroundColor: 'rgb(203, 41, 123)', color: 'white', padding: '10px', borderRadius: '5px' }}>Remove</button>
                        </td>
                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                          <Modal.Header />
                          <Modal.Body>
                            <div className="text-center">
                              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-red-200" />
                              <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                                Are you sure you want to remove this user?
                              </h3>
                              <div className="flex justify-center gap-4">
                                <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                  dispatch(appDisapprovePendingDataAction({ accountStatus: 'Inactive', userId: item._id }))
                                  setTimeout(() => {
                                    setOpenModal(false)
                                  }, 1000);
                                  // toast.success('User Remove Successfully')
                                }}>
                                  Yes, I'm sure
                                </button>
                                <button style={{ backgroundColor: 'white', border: '0.5px solid gray', color: 'black', padding: '10px', borderRadius: '8px' }} onClick={() => setOpenModal(false)}>
                                  No, cancel
                                </button>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </tr>

                    )
                  })
                  :
                  <div style={{ height: '30vh', position: 'relative', left: '32rem', top: '6rem' }}>
                    <span>
                      Loading...
                    </span>
                  </div>
                }
              </tbody>
            </table>
            {loading && <SpinnerCustom />}

          </div>
        </div>
      </div>
    </>
  )
}

export default ActiveUsers