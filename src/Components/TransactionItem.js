import * as React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    StatusBar,
    Text,
    Button,
    Alert,
    Pressable,
    Image,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { useHistory } from "react-router-dom";
import { app } from "../firebaseConfig";
import convertDate from "../ConvertDate";

export default function TransactionItem({ data }) {
    const [customer, setCustomer] = React.useState({});

    const history = useHistory();
    React.useEffect(() => {
        try {
            // const customer_db = app
            //     .database()
            //     .ref()
            //     .child(`/customers/${userCredential.user.uid}`);
            const customer_db = app
                .database()
                .ref()
                .child(`/customers/${data.customerId}`);
            customer_db.once("value", (snap) => {
                if (snap.val()) {
                    setCustomer(snap.val());
                }
            });
        } catch (error) {
            Alert.alert("Có lỗi xảy ra.");
        }
    }, []);

    return (
        <>
            {/* <View style={styles.Wraper}>
            <Text>Transaction Item</Text>
            <Pressable
                style={styles.btn_detal}
                onPress={() => {
                    Alert.alert("hello");
                }}
            >
                <Text style={styles.text_btn}>hello</Text>
            </Pressable>
            {showDetail ? (
                <View>
                    <Pressable
                        style={styles.btn_detal}
                        onPress={() => {
                            history.push({
                                pathname: './transaction-detail',
                                state: {data,customer}
                            });
                        }}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                        <Text style={styles.text_btn}>Detail</Text>
                    </Pressable>
                </View>
            ) : null}
        </View> */}
            <View style={styles.Wraper}>
                <View elevation={10} style={styles.Content}>
                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: 20,
                            color: "#fff",
                        }}
                    >
                        Mã vận chuyển: {data?.transportCode}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 10,
                        }}
                    >
                        <Image
                            source={require("../../assets/customer.jpg")}
                            style={{ width: 60, height: 60, marginRight: 20 }}
                        />
                        <View     style={{
                            color: "#fff",
                        }}>
                            <Text  style={{
                            color: "#fff",
                        }}>{customer.name}</Text>
                            <Text  style={{
                            color: "#fff",
                        }}>
                                Phone: {customer.phone}
                            </Text>
                            <Text  style={{
                            color: "#fff",
                        }}>
                                Ngày khởi tạo: {convertDate(data.initialTime)}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            color="#fff"
                            onPress={() => {
                                history.push({
                                    pathname: "./transaction-detail",
                                    state: { data, customer },
                                });
                            }}
                        >
                            <Text style={{ color: "white" }}>Chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    Wraper: {
        padding: 10,
        paddingBottom: 0,
        marginBottom: 0,
    },
    Content: {
        padding: 10,
        backgroundColor: "#28aecd",
        borderRadius: 8,
    },
    button: {
        backgroundColor: "blue",
        padding: 8,
        marginLeft: 10,
        color: "white",
        borderRadius: 5,
    },
    wrapInfo:{
        color: '#ffff'
    }
});
