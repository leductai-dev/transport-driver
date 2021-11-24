import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import History from "./History";
import Transaction from "./Transaction";
import Home from "./Home";

export default function App({ children }) {
    return (
        <>
            {/* <View>{children}</View> */}
            <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
            <View style={styles.nav}>
                <Link to="/home" underlayColor="#f0f4f7" style={styles.navItem}>
                    <Text  style={styles.navName}>HOME</Text>
                </Link>
                <Link
                    to="/transaction"
                    underlayColor="#f0f4f7"
                    style={styles.navItem}
                >
                    <Text  style={styles.navName}>History</Text>
                </Link>
                <Link
                    to="/history"
                    underlayColor="#f0f4f7"
                    style={styles.navItem}
                >
                    <Text  style={styles.navName}>Transaction</Text>
                </Link>
            </View>
        </>
        // <View style={styles.container}>
        //     <View style={styles.content}>{children}</View>

        //     <View style={styles.nav}>
        //         <Link to="/home" underlayColor="#f0f4f7" style={styles.navItem}>
        //             <Text>HOME</Text>
        //         </Link>
        //         <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
        //             <Text>History</Text>
        //         </Link>
        //         <Link
        //             to="/home/transaction"
        //             underlayColor="#f0f4f7"
        //             style={styles.navItem}
        //         >
        //             <Text>Transaction</Text>
        //         </Link>
        //     </View>

        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        backgroundColor: "yellow",
        flex: 1,
    },
    header: {
        fontSize: 20,
    },
    nav: {
        height: 45,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "green",
    },
    content: {
        backgroundColor: "orange",
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        color: "red",
        backgroundColor: "blue",

    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: "center",
        fontSize: 15,
    },
    navName:{
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    }
});
