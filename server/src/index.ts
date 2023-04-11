import axios from "axios";
import { App } from "uWebSockets.js";
import { createTable, insertBulkData, insertData, retrieveData, TurtleData } from "./modules/databases";
import { parse } from "querystring";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const app = App({}).ws("/*", {
    open: async (ws) => {
        console.log("123")
        await sleep(1000);
        ws.subscribe("turtle_data");
        ws.send(JSON.stringify({ type: "data-bulk", data: await retrieveData(1000) }), false, true);
    },

    close(ws, code, message) {
        console.log(`Connection closed with code ${code} and message ${message}`);

    },
}).post("/insert", (res, req) => {
    const data = req.;
    insertData(data.name, data.value);
    res.write("OK");
}).get("/fetch", async (res, req) => {
    let aborted = false;
    res.onAborted(() => {
        aborted = true;
    })

    const requestData = parse(req.getQuery())
    if (Array.isArray(requestData.limit)) {
        res.writeStatus("500")
        res.end("Invalid Query")
    }

    const limit = requestData.limit ? parseInt(requestData.limit as string) : 10

    const data = await retrieveData(limit);

    if (!aborted) {
        res.end(JSON.stringify(data, null, 4))
    }
}).listen(8080, (socket) => {
    console.log(socket)
    if (socket)
        console.log("Listening on 8080")
})


setInterval(() => {
    app.publish("turtle_data", JSON.stringify({ type: "data-update", data: { timestamp: new Date(), ph: Math.random() * 10, temp: Math.random() * 10, turbidity: Math.random() * 10, hardness: Math.random() * 10 } }))
}
    , 2000)


// createTable().then(() => {
//     console.log(retrieveData(1000))

// })
let date = new Date().getTime()
// createTable().then(() => {
//     for(let i = 0; i < 1000 ; i++) {


//         insertData({
//             timestamp: new Date(date + (i * 1000)),
//             ph: Math.random() * 10,
//             temp: Math.random() * 10,
//             turbidity: Math.random() * 10,
//             hardness: Math.random() * 10,
//             comments: "This is a comment"
//         })

//     }
// })







