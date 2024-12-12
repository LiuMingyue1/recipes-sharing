export default (req, res, next) => {
  const userId = req.headers["user-id"];

  if (!userId) {
    console.error("Missing userId in headers");
    return res.status(401).json({ message: "Unauthorized: No user ID provided" });
  }

  req.userId = userId; // 将 userId 附加到请求对象中
  next();
};
