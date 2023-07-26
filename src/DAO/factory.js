import mongoose from "mongoose";
import env from "../config/enviroment.config.js";

switch (env.persistente) {
  case "MONGO":
    console.log("Conectado a MongoDB");
    mongoose.connect(
      "mongodb+srv://francoivangalluccio:VbfDXQUUxVvHnxna@cluster0.nwjyo8a.mongodb.net/?retryWrites=true&w=majority"
    );
    const { default: ContactsMongo } = await import(
      "./mongo/users.mongoose.js"
    );
    Contacts = ContactsMongo;

    break;

  case "MEMORY":
    console.log("Persistencia en memoria");
    const { default: ContactsMemory } = await import(
      "./memory/users.memory.js"
    );
    Contacts = ContactsMemory;

    break;
  default:
    break;
}
