import Task from "../models/task.model.js";

export const getTasks = async function (req, res) {
  const tasks = await Task.find({
    user: req.user.id
  }).populate("user")
  res.json(tasks);
};

export const createTask = async function (req, res) {
  const { title, description, date } = req.body;

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id
  });
  const savedTASK = await newTask.save();
  res.json(savedTASK);
};

export const getTask = async function (req, res) {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) return res.status(404).json({ message: "task not found"});
  res.json(task);
  {
  }
};
export const deleteTask = async function (req, res) {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "task not found"});
    res.json(task);
    {
    }
};

export const updateTask = async function (req, res) {
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    });
    if (!task) return res.status(404).json({ message: "task not found"});
    res.json(task);
    {
    }

};
