const logger = {
    log: (...args) => {
      if (process.env.NODE_ENV === 'development' && typeof console !== 'undefined' && console.log) {
        console.log(...args);
      }
    },
    error: (...args) => {
      if (typeof console !== 'undefined' && console.error) {
        console.error(...args);
      }
    },
  };
  
  export default logger;
  