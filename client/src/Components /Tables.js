import React from 'react'
import { switchTasks } from '../Helper/axiosHelper'

export const Tables = ({taskList, setResp, fetchTask}) => {

    const entryArg = taskList.filter(item => item.type === 'entry') 
    const badArg = taskList.filter(item => item.type === 'bad') 

    const handleOnSwitch = async (_id, type) => {
        const data = await switchTasks({_id, type})
        setResp(data)
        data.status === 'success' && fetchTask()
    }

    return (
        <div className='row mt-4'>
            <div className="col-md ">
                <h3 className='text-center'>Entry List</h3>
                <table class="table table-striped table-hover border">
                    <tbody>
                        {
                          entryArg.map(({_id, task, hr}) =>  
                        
                        <tr>
                            <td>
                            <input type="checkbox" id={_id} className='from-check-input'/>{" "}
                            <label htmlFor={_id}> {task} </label>
                            </td>
                            <td >{hr} Hr</td>
                            <td className='text-end'>
                                <button 
                                onClick={()=> handleOnSwitch(_id, "bad")}
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
                <table class="table table-striped table-hover border">
                    <tbody>
                    {
                          badArg.map(({_id, task, hr}) =>  
                        
                        <tr>
                            <td>
                            <input type="checkbox" id={_id} className='from-check-input'/>{" "}
                            <label htmlFor={_id}> {task} </label>
                            </td>
                            <td >{hr} Hr</td>
                            <td className='text-end'>
                                <button 
                                onClick={()=> handleOnSwitch(_id, "entry")}
                                className='btn btn-warning'>
                                    <i class="fa-solid fa-arrow-left fa-beat "></i>
                                </button>
                            </td>
                        </tr>)}
                     </tbody>
                </table>
            </div>
        </div>
    )
}
