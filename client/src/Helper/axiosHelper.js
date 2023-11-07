import axios from 'axios'

const apiEP = "http://localhost:8000/api/v1/task" 

export const postTask = async (obj) => {
    try {
        const {data} = await  axios.post(apiEP, obj)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const getTasks = async () => {
    try {
        const {data} = await  axios.get(apiEP)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const switchTasks = async (obj) => {
    try {
        const {data} = await  axios.patch(apiEP, obj)
        return data;
    } catch (error) {
        console.log(error)
    }
}