import express from 'express';

import { authenticate } from '../middlewares/authenticate.js';

import contactRoutes from './contacts.js';
import authRoutes from './auth.js';

const router = express.Router();

router.use('/contacts', authenticate, contactRoutes);
router.use('/auth', authRoutes);

export default router;
