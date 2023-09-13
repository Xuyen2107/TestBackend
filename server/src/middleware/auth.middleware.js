import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
   const token = req.headers["x-access-token"];

   if (!token) {
      return res.status(400).json({
         message: "Bạn cần phải đăng nhập",
      });
   }

   try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.user = decoded;

      next();
   } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
         return res.status(403).json({
            message: "Token đã hết hạn vui lòng đăng nhập lại",
         });
      }

      return res.status(401).json({
         message: "Token không hợp lệ",
      });
   }
};
