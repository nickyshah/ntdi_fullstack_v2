import express from 'express'
import { addTask, deleteTasks, getTasks, updateTasks } from './src/models/taskModel/TaskModel.js'

const router = express.Router()

router.get("/", async (req, res) => {
    const taskLists = await getTasks()
    res.json({
        status: "success",
        message: "still to do",
        taskLists
    })
    
})
router.post("/", async (req, res) => {
    console.log(req.body)

    //Add data into the database 
    const result = await addTask(req.body)
    result?._id ? 
    res.json({
        status: "success",
        message: "Task has Been Added"
    }) : 
    res.json({
        status: "error",
        message: "unable to add task"
    })
})
router.patch("/", async (req, res) => {
    // console.log(req.body)
const {_id, type} = req.body
     //Add data into the database 
    const result = await updateTasks(_id, type)
    result?._id ? 
    res.json({
        status: "success",
        message: "Task has Been switched successfully"
    }) : 
    res.json({
        status: "error",
        message: "unable to update the  task"
    })

    
})
router.delete("/", async (req, res) => {
    // console.log(req.body)
const data = req.body
     //Add data into the database 
    const result = await deleteTasks(data)
    result.deletedCount ? 
    res.json({
        status: "success",
        message: "Task has Been deleted successfully"
    }) : 
    res.json({
        status: "error",
        message: "unable to delete task"
    })

    
})
export default router;