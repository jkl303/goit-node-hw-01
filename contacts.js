const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.format({
  dir: "db/",
  base: "contacts.json",
});

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) =>
      JSON.parse(data).map((contact) => {
        if (contact.id === contactId.toString()) {
          console.log(contact);
        }
      })
    )
    .catch((err) => console.log(err.message));
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const updatedContacts = parsedContacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  const result = await fs.writeFile(
    "db/contacts.json",
    JSON.stringify(updatedContacts, null, 1)
  );
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  parsedContacts.push({
    id: uuidv4(),
    name,
    email,
    phone,
  });
  const result = await fs.writeFile(
    "db/contacts.json",
    JSON.stringify(parsedContacts, null, 1)
  );
}

module.exports = { listContacts, getContactById, removeContact, addContact };
