// src/api/accounts.js
export const getUserAccounts = () => {
    return Promise.resolve([
      {
        id: 1,
        title: "Argent Bank Checking",
        number: "8349",
        balance: 2082.79,
        description: "Available Balance",
      },
      {
        id: 2,
        title: "Argent Bank Savings",
        number: "6712",
        balance: 10928.42,
        description: "Available Balance",
      },
      {
        id: 3,
        title: "Argent Bank Credit Card",
        number: "8349",
        balance: 184.3,
        description: "Current Balance",
      },
    ]);
  };
  