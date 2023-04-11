import mySQL from "mysql2/promise"
import { sendWarning } from "./notifications";


const db = mySQL.createPool({
    connectionLimit: 4,
    host: "localhost",
    user: "fish_data",
    password: "root",
    database: "tank_data"
});



export interface TurtleData {
    id?: number,
    timestamp: Date,
    ph: number,
    temp: number,
    turbidity: number,
    hardness: number,
    comments?: string
}

export const createTable = async () =>
    db.execute("CREATE TABLE IF NOT EXISTS turtle_data (id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME, ph INT, temp INT, turbidity INT, hardness INT, comments MEDIUMTEXT)").then((value) => console.log(value, "Completed DB table creation"));


createTable().then(() => console.log("Creating table"))

// Insert TurtleData into the database using a prepared query
export const insertData = async (data: TurtleData) => {
    const query = "INSERT INTO turtle_data (timestamp, ph, temp, turbidity, hardness, comments) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [data.timestamp, data.ph, data.temp, data.turbidity, data.hardness, data.comments];
    return db.execute(query, values).then((value) => console.log("Completed DB insert"));
}


// No worky ???????????????????????????????????????????????
export const insertBulkData = async (data: TurtleData[]) => {
    const query = "INSERT INTO turtle_data (timestamp, ph, temp, turbidity, hardness, comments) VALUES (?, ?, ?, ?, ?, ?)";
    const values = data.map((d) => [d.timestamp, d.ph, d.temp, d.turbidity, d.hardness, d.comments]);
    console.log(values)
    console.log("Finished Mapping")
    return db.execute(query, [values]).then((value) => console.log(value, "Completed DB insert"));
}

export const retrieveData = async (limit: number) => {
    const query = "SELECT * FROM (SELECT * FROM turtle_data ORDER BY id DESC LIMIT ?) AS temp ORDER BY id ASC";
    const values = [limit];
    return db.execute(query, values).then((value) => value[0]);
}
