-- Create users table
CREATE TABLE IF NOT EXISTS users (
    userId VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    transactionId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Pending', 'Completed') NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    paymentId VARCHAR(255) PRIMARY KEY,
    transactionId VARCHAR(255) NOT NULL,
    method ENUM('Card', 'Crypto', 'Bank Transfer') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (transactionId) REFERENCES transactions(transactionId)
);
