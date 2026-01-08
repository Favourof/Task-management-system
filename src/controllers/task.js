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

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not exist" });
    }
    // console.log(req.user.role);

    if (task.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updateTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }

    if (task.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    return res.json({ meassage: "Task Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
