import * as fs from 'node:fs/promises';
import path from 'node:path';

import {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  replaceContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseSortParams } from '../utils/parseSortParams.js';

import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

import { getEnvVar } from '../utils/getEnvVar.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}
export async function getContactController(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const contact = await getContact(id, userId);
  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

export async function deleteContactController(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const contact = await deleteContact(id, userId);
  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  if (contact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }
  res.status(204).send();
}

export async function createContactController(req, res) {
  let photo = null;

  if (req.file) {
    if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'uploads', req.file.filename),
      );
      photo = `http://localhost:3000/uploads/${req.file.filename}`;
    }
  }

  const contact = {
    ...req.body,
    userId: req.user.id,
    photo,
  };
  const result = await createContact(contact);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function replaceContactController(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const contact = req.body;
  const result = await replaceContact(id, contact, userId);

  if (contact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }

  if (result.updetedExisting === true) {
    return res.json({
      status: 200,
      message: 'Contact is successfully updated!',
      data: result.value,
    });
  }
  res.status(201).json({
    status: 201,
    message: 'Contact is successfully created!',
    data: result.value,
  });
}

export async function updateContactController(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  let photo = null;

  if (req.file) {
    if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      photo = result.secure_url;
      console.log(photo);
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'uploads', req.file.filename),
      );
      photo = `http://localhost:3000/uploads/${req.file.filename}`;
    }
  }
  const contact = {
    ...req.body,
    ...(photo && { photo }),
  };

  const result = await updateContact(id, userId, contact);
  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  if (result.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.Forbidden('Contact is not allowed');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
