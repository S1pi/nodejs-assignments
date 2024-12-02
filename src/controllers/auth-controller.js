import jwt from 'jsonwebtoken';
import {selectUserByUsernameAndPassword} from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const user = await selectUserByUsernameAndPassword(req.body);
  console.log(user);
  if (user) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({...user, token});
  } else {
    res.sendStatus(401);
  }
};

const getMe = async (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  } else {
    res.sendStatus(401);
  }
};

export {postLogin, getMe};
