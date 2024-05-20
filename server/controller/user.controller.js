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
      res.status(201).json("user doesn't exists!");
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
    const users = await user.findByIdAndUpdate(id, req.body);
    if (!users) {
      res.status(201).json("user doesn't exists!");
    }
    res.status(200).json("User Updated");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const {id}=req.params;
    const users = await user.findById(id);
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
  getUser
};
