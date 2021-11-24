import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);
    const [showOptions, setshowOptions] = useState(false);
    const [totalTransaction, setTotalTransaction] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const currentUser = useSelector((state) => state.user);
    const [token, setToken] = React.useState(null);
    const [active, setActive] = React.useState("all");

    async function registerForPushNotificationsAsync() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        return token;
    }

    useEffect(() => {
        (async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission to access location was denied");
                }

                let location = await Location.getCurrentPositionAsync({});
                setCurrentLocation({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                    longitudeDelta: 0.0922,
                    latitudeDelta: 0.0421,
                });

                setMapRegion({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                    longitudeDelta: 0.0922,
                    latitudeDelta: 0.0421,
                });
            } catch (error) {
                Alert.alert(error);
            }
        })();
    }, []);
    
    React.useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            console.log("-----token--------")
            console.log(token)
            const db_Drivers = app
            .database()
            .ref()
            .child(`/drivers/${currentUser.currentUser.driverId}`)
            const data = {...currentUser.currentUser ,tokenId:token}
            db_Drivers.update(data)
        });
        const subA = Notifications.addNotificationReceivedListener(
            (notification) => {}
        );
        return () => {
            Notifications.removeNotificationSubscription(subA);
        };
    }, []);

    useEffect(() => {
        const db_Transactions = app
            .database()
            .ref()
            .child(`/transactions`)
            .orderByChild("driverId")
            .equalTo(currentUser.currentUser.driverId);
        db_Transactions.on("value", (snap) => {
            if (snap.val()) {
                const result = Object.values(snap.val()).filter(
                    (transaction) =>
                        transaction.driverId === currentUser.driverId
                );
                setTotalTransaction(Object.values(snap.val()));
                setTransactions(Object.values(snap.val()));
            }
        });
    }, []);

    const ShowTransaction = useCallback(() => {
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

            const senderAdd = transaction.shippingInfo.sender.address
            const receiverAdd = transaction.shippingInfo.receiver.address

            return (
                <React.Fragment key={index}>
                    <Marker
                        image={require("../../assets/userLocation.png")}
                        coordinate={fromAddress}
                        pinColor={"purple"}
                        title={"Nơi lấy hàng"}
                        description={senderAdd}
                    />
                    <Marker
                        image={require("../../assets/destination.png")}
                        coordinate={toAddress}
                        pinColor={"purple"}
                        title={"Nơi giao hàng"}
                        description={receiverAdd}
                    />
                </React.Fragment>
            );
        });
        return view;
    }, [transactions]);

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={mapRegion}
                mapType="terrain"
                style={styles.mapView}
            >
                {currentLocation && (
                    <Marker
                        image={require("../../assets/teamLocation.png")}
                        coordinate={currentLocation}
                        pinColor={"purple"}
                        title={"title"}
                        description={"description"}
                    />
                )}
                {transactions ? <ShowTransaction /> : null}
            </MapView>

            {showOptions ? (
                <Pressable
                    style={[styles.options_bar, {}]}
                    onPress={() => {
                        setshowOptions(false);
                    }}
                ></Pressable>
            ) : (
                <Pressable
                    style={styles.btn_view_options}
                    onPress={() => {
                        setshowOptions(true);
                    }}
                >
                    <Ionicons name="md-menu" size={38} color="blue" />
                </Pressable>
            )}
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
                        style={({ pressed }) => [
                            {
                                backgroundColor:
                                    active === "all" ? "green" : "blue",
                            },
                            styles.item_viewmode,
                        ]}
                        onPress={() => {
                            setTransactions(totalTransaction);
                            setshowOptions(false);
                            setActive("all");
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                fontWeight: "600",
                            }}
                        >
                            Hiển thị tất cả
                        </Text>
                    </Pressable>
                    {totalTransaction &&
                        totalTransaction.map((tran, index) => {
                            return (
                                <Pressable
                                    key={index}
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor:
                                                active === tran.transportCode
                                                    ? "green"
                                                    : "blue",
                                        },
                                        styles.item_viewmode,
                                    ]}
                                    onPress={() => {
                                        setTransactions([tran]);
                                        setshowOptions(false);
                                        setActive(tran.transportCode);
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 20,
                                            fontWeight: "600",
                                        }}
                                    >
                                        {tran.transportCode}
                                    </Text>
                                </Pressable>
                            );
                        })}
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "blue",
        width,
        height: height - 45,
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
        top: 25,
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
        borderBottomColor: "white",
        borderBottomWidth: 1,
    },
});

export default HomeScreen;
