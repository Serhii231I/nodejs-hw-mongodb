import Contact from '../models/contacts.js';

export function getContacts() {
  return Contact.find();
}

export function getContact(contactId) {
  return Contact.findById(contactId);
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export function createContact(contact) {
  return Contact.create(contact);
}

export async function replaceContact(contactId, contact) {
  const result = await Contact.findByIdAndUpdate(contactId, contact, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updetedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateContact(contactId, contact) {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
}
