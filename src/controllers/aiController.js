import axios from "axios";
import Task from "../model/task.js";
import { env } from "../config/env.js";

export const optimizeTask = async (req, res) => {
  console.log(env.apiKey);

  const { taskId } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }

    if (task.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(401).json({ massage: "Unauthorized" });
    }

    const promt = `
Optimize the following task:
Title: ${task.title}
Description: ${task.description || "None"}

Return:
- Improved title
- Improved description
- Suggested priority (low, medium, high)
  `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [{ role: "user", content: promt }],
      },
      {
        headers: {
          Authorization: `Bearer ${env.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    const aiResult = response.data.choices[0].message.content;
    res.json({
      originalTask: task,
      aiSuggestion: aiResult,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
};
