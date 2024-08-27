import connectionPool from "../lib/connection.js";

const queries = [
  `CREATE TABLE IF NOT EXISTS Users (
    id SERIAL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  );`,
  `CREATE TABLE IF NOT EXISTS Groups (
    id SERIAL,
    ownerUserId INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_groups_users_id FOREIGN KEY(ownerUserId) REFERENCES Users(id)
  );`,
  `CREATE TABLE IF NOT EXISTS UserGroup (
    id SERIAL,
    userId INTEGER NOT NULL,
    groupId INTEGER NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_group_user_id FOREIGN KEY(userId) REFERENCES Users(id),
    CONSTRAINT fk_user_group_group_id FOREIGN KEY(groupId) REFERENCES Groups(id)
  );
  CREATE TABLE IF NOT EXISTS Expenses (
    id SERIAL,
    ownerUserId INTEGER NOT NULL,
    groupId INTEGER NOT NULL,
    description VARCHAR(300) NOT NULL,
    total NUMERIC NOT NULL,
    divisionType VARCHAR(200) NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_expenses_owner_user_id FOREIGN KEY(ownerUserId) REFERENCES Users(id),
    CONSTRAINT fk_expenses_group_id FOREIGN KEY(groupId) REFERENCES Groups(id)
);
CREATE TABLE IF NOT EXISTS UserExpense (
    id SERIAL,
    userId INTEGER NOT NULL,
    expenseId INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    isPaid BOOLEAN NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATE,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_expense_user_id FOREIGN KEY(userId) REFERENCES Users(id),
    CONSTRAINT fk_user_expense_expense_id FOREIGN KEY(expenseId) REFERENCES Expenses(id)
);`,
];

async function runMigrations() {
  const client = await connectionPool.connect();
  for (let query of queries) {
    await client.query(query);
  }
  console.log("Migrations ran successfully");
  client.end();
}

runMigrations().catch(console.error);
