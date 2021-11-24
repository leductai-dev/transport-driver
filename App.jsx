import React from "react";
import { StyleSheet, Text, View, ScrollView ,LogBox} from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Layout from "./src/Page/Layout";
import Login from "./src/Page/Login";
import Home from "./src/Page/Home";
import Transaction from "./src/Page/Transaction";
import History from "./src/Page/History";
import TransactionDetail from "./src/Page/TransactionDetail";
import { StatusBar } from "expo-status-bar";
import { applyMiddleware, composeEnhancer, createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./src/Reducers/Main";
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })

export default function App() {
    LogBox.ignoreLogs(['Remote debugger']);
    LogBox.ignoreLogs(['Setting a timer for a long period of time'])
    const store = createStore(Reducer);
    return (    
        <>
            <Provider store={store}>
                <NativeRouter>
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Route path="/" exact={true} component={Login} />
                            <Route
                                path="/home"
                                exact={true}
                                render={(props) => (
                                    <Layout>
                                        <Home />
                                    </Layout>
                                )}
                            />
                            <Route
                                path="/transaction"
                                exact={true}
                                render={(props) => (
                                    <Layout>
                                        <Transaction />
                                    </Layout>
                                )}
                            />
                            <Route
                                path="/history"
                                exact={true}
                                render={(props) => (
                                    <Layout>
                                        <History />
                                    </Layout>
                                )}
                            />
                            <Route
                                path="/transaction-detail"
                                exact={true}
                                render={(props) => (
                                    <Layout>
                                        <TransactionDetail />
                                    </Layout>
                                )}
                            />
                        </View>
                    </View>
                </NativeRouter>
            </Provider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        // backgroundColor: "yellow",
        flex: 1,
    },
    header: {
        fontSize: 20,
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "green",
    },
    content: {
        // backgroundColor: "green",
        flex: 1,
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: "center",
        fontSize: 15,
    },
});
