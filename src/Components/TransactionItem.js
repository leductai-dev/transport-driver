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

export default function TransactionItem({ data }) {
    const [customer, setCustomer] = React.useState({});

    const history = useHistory();
    console.log(data);
    React.useEffect(() => {
        try {
            // const customer_db = app
            //     .database()
            //     .ref()
            //     .child(`/customers/${userCredential.user.uid}`);
            const customer_db = app
                .database()
                .ref()
                .child("/Customers/FBPlVDzJlVNDRDGRohP2L03ahc02");
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
                <View elevation={3} style={styles.Content}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "#1b3a57",
                        }}
                    >Mã vận chuyển: TP-578-458</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 10,
                        }}
                    >
                        <Image
                            source={{
                                uri: "https://reactnative.dev/img/tiny_logo.png",
                            }}
                            style={{ width: 60, height: 60, marginRight: 20 }}
                        />
                        <View style={styles.wrapInfo}>
                            <Text style={styles.clName}>{customer.name}</Text>
                            <Text style={styles.clPhone}>Phone: {customer.phone}</Text>
                            <Text style={styles.clEmail}>Ngày khởi tạo: 20/12/2021</Text>
                            
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'flex-end',
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                history.push({
                                    pathname: "./transaction-detail",
                                    state: { data, customer },
                                });
                            }}
                        >
                            <Text style={{color: 'white'}}>Từ chối</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            color='#fff'
                            onPress={() => {
                                // history.push({
                                //     pathname: "./transaction-detail",
                                //     state: { data, customer },
                                // });
                            }}
                        >
                            <Text style={{color: 'white'}}>Chi tiết</Text>
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
        backgroundColor: "cadetblue",
        borderRadius: 8
    },
    button:{
        backgroundColor: 'blue',
        padding: 8,
        marginLeft: 10,
        color: 'white',
        borderRadius: 5
    }
});
