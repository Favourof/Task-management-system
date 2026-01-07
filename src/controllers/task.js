import Task from "../model/task.js";

export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  //   console.log(req.user);

  if (!title || !description || !dueDate) {
    res.status(400).json({ message: "All field is required" });
  }

  const task = await Task.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json({ message: task });
  try {
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.find({ user: req.user.id });
    res.status(200).json({ message: task });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};
