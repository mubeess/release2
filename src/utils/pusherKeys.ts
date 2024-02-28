const pusherKeys = {
  development: {
    app_id: "1693164",
    key: "171a8ec7b606e4426336",
    secret: "04498d82d29e62dc9c42",
    cluster: "mt1",
  },
  staging: {
    app_id: "1693164",
    key: "171a8ec7b606e4426336",
    secret: "04498d82d29e62dc9c42",
    cluster: "mt1",
  },
  production: {
    app_id: "1693166",
    key: "f472b12b05bd0e3b5f7a",
    secret: "f3318969ca7cf99d6f1d",
    cluster: "mt1",
  },
};

export default pusherKeys.production;
//  pusherKeys[process.env.REACT_APP_ENV || process.env.NODE_ENV || 'production'];
