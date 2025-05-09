import Contact from '../models/contacts.js';

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [totalItems, contacts] = await Promise.all([
    Contact.countDocuments({ userId }),
    Contact.find({ userId })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviosPage: page > 1,
  };
}

export function getContact(contactId, userId) {
  return Contact.findOne({
    _id: contactId,
    userId,
  });
}

export function deleteContact(contactId, userId) {
  return Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
}

export function createContact(contact) {
  return Contact.create(contact);
}

export async function replaceContact(contactId, userId, contact) {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    contact,
    {
      new: true,
      upsert: true,
      includeResultMetadata: true,
    },
  );

  return {
    value: result.value,
    updetedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateContact(contactId, userId, contact) {
  return Contact.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    contact,
    { new: true },
  );
}
