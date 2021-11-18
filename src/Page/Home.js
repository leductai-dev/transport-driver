import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Pressable,
    Alert,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeRouter, Route, Link } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);
    const [showOptions, setshowOptions] = useState(false);
    const [totalTransaction, setTotalTransaction] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const currentUser = useSelector((state) => state.user).currentUser;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
            }
            try {
                let location = await Location.getCurrentPositionAsync({});
                console.log(location);
                setMapRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    longitudeDelta: 0.0922,
                    latitudeDelta: 0.0421,
                });
                setCurrentLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                Alert.alert("Có lôi xảy ra!");
                throw error;
            }
        })();
    }, []);

    useEffect(() => {
        // console.log(currentUser.currentUser);
        const db_Transactions = app
            .database()
            .ref()
            .child(`/system/transactions/pending`);
        db_Transactions.on("value", (snap) => {
            if (snap.val()) {
                //    const result =  Object.values(snap.val()).filter(transaction=>transaction.driverId === currentUser.driverId)
                //    totalTransaction(result)
                const result = Object.values(snap.val()).filter(
                    (transaction) =>
                        transaction.driverId === currentUser.driverId
                );
                setTotalTransaction(Object.values(snap.val()));
                setTransactions(Object.values(snap.val()));
            }
        });
    }, []);

    const ShowTransaction = () => {
        console.log("---------Tran____");
        console.log(transactions);
        const view = transactions.map((transaction, index) => {
            const senderLat = Number(transaction.shippingInfo.sender.lat);
            const senderLong = Number(transaction.shippingInfo.sender.long);
            const receiverLat = Number(transaction.shippingInfo.receiver.lat);
            const receiverLong = Number(transaction.shippingInfo.receiver.long);

            const fromAddress = { latitude: senderLat, longitude: senderLong };
            const toAddress = {
                latitude: receiverLat,
                longitude: receiverLong,
            }; 
            return (
                <React.Fragment key={index}>
                    <Marker 
                        image={require("../../assets/userLocation.png")}
                        coordinate={fromAddress}
                        pinColor={"purple"}
                        title={"title"}
                        description={"description"}
                    />
                    <Marker 
                        image={require("../../assets/destination.png")}
                        coordinate={toAddress}
                        pinColor={"purple"}
                        title={"title"}
                        description={"description"}
                    />
                </React.Fragment>
            );
        });
        return view
    };

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={mapRegion}
                mapType="terrain"
                style={styles.mapView}
            >
                {/* {currentLocation && (
                    <Marker
                        image={require("../../assets/userLocation.png")}
                        coordinate={currentLocation}
                        pinColor={"purple"}
                        title={"title"}
                        description={"description"}
                    />
                )} */}
                    {transactions ? (
                        <ShowTransaction/>
                        
                    ):null}
            </MapView>

            <Pressable
                style={styles.btn_view_options}
                onPress={() => {
                    setshowOptions(true);
                }}
            >
                <Ionicons name="md-menu" size={38} color="white" />
            </Pressable>

            {showOptions ? (
                <Pressable
                    style={[styles.options_bar, {}]}
                    onPress={() => {
                        setshowOptions(false);
                    }}
                ></Pressable>
            ) : null}
            {showOptions ? (
                <View style={[styles.options_bar_content]}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            backgroundColor: "#764abc",
                            padding: 20,
                            fontWeight: "bold",
                        }}
                    >
                        Chọn chế độ hiển thị
                    </Text>
                    <Pressable
                        style={styles.item_viewmode}
                        onPress={() => {
                            alert("change view mode");
                        }}
                    >
                        <Text style={{ color: "black", fontSize: 20 }}>
                            Select Item
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.item_viewmode}
                        onPress={() => {
                            alert("change view mode");
                        }}
                    >
                        <Text style={{ color: "black", fontSize: 20 }}>
                            Select Item
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.item_viewmode}
                        onPress={() => {
                            alert("change view mode");
                        }}
                    >
                        <Text style={{ color: "black", fontSize: 20 }}>
                            Select Item
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.item_viewmode}
                        onPress={() => {
                            alert("change view mode");
                        }}
                    >
                        <Text style={{ color: "black", fontSize: 20 }}>
                            Select Item
                        </Text>
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "blue",
        width,
        height,
        position: "relative",
    },
    mapView: {
        position: "relative",
        height: "100%",
        zIndex: -1,
    },
    circle: {
        width: 26,
        height: 26,
        borderRadius: 50,
    },
    stroke: {
        backgroundColor: "#ffffff",
        borderRadius: 50,
        width: "100%",
        height: "100%",
        zIndex: 1,
    },
    core: {
        backgroundColor: "red",
        width: 24,
        position: "absolute",
        top: 1,
        left: 1,
        right: 1,
        bottom: 1,
        height: 24,
        borderRadius: 50,
        zIndex: 2,
    },
    btn_view_options: {
        position: "absolute",
        top: 35,
        right: 25,
    },
    options_bar: {
        position: "absolute",
        width,
        height,
        top: 0,
        right: 0,
        color: "#fff",
        backgroundColor: "#1006066e",
    },
    options_bar_content: {
        height,
        width: 240,
        backgroundColor: "#fff",
        position: "absolute",
        top: 0,
        left: 0,
    },
    item_viewmode: {
        padding: 15,
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
});

export default HomeScreen;