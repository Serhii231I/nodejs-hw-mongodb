import express from 'express';

import {
  getContactsController,
  getContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactController));

export default router;
