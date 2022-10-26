const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey, expiresIn } = require('../utils/config');

exports.register = (req, res) => {
  const userinfo = req.body;
  if (!userinfo.username || !userinfo.password) {
    return res.cc(`username or password can't be null`);
  }
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.status(500).send({ status: 500, msg: err.message });
    if (results.length > 0) {
      return res.status(400).send({ status: 400, msg: 'dup username' });
    }
    // call bcrypt.hashSync()
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, userinfo, (err, results) => {
      if (err) return res.send({ status: 500, msg: err.message });
      if (results.affectedRows !== 1)
        return res.status(500).send({ status: 500, msg: 'register fail' });
      res.send({ status: 200, msg: 'register success!!' });
    });
  });
};
exports.login = (req, res) => {
  const userInfo = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, userInfo.username, (err, results) => {
    if (err) res.status(500).send({ status: 500, msg: err.message });
    if (results.length !== 1)
      return res
        .status(403)
        .send({ status: 403, msg: 'login fail, wrong username!' });
    const flag = bcrypt.compareSync(userInfo.password, results[0].password);
    if (!flag)
      return res
        .status(403)
        .send({ status: 403, msg: 'login fail, wrong password' });
    const token = jwt.sign({ username: req.body.username }, secretKey, {
      expiresIn,
    });
    res.send({
      status: 200,
      msg: 'login success!',
      user: {
        uid: results[0].uid,
        name: results[0].username,
        token,
      },
    });
  });
};
exports.logout = (req, res) => {
  res.send({
    status: 200,
    message: 'log out success',
  });
};
exports.me = (req, res) => {
  const userDataToken = req.body.token;
  if (!userDataToken) {
    return res.status(400).send({ status: 400, msg: 'not login!' });
  }
  jwt.verify(userDataToken, secretKey, (err, decoded) => {
    if (err) {
      res.status(403).send({ status: 403, msg: `verify token err: ${err.message}` });
    }
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, decoded.username, (err, results) => {
      if (err) res.status(403).send({ status: 403, msg: err.message });
      if (results.length !== 1)
        return res
          .status(403)
          .send({ status: 403, msg: 'login fail, wrong username!' });
      res.send({
        status: 200,
        msg: 'login success!',
        user: {
          uid: results[0].uid,
          name: results[0].username,
        },
      });
    });
  });
};
