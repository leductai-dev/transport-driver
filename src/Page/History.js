import * as React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    StatusBar,
    Text,
    ScrollView,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TransactionComponent from "../Components/Transaction";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebaseConfig";

const { width, height } = Dimensions.get("screen");

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewExample() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "Pending", title: "Chờ xử lý" },
        { key: "Processing", title: "Đang giao" },
        { key: "Completed", title: "Đã giao" },
    ]);
    const [pending, setPending] = React.useState([]);
    const [inProgress, setInProgress] = React.useState([]);
    const [compeleted, setCompeleted] = React.useState([]);

    const currentUser = useSelector((state) => state.user);
    React.useEffect(() => {
        const db_Transactions = app
            .database()
            .ref()
            .child(`/transactions`)
            .orderByChild("driverId")
            .equalTo(currentUser.currentUser.driverId);

        db_Transactions.on("value", (snap) => {
            if (snap.val()) {
                const value = Object.values(snap.val());
                const _pending = [];
                const _inProgress = [];
                const _compeleted = [];
                value.forEach((transaction) => {
                    if (transaction.status === "driverPending") {
                        _pending.push(transaction);
                    }
                    if (transaction.status === "inProgress") {
                        _inProgress.push(transaction);
                    }
                    if (transaction.status === "completed") {
                        _compeleted.push(transaction);
                    }
                });
                setPending(_pending);
                setInProgress(_inProgress);
                setCompeleted(_compeleted);
            }
        });
        return db_Transactions.off("value", ()=>{
            console.log("off")
        })
    }, []);

    const renderScene = SceneMap({
        Pending: () => <TransactionComponent transactions={pending} />,
        Processing: () => (
            <TransactionComponent transactions={inProgress} />
        ),
        Completed: () => <TransactionComponent transactions={compeleted} />,
    });
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        color: "blue",
        height: 1500,
        width,
        position: "relative",
        left: 0,
        top: 0,
    },
    scene: {
        flex: 1,
    },
});
