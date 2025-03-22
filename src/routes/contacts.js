import express from 'express';

import {
  getContactsController,
  getContactController,
  deleteContactController,
  createContactController,
  replaceContactController,
  updateContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.put('/:id', jsonParser, ctrlWrapper(replaceContactController));

router.patch('/:id', jsonParser, ctrlWrapper(updateContactController));

export default router;
