const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await getAllContacts();

  const result = contacts.find((contact) => {
    return contact.id === id;
  });

  return result || null;
};

const addContact = async (data) => {
  const contacts = await getAllContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);

  updateContacts(contacts);

  return newContact;
};

const updateContactById = async (id, data) => {
  const contacts = await getAllContacts();

  const index = contacts.findIndex((contact) => {
    return contact.id === id;
  });

  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...data };

  updateContacts(contacts);

  return contacts[index];
};

const deleteContactById = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return result;
};

module.exports = {
  getAllContacts,
  addContact,
  getContactById,
  updateContactById,
  deleteContactById
};
