import {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  replaceContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
export async function getContactsController(req, res) {
  const contacts = await getContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}
export async function getContactController(req, res) {
  const { id } = req.params;
  const contact = await getContact(id);
  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

export async function deleteContactController(req, res) {
  const { id } = req.params;
  const result = await deleteContact(id);
  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.json({
    status: 204,
  });
}

export async function createContactController(req, res) {
  const contact = req.body;
  const result = await createContact(contact);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function replaceContactController(req, res) {
  const { id } = req.params;
  const contact = req.body;
  const result = await replaceContact(id, contact);

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
  const contact = req.body;
  const result = await updateContact(id, contact);
  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
