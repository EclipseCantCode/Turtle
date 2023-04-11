import axios from "axios";

export const sendWarning = async (type: string, value: string, range: string) => {
    const res = axios.post("https://maker.ifttt.com/trigger/turtle_danger/with/key/fvwof4o6QVbpb6ZcyeWuWEUZbgvXds6rvEdIlRUztF3", {
        value1: type,
        value2: value,
        value3: range
    }).then(res => console.log(res.data)).catch(err => console.log(err));

    return res;
}
