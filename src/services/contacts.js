import Contact from '../models/contacts.js';

export function getContacts() {
  return Contact.find();
}

export function getContact(contactId) {
  return Contact.findById(contactId);
}
