export const adminOnly = async (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(401).json({ meassage: "Admin access only" });
  }
  next();
};
