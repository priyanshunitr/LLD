class BankAccount {
    // Add private fields: accountNumber (string), ownerName (string), balance (number)

    constructor(accountNumber: string, ownerName: string) {
        // Initialize fields. Balance should start at 0.
    }

    deposit(amount: number): void {
        // Add amount to balance (only if amount is positive)
    }

    withdraw(amount: number): boolean {
        // Remove amount from balance if sufficient funds exist
        // Return true if successful, false otherwise
        return false;
    }

    getBalance(): number {
        // Return the current balance
        return 0;
    }
}

// Test your implementation
const account = new BankAccount("123456", "John Doe");
account.deposit(1000);
console.log(account.getBalance().toFixed(1));  // Should print 1000.0

let success = account.withdraw(500);
console.log(success);                          // Should print true
console.log(account.getBalance().toFixed(1));  // Should print 500.0

success = account.withdraw(1000);
console.log(success);                          // Should print false