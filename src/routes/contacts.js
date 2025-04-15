import express from 'express';

import {
  getContactsController,
  getContactController,
  deleteContactController,
  createContactController,
  replaceContactController,
  updateContactController,
} from '../controllers/contacts.js';

import { upload } from '../middlewares/multerUpload.js';

import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contact.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', isValidId, ctrlWrapper(getContactController));

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.post(
  '/',
  upload.single('img'),
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

router.put(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(replaceContactController),
);

router.patch(
  '/:id',
  isValidId,
  upload.single('img'),
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

export default router;
