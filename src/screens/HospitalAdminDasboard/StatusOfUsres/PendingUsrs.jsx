import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appDisapprovePendingDataAction, getPendingUserAction } from '../../../store/action/AdminDashboard';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Toaster, toast } from 'react-hot-toast';
function PendingUsrs() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalRej, setOpenModalRej] = useState(false);

  const pendingUsersReducer = useSelector(
    (state) => state.pendingUsersReducer
  );
  const { data } = pendingUsersReducer;
  const registerUsers = data && data.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPendingUserAction({ page: 1, limit: 10 }));
  }, []);

  return (
    <>
      <div
      >
        {/* <Toaster /> */}
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
                    Contact
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    User Id
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    Request On
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                    Action
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
                          {item.requestedOn.split('GMT')[0]}
                        </td>
                        <td class="px-6 py-4 text-center flex" style={{ justifyContent: 'center', gap: '1rem' }}>
                          <button onClick={() => {
                            setOpenModal(true)
                          }} style={{ backgroundColor: 'rgb(203, 41, 123)', color: 'white', padding: '10px', borderRadius: '5px' }}>Accept</button>
                          <button
                            onClick={() => { setOpenModalRej(true) }}
                            style={{ backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', color: 'black', padding: '10px', borderRadius: '5px', border: '0.5px solid gray' }}>Reject</button>
                        </td>
                        {/*for active */}
                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                          <Modal.Header />
                          <Modal.Body>
                            <div className="text-center">
                              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-red-200" />
                              <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                                Are you sure you want to accept this user?
                              </h3>
                              <div className="flex justify-center gap-4">
                                <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                  dispatch(appDisapprovePendingDataAction({ accountStatus: 'Active', userId: item._id }))
                                  setTimeout(() => {
                                    setOpenModal(false)
                                  }, 1000);
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
                        {/* for inactive */}
                        <Modal show={openModalRej} size="md" onClose={() => setOpenModalRej(false)} popup>
                          <Modal.Header />
                          <Modal.Body>
                            <div className="text-center">
                              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-gray-200" />
                              <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to remove this user?
                              </h3>
                              <div className="flex justify-center gap-4">
                                <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                  dispatch(appDisapprovePendingDataAction({ accountStatus: 'Inactive', userId: item._id }))
                                  setOpenModalRej(false)
                                }}>
                                  Yes, I'm sure
                                </button>
                                <button style={{ backgroundColor: 'white', border: '0.5px solid gray', color: 'black', padding: '10px', borderRadius: '8px' }} onClick={() => setOpenModalRej(false)}>
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
                      No Request Pending
                    </span>
                  </div>
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}

export default PendingUsrs