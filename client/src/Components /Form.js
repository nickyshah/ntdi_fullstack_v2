import React, { useState } from 'react'
import { postTask } from '../Helper/axiosHelper'

const initialState = {
    task: "",
    hr: ""
}
const ttlhrsWk = 24*7
export const Form = ({setResp, setShowSpinner, fetchTask, ttlHr}) => {

    const [form, setForm] = useState(initialState)

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form, 
            [name]: value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        
        // to check if you have enough hours to add the task 
        if (ttlHr + +form.hr > ttlhrsWk){
            return alert("Not Enough Time to Left to be Added....")
        }
        setShowSpinner(true)

        //call the api 
        const data = await postTask(form)
        setResp(data)
        setShowSpinner(false)
        if (data.status === "success")
         {
            setForm(initialState)
            fetchTask()
        }
    }
    
    return (
        <form onSubmit={handleOnSubmit}
        
        className='border p-5 rounded shadow-lg mt-4'>
            <div className="row g-3">
                <div className="col-md-5">
                    <input type="text" className='form-control'
                    placeholder='i.e Coding'
                    required
                    name='task'
                    value={form.task}
                    onChange={handleOnChange}
                    />
                </div>
                <div className="col-md-3">
                    <input type="number" className='form-control'
                    placeholder='i.e  44'
                    required min={1}
                    name='hr'
                    value={form.hr}
                    onChange={handleOnChange}
                    />
                </div>
                <div className="col-md-4 d-grid">
                    <button className="btn btn-primary">
                        Add New Task
                    </button>
                </div>
            </div>
        </form>
    )
}
