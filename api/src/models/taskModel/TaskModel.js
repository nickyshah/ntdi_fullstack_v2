import taskSchema from './TaskSchema.js'

// add task to the database 

 export const addTask = (obj) => {
    return taskSchema(obj).save()
}

export const getTasks = () => {
    return taskSchema.find()
}

export const updateTasks = (_id, type) => {
    return taskSchema.findByIdAndUpdate(_id, {type})
}
