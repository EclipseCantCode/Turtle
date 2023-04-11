import { Component } from "solid-js";
import gStyles from "../../App.module.css"
import styles from "./navbar.module.css"


const NavbarComponent = (props: any) => {
    return <div class={gStyles.underlineEffect}> {props.text} </div>
}


const navBar: Component = () => {

    return (<div class={styles.navContainer}> <NavbarComponent text='Penis'/> <NavbarComponent text='lmao'/> <NavbarComponent text='lmao'/> </div>);
}

export default navBar;