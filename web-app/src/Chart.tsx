import { Component } from "solid-js";
import { SolidApexCharts } from "solid-apexcharts";
import styles from "./App.module.css";

interface ChartProps {
    id: string;
    valueFunc: () => number[][];
}


const Chart: Component<ChartProps> = (props) => {

    const settings = {
        chart: {
            id: props.id,
            toolbar: { show: false }
        },
        xaxis: { type: "datetime" },
        stroke: {
            curve: "smooth"
        },
        yaxis: {
            forceNiceScale: true,
            decimalsInFloat: 2
        }

    }

    const getSeries = () => {
        const data: { x: number; y: number; }[] = []

        props.valueFunc().forEach((value) => data.push({
            x: value[0],
            y: value[1]
        }))

        return data

    }
    return <div class={styles.Chart}> <h1>{props.id}</h1> <SolidApexCharts width="150%" type="line" options={settings} series={[{ "name": "test", "data": getSeries() }]} /> </div>
}


export default Chart;