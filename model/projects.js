const db = require('../db');
exports.users = (req, res) => {
  const sql = 'SELECT * FROM project_users';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({ msg: 'sql err' });
    } else {
      res.status(200).send({ msg: 'success', status: 200, data: results });
    }
  });
};

exports.list = (req, res) => {
  const { name, personId } = req.body;
  // const sql = 'SELECT * FROM project_list';
  if (!name && !personId || personId === 0) {
    const sql = 'SELECT * FROM project_list';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(400).send({ msg: 'sql err' });
      } else {
        res.status(200).send({ msg: 'success', status: 200, data: results });
      }
    });
  } else {
    if (name) {
      const sql = 'SELECT * FROM project_list WHERE name=?';
      db.query(sql, name, (err, results) => {
        if (err) {
          res.status(400).send({ msg: 'sql err' });
        } else {
          res.status(200).send({ msg: 'success', status: 200, data: results });
        }
      });
    }
    if (personId) {
      const sql = 'SELECT * FROM project_list WHERE personId=?';
      db.query(sql, personId, (err, results) => {
        if (err) {
          res.status(400).send({ msg: 'sql err' });
        } else {
          res.status(200).send({ msg: 'success', status: 200, data: results });
        }
      });
    }
  }

  // db.query(sql, (err, results) => {
  //   if (err) {
  //     res.status(400).send({ msg: 'sql err' });
  //   } else {
  //     res.status(200).send({ msg: 'success', status: 200, data: {name, personId} });
  //   }
  // });
};
exports.patch = (req, res) => {
  const newProjectInfo = req.body
  let str = ``
  Object.keys(newProjectInfo).map((key, index, keys) => {
    const infoValue = typeof newProjectInfo[key] === 'string' ? `"${newProjectInfo[key]}"` : newProjectInfo[key]
      str += `${key}=${infoValue}${index === keys.length-1  ? '' : ','}`
  })
  const sql = `UPDATE project_list SET ${str} where id=${newProjectInfo.id}`;
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({ msg: 'sql err' + err });
    } else {
      res.status(200).send({ msg: 'success', status: 200, data: results });
    }
  });
};
exports.add = (req, res) => {
  const newProjectInfo = req.body
  const sql = 'INSERT INTO project_list SET ?';
  db.query(sql, { ...newProjectInfo }, (err, results) => {
    if (err) {
      res.status(400).send({ msg: 'sql err, ' + err });
    } else {
      res.status(200).send({ msg: 'add project success', status: 200, data: results });
    }
  });
};
exports.del = (req, res) => {
  const {id} = req.body
  const sql = 'DELETE FROM project_list where id=?';
  db.query(sql,id,  (err, results) => {
    if (err) {
      res.status(400).send({ msg: 'del sql err, ' + err });
    } else {
      res.status(200).send({ msg: 'del project success', status: 200, data: results });
    }
  });
};