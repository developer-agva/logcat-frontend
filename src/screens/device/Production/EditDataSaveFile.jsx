import React, { useEffect } from 'react'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { getEditListDataOfProduction } from '../../../store/action/DispatchDetailsAction';
function EditDataSaveFile() {

    const getEditListDataReducer = useSelector((state) => state.getEditListDataReducer);
    const { loading, data } = getEditListDataReducer;
    const getDispatchData = data && data.data
    console.log('00', getDispatchData && getDispatchData.prodData)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEditListDataOfProduction())
    }, [])

    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Change Data</Table.HeadCell>
                    <Table.HeadCell>from</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>

                    <Table.HeadCell>to</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {getDispatchData && getDispatchData.map((item, index) => {
                        return (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    Device Id
                                </Table.Cell>
                                <Table.Cell>{item.deviceId}</Table.Cell>
                                <Table.Cell><HiOutlineArrowNarrowRight /></Table.Cell>
                                <Table.Cell>{item.deviceId}</Table.Cell>
                            </Table.Row>)
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

export default EditDataSaveFile