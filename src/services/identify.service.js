const prisma = require("../config/prisma");

exports.handleIdentify = async (email, phoneNumber) => {
  // for finding contact that matchs email or phone
  const existingContacts = await prisma.contact.findMany({
    where: {
      OR: [
        email ? { email } : undefined,
        phoneNumber ? { phoneNumber } : undefined,
      ].filter(Boolean),
    },
  });

  //if no existing contact found, create it a primaryt
  if (existingContacts.length === 0) {
    const newContact = await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: "primary",
      },
    });

    return {
      contact: {
        primaryContatctId: newContact.id,
        emails: email ? [email] : [],
        phoneNumbers: phoneNumber ? [phoneNumber] : [],
        secondaryContactIds: [],
      },
    };
  }  

  // get all linked contact id (include secondary chains)
  const contactIds = new Set();

  existingContacts.forEach((c) => {
    contactIds.add(c.id);
    if (c.linkedId) contactIds.add(c.linkedId);
  });

  const allRelatedContacts = await prisma.contact.findMany({
    where: {
      OR: [
        { id: { in: Array.from(contactIds) } },
        { linkedId: { in: Array.from(contactIds) } },
      ],
    },
  });  

  //find primary contact (oldest createdAt)
  let primaryContact = allRelatedContacts
    .filter((c) => c.linkPrecedence === "primary")
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];

  //convert other primaries to secondary if needed
  
  const otherPrimaries = allRelatedContacts.filter(
    (c) =>
      c.linkPrecedence === "primary" && c.id !== primaryContact.id
  );
  for (const contact of otherPrimaries) {
    await prisma.contact.update({
      where: { id: contact.id },
      data: {
        linkPrecedence: "secondary",
        linkedId: primaryContact.id,
      },
    });
  }  

  return {
    contact: {
      primaryContatctId: null,
      emails: [],
      phoneNumbers: [],
      secondaryContactIds: []
    }
  };
};