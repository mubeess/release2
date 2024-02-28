const publicUrl = {
  development: "flexisafapps-dev.com",
  // development: 'safsims-dev.com',
  staging: "flexisafapps-stage.com",
  production: "safsims.com",
};

export default publicUrl.staging;

// export default publicUrl[process.env.REACT_APP_ENV || process.env.NODE_ENV || 'production'];
