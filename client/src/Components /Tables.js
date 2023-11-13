import React, { useState } from 'react'
import { deleteTasks, switchTasks } from '../Helper/axiosHelper'
import { Message } from './Message'

export const Tables = ({ taskList, setResp, fetchTask }) => {

    const [idsToDelete, setIdsToDelete] = useState([])

    const entryArg = taskList.filter(item => item.type === 'entry')
    const badArg = taskList.filter(item => item.type === 'bad')

    const handleOnSwitch = async (_id, type) => {
        const data = await switchTasks({ _id, type })
        setResp(data)
        data.status === 'success' && fetchTask()
    }

    const handleOnSelectAll = (e) => {
        // console.log(e)
        const { checked, value } = e.target
        // console.log(checked, value)

        const filteredArg = [];
        taskList.map((item) => {
            if (item.type === value) {
                filteredArg.push(item._id)
            }
        })

        if (checked) {
            // add ids to delete
            setIdsToDelete([...idsToDelete, ...filteredArg])
        } else {
            // remove these ids 
            const afterRemovingIds = idsToDelete.filter((id) =>
                !filteredArg.includes(id)

            )
            setIdsToDelete(afterRemovingIds)
        }
    }

    const handleOnItemSelect = e => {
        const { checked, value } = e.target
        console.log(checked, value)
        if (checked) {
            // add the id to delete
            setIdsToDelete([...idsToDelete, value])
        } else {
            //remove id 

            setIdsToDelete(idsToDelete.filter((item) => item !== value))
        }
    }
    const handleOnDelete = async () => {
        if (window.confirm("Are You Sure that You Want To Delete The Selected Task")) {
            const result = await deleteTasks(idsToDelete)
            setResp(result)

            if (result?.status === "success") {
                fetchTask()
                setIdsToDelete([])
            }
        }
    }

    const ttlhr = badArg.reduce((a, i) => a + +i.hr, 0)
    const msg = {
        status: "success",
        message: `You Could have Saved ${ttlhr} Hours.`
    }
    // console.log(idsToDelete)
    
    return (
        <>
            <div className='row mt-4 mb-4'>
                <div className="col-md ">
                    <h3 className='text-center'>Entry List</h3>
                    <div><input type="checkbox" id="" className='from-check-input'
                        onChange={handleOnSelectAll}
                        value="entry"
                    />{" "}
                        <label htmlFor="" >Select All Entry List </label></div>
                    <table class="table table-striped table-hover border">

                        <tbody>

                            {
                                entryArg.map(({ _id, task, hr }) =>

                                    <tr>
                                        <td>
                                            <input type="checkbox" id={_id}
                                                value={_id}
                                                className='from-check-input'
                                                checked={idsToDelete.includes(_id)}
                                                onChange={handleOnItemSelect}
                                            />{" "}
                                            <label htmlFor={_id}> {task} </label>
                                        </td>
                                        <td >{hr} Hr</td>
                                        <td className='text-end'>
                                            <button
                                                onClick={() => handleOnSwitch(_id, "bad")}
                                                className='btn btn-success'>
                                                <i class="fa-solid fa-arrow-right fa-beat "></i>
                                            </button>
                                        </td>
                                    </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col-md ">
                    <h3 className='text-center'>Bad List</h3>
                    <div><input type="checkbox" id="" className='from-check-input'
                        onChange={handleOnSelectAll}
                        value="bad" />{" "}
                        <label htmlFor="">Select All Bad List  </label></div>
                    <table class="table table-striped table-hover border">
                        <tbody>
                            {
                                badArg.map(({ _id, task, hr }) =>

                                    <tr>
                                        <td>
                                            <input type="checkbox" id={_id} className='from-check-input'
                                                checked={idsToDelete.includes(_id)}
                                                onChange={handleOnItemSelect}
                                                value={_id}
                                            />{" "}
                                            <label htmlFor={_id}> {task} </label>
                                        </td>
                                        <td >{hr} Hr</td>
                                        <td className='text-end'>
                                            <button
                                                onClick={() => handleOnSwitch(_id, "entry")}
                                                className='btn btn-warning'>
                                                <i class="fa-solid fa-arrow-left fa-beat "></i>
                                            </button>
                                        </td>
                                    </tr>)}
                        </tbody>
                    </table>
                    {ttlhr > 0 && <Message resp={msg} />}
                </div>
                

            </div>
            {
                idsToDelete.length > 0 && 
                <div className="d-grid">
                    <button onClick={handleOnDelete} className="btn btn-danger btn-lg">
                        Delete {idsToDelete.length} Tasks
                    </button>
                </div>
            }

        </>
    )
}
