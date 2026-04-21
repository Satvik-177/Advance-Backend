// controllers/user.controller.js
export const getUser = async (req, res) => {
  const error = new Error("User not found");
  error.status = 404;
  throw error;
};