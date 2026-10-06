import { hashPassword, comparePassword } from "./src/lib/auth/password.js";

const password = "Password";

const hashedPassword = await hashPassword(password);

console.log("Original password:", password);
console.log("Hashed password:", hashedPassword);

const isCorrect = await comparePassword(password, hashedPassword);

console.log("Password correct:", isCorrect);