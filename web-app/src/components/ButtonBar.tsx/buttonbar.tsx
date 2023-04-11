import { Component, createSignal, For, Show } from "solid-js";
import gStyles from "../../App.module.css"
import styles from "./buttonbar.module.css";

interface ButtonInfo {
    link?: string;
    target?: string;
    text: string;
    callback?: (event: MouseEvent) => void;
}


const ButtonBar: Component<{ ButtonInfo: ButtonInfo[] }> = (props) => {

    const [getSelected, setSelected] = createSignal(0)

    return <div class={styles.ButtonBar}>
        <For each={props.ButtonInfo}>
            {(item, index) => <a href={item.link} target={item.target ?? "_blank"}

                onClick={(args) => {
                    if (!item.callback) return;
                    setSelected(index())
                    item.callback(args)
                }}>

                <button classList={
                    {
                        [gStyles.underlineEffect]: true,
                        [styles.Selected]: index() == getSelected(),
                        [styles.First]: index() == 0,
                        [styles.Last]: index() + 1 == props.ButtonInfo.length
                    }}>
                    {item.text}
                </button>
            </a>}
        </For>
    </div>
}

export default ButtonBar;