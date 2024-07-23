import bcrypt from "bcrypt";
import { Admin } from "./schema/model.js";  // Ensure this path and file name are correct

const adminSeeder = async () => {
  const isAdminExists = await Admin.findOne({ email: "admin@gmail.com" });  // Use Admin instead of adminSchema

  if (!isAdminExists) {
    await Admin.create({
      email: "admin@gmail.com",
      password: bcrypt.hashSync("admin", 8),
      username: "admin",
      role: "admin",
    });
    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};

export default adminSeeder;

