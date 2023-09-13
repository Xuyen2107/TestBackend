const logAPI = (req, res, next) => {
   const currentDate = new Date();
   console.log(`API is coming at ${currentDate}`);
   next()
};

export default logAPI
