import pgPromise from 'pg-promise';
import express from 'express';
import { engine } from "express-handlebars";
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'express-flash';
import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
const pgp = pgPromise();
const connectionOptions = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production', // Enable SSL in production
};

const db = pgp(connectionOptions);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption)
const app = express();
app.engine(
  "handlebars",
  engine({
    layoutsDir: "./views/layouts",
  })
);

app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "fuel consumption",
  })
);

app.use(flash());
app.use(express.json());
app.use(express.json());
app.use(cors());




app.get("/", fuelConsumptionAPI.addVehicle);
app.get("/addvehicle", fuelConsumptionAPI.addVehicle);
app.post("/addvehicle", fuelConsumptionAPI.addVehicle);
app.get("/record", fuelConsumptionAPI.refuel);
app.post("/allcars", fuelConsumptionAPI.vehicles);
app.get("/allcars", fuelConsumptionAPI.vehicles);
app.get("/record", fuelConsumptionAPI.refuel);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

