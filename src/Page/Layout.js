import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import History from "./History";
import Transaction from "./Transaction";
import Home from "./Home";
import { AntDesign } from "@expo/vector-icons";

export default function App({ children }) {
    return (
        <>
            {/* <View>{children}</View> */}
            <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
            <View style={styles.nav}>
                <Link
                    to="/transaction"
                    underlayColor="#f0f4f7"
                    style={styles.navItem}
                >
                   
                    <Text style={styles.navName}>Thông báo</Text>
                </Link>
                <Link to="/home" underlayColor="#f0f4f7" style={styles.navItem}>
                    <Text style={styles.navName}>Trang chủ</Text>
                </Link>
                <Link
                    to="/history"
                    underlayColor="#f0f4f7"
                    style={styles.navItem}
                >
                    <Text style={styles.navName}>Giao dịch</Text>
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
        justifyContent: "space-between",
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
        backgroundColor: "#28aecd",
    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: "center",
        fontSize: 15,
    },
    navName: {
        fontWeight: "bold",
        fontSize: 16,
        color: "white",
    },
});
