export const generateEvent = (source = "simulator") => ({
  id: Math.random().toString(36).slice(2),
  name: "sensor-" + Math.floor(Math.random() * 20),
  value: Math.floor(Math.random() * 1000),
  time: new Date().toLocaleTimeString(),
  source
});


export const startStream = (cb) => {
  return setInterval(() => {
    cb(generateEvent());
  }, 30);   // 30ms = brutal speed
};

