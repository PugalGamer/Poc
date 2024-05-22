const user = require("../model/user.model.js");

const getUsers = async (req, res) => {
  try {
    const users = await user.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists." });
    }
    const users = await user.create(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await user.findByIdAndDelete(id);
    if (!users) {
      res.status(404).json("user doesn't exists!");
    }
    res.status(200).json("User Deleted");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists." });
    }

    const users = await user.findByIdAndUpdate(id, req.body, { new: true });
    if (!users) {
      res.status(404).json("user doesn't exists!");
    }
    res.status(200).json("User Updated");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await user.findById(id);
    if (!users) {
      return res.status(404).json("User doesn't exist!");
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
};
