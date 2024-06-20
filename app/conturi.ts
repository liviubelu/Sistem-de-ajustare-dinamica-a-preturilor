export type UserAccount = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
};

let userAccounts: UserAccount[] = [
    { email: "user1@example.com", password: "password123", firstName: "John", lastName: "Doe", age: 30 },
    { email: "user2@example.com", password: "mypassword", firstName: "Jane", lastName: "Smith", age: 25 },
];

export function addUserAccount(email: string, password: string, firstName: string, lastName: string, age: number) {
    userAccounts.push({ email, password, firstName, lastName, age });
}

export default userAccounts;
