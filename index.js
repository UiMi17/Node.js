const contactsService = require("./contacts");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsService.getAllContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsService.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await contactsService.deleteContactById(id);
      console.log(deletedContact);
      break;

    case "update":
      const updatedContact = await contactsService.updateContactById(id, {
        name,
        email,
        phone,
      });

      console.log(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);
