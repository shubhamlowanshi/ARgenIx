const requestsMap = new Map();
export const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;

  const WINDOW_TIME = 60 * 1000;   // 1 minute
  const MAX_REQUEST = 100;

  const currentTime = Date.now();

  // Agar IP pehle baar aayi
  if (!requestsMap.has(ip)) {
    requestsMap.set(ip, [currentTime]);
    return next();
  }

  const timestamps = requestsMap.get(ip);

  // Old requests(sliding window)
  const filtered = timestamps.filter(
    time => currentTime - time < WINDOW_TIME
  );

  if (filtered.length >= MAX_REQUEST) {
    return res.status(429).json({
      success: false,
      message: "Slow down champ — Too many requests"
    });
  }

  // Add current request
  filtered.push(currentTime);
  requestsMap.set(ip, filtered);

  next();
};
