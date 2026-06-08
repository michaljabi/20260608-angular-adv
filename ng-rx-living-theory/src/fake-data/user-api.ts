import { Router } from 'express';
import { USERS } from './user-data';

export const userController = Router();

const sameEmail = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

userController.get('', (req, res) => {
  const name = String(req.query['name'] ?? '');
  const filtered = name
    ? USERS.filter((u) => u.name.trim().toLowerCase().includes(name.trim().toLowerCase()))
    : USERS;
  res.json(filtered);
});

// ⬇️ Musi być PRZED '/:id', inaczej 'check-email' trafi do parametru :id.
userController.get('/check-email', (req, res) => {
  const email = String(req.query['email'] ?? '');
  const available = !USERS.some((u) => sameEmail(u.email, email));
  res.json({ available });
});

userController.get('/:id', (req, res) => {
  const user = USERS.find((u) => u.id === Number(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});

userController.post('', (req, res) => {
  const body = req.body ?? {};
  const email = String(body.email ?? '');

  if (USERS.some((u) => sameEmail(u.email, email))) {
    res.status(409).json({ message: 'E-mail już zarejestrowany' });
    return;
  }

  const id = USERS.reduce((max, u) => Math.max(max, u.id), 0) + 1;
  const created = { ...body, id };
  USERS.push(created);
  res.status(201).json(created);
});
