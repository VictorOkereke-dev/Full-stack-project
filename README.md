# Full-stack-project

# Structure for InventoryHub
Here’s a modular structure that separates concerns and makes the codebase easier to navigate:

    Code
    InventoryHub/
├── client/                      # Frontend code
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server/                      # Backend code
│   ├── controllers/            # Route logic
│   │   ├── authController.js
│   │   └── inventoryController.js
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   └── Item.js
│   ├── routes/                 # API route definitions
│   │   ├── authRoutes.js
│   │   └── inventoryRoutes.js
│   ├── middleware/             # Auth, error handling
│   │   └── authMiddleware.js
│   ├── utils/                  # Helper functions
│   │   └── copilotLogger.js
│   ├── config/                 # DB and env config
│   │   └── db.js
│   ├── app.js                  # Express app setup
│   └── server.js               # Entry point
│
├── .env                        # Environment variables
├── .gitignore
├── README.md
├── package.json
