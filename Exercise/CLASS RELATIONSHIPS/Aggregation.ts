//Company Team Management

class Employee {
    private name: string;
    private role: string;
    private teams: Team[] = [];

    constructor(name: string, role: string) {
        this.name = name;
        this.role = role;
    }

    addTeam(team: Team): void {
        // TODO: Add team to employee's team list
        this.teams.push(team);

    }

    removeTeam(team: Team): void {
        // TODO: Remove team from employee's team list
        const index = this.teams.indexOf(team);
        if(index != -1){
            this.teams.splice(index,1);
        }
    }

    getTeamNames(): string[] {
        // TODO: Return list of team names this employee belongs to
        return this.teams.map(t => t.getName());
    }

    getName(): string { return this.name; }
    getRole(): string { return this.role; }
}

class Team {
    private name: string;
    private members: Employee[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addMember(employee: Employee): void {
        // TODO: Add employee to team and register this team on the employee
        this.members.push(employee);
        employee.addTeam(this);
    }

    dissolve(): void {
        // TODO: Remove all members, don't destroy employees
        this.members.forEach(member => member.removeTeam(this));
        this.members = [];
    }

    getName(): string { return this.name; }
    getMembers(): Employee[] { return this.members; }
    getMemberCount(): number { return this.members.length; }
}

class Company {
    private name: string;
    private employees: Employee[] = [];
    private teams: Team[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addEmployee(employee: Employee): void {
        // TODO: Add employee to company
        this.employees.push(employee);

    }

    addTeam(team: Team): void {
        // TODO: Add team to company
        this.teams.push(team);
    }

    dissolveTeam(team: Team): void {
        // TODO: Dissolve the team and remove it from company's team list
        team.dissolve();
        const index = this.teams.indexOf(team);
        if(index != -1){
            this.teams.splice(index,1);
        }
    }

    getName(): string { return this.name; }
    getEmployeeCount(): number { return this.employees.length; }
    getTeamCount(): number { return this.teams.length; }
}

const company = new Company("TechCorp");

const alice = new Employee("Alice", "Engineer");
const bob = new Employee("Bob", "Designer");
const charlie = new Employee("Charlie", "Engineer");

company.addEmployee(alice);
company.addEmployee(bob);
company.addEmployee(charlie);

const backend = new Team("Backend");
const frontend = new Team("Frontend");

company.addTeam(backend);
company.addTeam(frontend);

backend.addMember(alice);
backend.addMember(charlie);
frontend.addMember(alice);
frontend.addMember(bob);

console.log("Before dissolving:");
console.log(`  ${alice.getName()}'s teams: [${alice.getTeamNames().join(", ")}]`);
console.log(`  Backend has ${backend.getMemberCount()} members`);
console.log(`  Company has ${company.getTeamCount()} teams, ${company.getEmployeeCount()} employees`);

company.dissolveTeam(backend);

console.log("\nAfter dissolving Backend:");
console.log(`  ${alice.getName()}'s teams: [${alice.getTeamNames().join(", ")}]`);
console.log(`  ${charlie.getName()}'s teams: [${charlie.getTeamNames().join(", ")}]`);
console.log(`  Company has ${company.getTeamCount()} teams, ${company.getEmployeeCount()} employees`);
console.log(`  ${alice.getName()} still exists: ${alice.getRole()}`);