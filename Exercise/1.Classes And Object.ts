// Exercise 1: Bank Account
class BankAccount {
    // Add private fields: accountNumber (string), ownerName (string), balance (number)
    private accountNumber:string;
    private ownerName:string;
    private balance:number;

    constructor(accountNumber: string, ownerName: string) {
        // Initialize fields. Balance should start at 0.
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0;
    }

    deposit(amount: number): void {
        // Add amount to balance (only if amount is positive)
        if(amount>0){
            this.balance += amount;
        }else{
            console.log("Cannot add negative.");
        }
    }

    withdraw(amount: number): boolean {
        // Remove amount from balance if sufficient funds exist
        if (amount <= this.balance){
            this.balance -= amount;
            return true;
        }
        else{
        // Return true if successful, false otherwise
            return false;
        }
    }

    getBalance(): number {
        // Return the current balance
        return this.balance;
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

