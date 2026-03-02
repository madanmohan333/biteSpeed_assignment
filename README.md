Perfect 👌
Here’s a clean, professional, submission-ready README.md for your Bitespeed assignment.

You can copy-paste this into your README.md file and replace the placeholders like your deployed URL and repo link.

📘 Bitespeed Backend Task – Identity Reconciliation API
🚀 Overview

This project implements an Identity Reconciliation Service for Bitespeed.

The service identifies and links customer contacts based on shared:

email

phoneNumber

It ensures:

Each customer has one primary contact

All related contacts are linked as secondary

The oldest contact remains the primary

New information creates secondary entries

Two primary contacts get merged correctly

🛠 Tech Stack

Node.js

Express.js

Prisma ORM

PostgreSQL

Hosted on Render


bitespeed/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── prisma.js
│   │
│   ├── controllers/
│   │   └── identify.controller.js
│   │
│   ├── services/
│   │   └── identify.service.js
│   │
│   ├── routes/
│   │   └── identify.route.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── README.md

🧠 How Identity Reconciliation Works
1️⃣ If no existing contact is found:

Create a new primary contact.

2️⃣ If matching email or phone exists:

Fetch all linked contacts.

Determine the oldest primary.

Convert newer primaries to secondary (if required).

Create a new secondary if new information is provided.

Return consolidated identity.


🧠 How Identity Reconciliation Works
1️⃣ If no existing contact is found:

Create a new primary contact.

2️⃣ If matching email or phone exists:

Fetch all linked contacts.

Determine the oldest primary.

Convert newer primaries to secondary (if required).

Create a new secondary if new information is provided.

Return consolidated identity.
