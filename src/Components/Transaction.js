import {
    View,
    StyleSheet,
    Dimensions,
    StatusBar,
    Text,
    ScrollView,
    TextInput,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import TransantionItem from "./TransactionItem";
import { EvilIcons } from "@expo/vector-icons";
import { app } from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TransactionComponent({ transactionType }) {
    const [data, setData] = React.useState([]);

    const currentUser = useSelector((state) => state.user).currentUser;
    React.useEffect(() => {
        const db_Transactions = app
            .database()
            .ref()
            .child(`/system/transactions/${transactionType}`);
        db_Transactions.on("value", (snap) => {
            if (snap.val()) {
                const value = Object.values(snap.val())
                 const myTransactions  = []
                  value.forEach(
                    (transaction) => {
                        if(transaction.driverId !== currentUser.driverId){
                            myTransactions.push(transaction)
                        }
                    }
                );
                setData(myTransactions);
            }
        });
    }, []);
    return (
        <>
            <StatusBar style="auto" />

            <View style={styles.search_container}>
                <View style={styles.search_wraper}>
                    <TextInput
                        style={styles.search}
                        placeholder="Enter something to filter..."
                        editable
                        maxLength={40}
                    />
                    <Text style={styles.search_icon}>
                        <EvilIcons name="search" size={26} color="black" />
                    </Text>
                </View>
            </View>
            <ScrollView style={[styles.scene]}>
                {data &&
                    data.map((transaction,index) => {
                        return <TransantionItem data={transaction} key={index} />;
                    })} 
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
  
    scene: {
        flex: 1,
    },
    search_container: {
        top: 0,
        marginTop: 0,
        padding: 10,
    },
    search_wraper: {
        position: "relative",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    search: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 50,
        color: "black",
        padding: 12,
        borderColor: "gray",
    },
    search_icon: {
        position: "absolute",
        top: "30%",
        right: 20,
    },
});
