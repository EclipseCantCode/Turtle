import { Component, createSignal, For, Signal } from 'solid-js';
import Chart from './Chart';
import Navbar from './components/navbar/navbar';
import styles from "./App.module.css"
import ButtonBar from './components/ButtonBar.tsx/buttonbar';


export interface TurtleData {
  id?: number,
  timestamp: Date,
  ph: number,
  temp: number,
  turbidity: number,
  hardness: number,
  comments?: string,
  [key: string]: any
}

let GRAPH_LIMIT = 25;

const App: Component = () => {


  // Create the variables and signals relating to the values of the tank
  const valueTypes = ["ph", "temp", "turbidity", "hardness"];
  const values: { [key: string]: Signal<number[][]> } = {};
  valueTypes.forEach(valueType => values[valueType] = createSignal([]));

  // Create the charts
  const charts = []
  for (let i = 0; i < valueTypes.length / 2; i++) {
    charts.push(
      <div class={styles.ChartContainer}>
        <Chart id={valueTypes[i]} valueFunc={values[valueTypes[i]][0]} />
        <Chart id={valueTypes[i + 1]} valueFunc={values[valueTypes[i + 1]][0]} />
      </div>)
  }


  const updateValues = (data: TurtleData) => {
    for (let type in values) {
      if (!data[type]) continue;
      values[type][1](lastValue => {
        console.log(GRAPH_LIMIT - lastValue.length)
        return [...lastValue.slice(lastValue.length < GRAPH_LIMIT ? 0 : (GRAPH_LIMIT - lastValue.length) + 1), [new Date(data.timestamp).getTime(), data[type]]]
      });
    }
  }

  const updateValuesBulk = (data: TurtleData[]) => {
    for (let type in values) {
      if (!data.some(d => d[type])) continue;
      values[type][1](() => Array.from(data.map(d => [new Date(d.timestamp).getTime(), d[type]])));
    }
  }



  const ws = new WebSocket('ws://localhost:8080')


  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case "data-update":
        updateValues(data.data)
        break;

      case "data-bulk":
        updateValuesBulk(data.data)
        break;
    }

    // console.log(data)
    // setValues(values => [...values, [data[0], data[1]]])
    // console.log(getValues())
  })


  return (
    <>
      <Navbar />
      <ButtonBar ButtonInfo={[{ "link": "#", text: "fuck" }, { "link": "#", text: "fuck" }, { text: "fuck", callback: () => console.log("Shit fuck") }]} />
      {...charts}

      {/* <div class={styles.gap}/> */}


    </>
  )
};

export default App;
