import { connect } from "mongoose";

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://francoivangalluccio:VbfDXQUUxVvHnxna@cluster0.nwjyo8a.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Conectado a la base de datos");
  } catch (e) {
    console.log(e);
    throw "Falló la conexion";
  }
}
