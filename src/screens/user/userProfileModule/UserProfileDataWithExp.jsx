import React, { useEffect, useState } from 'react'
import { Button, Card, Checkbox, Label, TextInput, Radio } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosAddCircle } from "react-icons/io";
import { getUserProfileDataAction } from '../../../store/action/UserProfileAction';

function UserProfileDataWithExp() {
    const [state, setState] = useState(false)
    const [selectPrimary,setSelectPrimary]=useState('')
    const onClickEmail = () => {
        setState(true)
    }

    const [primaryEmail,setPrimaryEmail]=useState('')
    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const userId = adminInfo && adminInfo.data && adminInfo.data._id;

    const getUserProfileReducer = useSelector((state) => state.getUserProfileReducer);
    const { data } = getUserProfileReducer;
    const userDetailsData = data && data.data;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfileDataAction(userId))
    }, [dispatch])

    const sendOtpOnEmail=(e)=>{
        e.preventDefault() 
    }
    return (
        <div style={{ padding: '0rem 3rem', marginTop: '1rem' }}>
            <div
                // className="w"
                style={{width:'50vw'}}
            >
                <h4 style={{ fontSize: "1rem", paddingBottom: '1rem' }}>User Details:</h4>

                <Card
                >
                    <form className='flex gap-12 flex-wrap'>
                        <div className="flex flex-col gap-4">
                            <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ width: '7rem' }}>Name :</span>
                                <TextInput value={userDetailsData && userDetailsData.firstName} className='w-full' id="firstname" type="text" placeholder="enter name" readOnly />
                            </section>
                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ width: '7rem' }}>Desig. :</span>
                                <TextInput value={userDetailsData && userDetailsData.designation} className='w-full' id="designation" type='text' placeholder="Enter contact" readOnly />
                            </section>
                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ width: '7rem' }}>Contact :</span>
                                <TextInput value={userDetailsData && userDetailsData.contactNumber} className='w-full' id="contact" type="number" placeholder="Enter contact" readOnly />
                            </section>
                            <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ width: '7rem' }}>Speciality :</span>
                                <TextInput value={userDetailsData && userDetailsData.speciality?userDetailsData.speciality:'NA'} className='w-full' id="speciality" type="text" readOnly />
                            </section>
                        </div>
                        <div className="flex flex-col gap-4">
                            {state == true ?
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '6rem' }}>Email :</span>
                                    <TextInput className='w-full' value={primaryEmail} onChange={(e)=>{setPrimaryEmail(e.target.value)}} id="email1" type="email" placeholder="name@flowbite.com" />
                                    {primaryEmail && primaryEmail.length?
                                    <button onClick= {sendOtpOnEmail} style={{ fontSize: '0.8rem', padding: '8px', backgroundColor: 'black', color: 'white', borderRadius: '5px' }}>Add</button>
                                    :
                                    <h5 style={{ fontSize: '0.8rem', padding: '8px', backgroundColor: 'white', color: 'white', borderRadius: '5px' }}>Add</h5>
                                    }
                                    </section>
                                :
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '6rem' }}>Email :</span>
                                    <TextInput value={userDetailsData && userDetailsData.email} className='w-full' id="email1" type="email" placeholder="name@flowbite.com" readOnly/>
                                    <IoIosAddCircle size={30} onClick={onClickEmail} />
                                </section>
                            }
                            {state === true ?
                                <fieldset className="flex max-w-md flex-col gap-4 items-center">
                                    <div className="flex items-center gap-2">
                                        <Radio id="united-state" name="countries" onChange={(e)=>{setSelectPrimary(e.target.value)}} value={userDetailsData && userDetailsData.email} />
                                        <Label htmlFor="united-state">{userDetailsData && userDetailsData.email}</Label>
                                    </div>
                                </fieldset>
                                : ''
                            }
                            {selectPrimary && selectPrimary.length?
                            <button style={{backgroundColor:'black',color:'white',padding:'8px',borderRadius:'5px'}}>
                                Make Primary
                            </button>
                            :''}
                        </div>
                    </form>
                </Card >
            </div>
        </div>
    )
}

export default UserProfileDataWithExp