import { getContacts, getContact } from '../services/contacts.js';

export async function getContactsController(req, res) {
  const contacts = await getContacts();
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
}
export async function getContactController(req, res) {
  const { id } = req.params;
  const contact = await getContact(id);
  if (contact === null) {
    return res.status(404).send('Contact not found!');
  }
  res.status(200).json({
    message: `Successfully found contact with id ${id}!`,
    data: { contact },
  });
}
