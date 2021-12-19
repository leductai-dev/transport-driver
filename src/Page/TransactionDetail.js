import * as React from "react";
// import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    View,
    StyleSheet,
    Dimensions,
    StatusBar,
    Text,
    Button,
    Pressable,
    Image,
    ScrollView,
    Alert,
    Modal,
    TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { app } from "../firebaseConfig";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { useLocation, useHistory, useParams } from "react-router-dom";
const { width, height } = Dimensions.get("screen");

export default function TransactionDetail() {
    const location = useLocation();
    const history = useHistory();
    const params = useParams();
    const [mapRegion, setMapRegion] = React.useState(null);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [text, onChangeText] = React.useState("144312");

    const [date, setDate] = React.useState(new Date(1639155600000));
    const [mode, setMode] = React.useState("date");
    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    const [date2, setDate2] = React.useState(new Date(1639155600000));
    const [mode2, setMode2] = React.useState("date");
    const [show2, setShow2] = React.useState(false);

    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow2(Platform.OS === "ios");
        setDate2(currentDate);
    };

    const showMode2 = (currentMode) => {
        setShow2(true);
        setMode2(currentMode);
    };

    const showDatepicker2 = () => {
        showMode2("date");
    };

    const showTimepicker2 = () => {
        showMode2("time");
    };

    React.useEffect(() => {
        setMapRegion({
            latitude: 16.0774372,
            longitude: 108.1481306,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0421,
        });
    }, []);
    const { customer, data } = location.state;

    const handleComple = () => {
        const dateOne = new Date(date).getTime();
        const dateTwo = new Date(date2).getTime();
        const dateNow = new Date().getTime();
        if (dateOne < dateNow || dateTwo < dateNow || dateOne >= dateTwo) {
            Alert.alert("Vui chọn thời gian hợp lệ");
            return;
        }
        console.log(data);
        const db_Transaction = app
            .database()
            .ref()
            .child(`/transactions/${data.transactionId}`);
        const _data = {
            ...data,
            status: "inProgress",
            arrivalTime: dateOne,
            deliveryTime: dateTwo,
        };
        db_Transaction.update(_data).then(()=>{
            Alert.alert("Xử lý yêu cầu thành công");
                history.goBack()
        })
    };
    const handleDeliverySucces = () =>{
        const db_Transaction = app
        .database()
        .ref()
        .child(`/transactions/${data.transactionId}`);
        const _data = {
            ...data,
            status: "completed",
        };
        db_Transaction.update(_data).then(()=>{
            Alert.alert("Xử lý yêu cầu thành công");
                history.goBack()
        })
    }

    return (
        <View style={styles.Wraper}>
            <StatusBar style="auto" />
            <View style={styles.NavBar}>
                <Pressable
                    style={styles.btn_goBack}
                    onPress={() => {
                        history.goBack();
                    }}
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                    <Text fontSize={24} style={styles.text_btn}>
                        Chi tiết chuyến hàng
                    </Text>
                </Pressable>
            </View>

            <View style={{ padding: 10, marginBottom: 20 }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#1b3a57",
                    }}
                >
                    Thông tin khách hàng
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                    }}
                >
                    <Image
                        source={{
                            uri: "https://reactnative.dev/img/tiny_logo.png",
                        }}
                        style={{
                            width: 60,
                            height: 60,
                            marginRight: 20,
                        }}
                    />
                    <View style={styles.wrapInfo}>
                        <Text style={styles.clName}>
                            Tên khách hàng:{customer.name}
                        </Text>
                        <Text style={styles.clPhone}>
                            Phone: {customer.phone}
                        </Text>
                        <Text style={styles.clEmail}>
                            Email: {customer.email}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ padding: 10, marginBottom: 20 }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#1b3a57",
                    }}
                >
                    Thông tin gửi hàng
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                    }}
                >
                    <Image
                        source={require("../../assets/userLocation.png")}
                        style={{
                            width: 60,
                            height: 60,
                            marginRight: 20,
                        }}
                    />
                    <View style={styles.wrapInfo}>
                        <Text style={styles.clName}>
                            Người gửi: {data.shippingInfo.sender.name}
                        </Text>
                        <Text style={styles.clPhone}>
                            Số điện thoại: {data.shippingInfo.sender.phone}
                        </Text>
                        <Text style={styles.clEmail}>
                            Địa chỉ lấy hàng: {data.shippingInfo.sender.address}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 10, marginBottom: 20 }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#1b3a57",
                    }}
                >
                    Thông tin nhận hàng
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                    }}
                >
                    <Image
                        source={require("../../assets/destination.png")}
                        style={{
                            width: 60,
                            height: 60,
                            marginRight: 20,
                        }}
                    />
                    <View style={styles.wrapInfo}>
                        <Text style={styles.clName}>
                            Người nhận: {data.shippingInfo.receiver.name}
                        </Text>
                        <Text style={styles.clPhone}>
                            Số điện thoại: {data.shippingInfo.receiver.phone}
                        </Text>
                        <Text style={styles.clEmail}>
                            {data.shippingInfo.receiver.address}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 10, marginBottom: 20 }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#1b3a57",
                    }}
                >
                    Thông tin sản phẩm
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                    }}
                >
                    <View style={styles.wrapInfo}>
                        <Text style={{ marginBottom: 5 }}>
                            Tên sản phầm:{" "}
                            {data.shippingInfo.productInfo.productName}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 2,
                            }}
                        >
                            <Text style={{ width: "50%" }}>
                                Chiều dài:{" "}
                                {data.shippingInfo.productInfo.length} (m)
                            </Text>
                            <Text style={{ width: "50%" }}>
                                Chiều rộng(m):{" "}
                                {data.shippingInfo.productInfo.width} (m)
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 4,
                            }}
                        >
                            <Text style={{ width: "50%" }}>
                                Chiều cao:{" "}
                                {data.shippingInfo.productInfo.height} (m)
                            </Text>
                            <Text style={{ width: "50%" }}>
                                Khối lượng:{" "}
                                {data.shippingInfo.productInfo.weight} (kg)
                            </Text>
                        </View>
                        <Text style={styles.clPhone}>Ghi chú: {data.note}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <ScrollView horizontal={true}>
                        <Image
                            source={require("../../assets/product.jpg")}
                            style={{
                                resizeMode: "contain",
                                width: 120,
                                height: 80,
                                marginRight: 10,
                            }}
                        />
                        <Image
                            source={require("../../assets/product.jpg")}
                            style={{
                                resizeMode: "contain",
                                width: 120,
                                height: 80,
                                marginRight: 10,
                            }}
                        />
                        <Image
                            source={require("../../assets/product.jpg")}
                            style={{
                                resizeMode: "contain",
                                width: 120,
                                height: 80,
                                marginRight: 10,
                            }}
                        />
                    </ScrollView>
                </View>
            </View>

            <View style={{ padding: 10, marginBottom: 20 }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#1b3a57",
                    }}
                >
                    Ví trị trên bản đồ
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                    }}
                >
                    <MapView
                        initialRegion={mapRegion}
                        mapType="terrain"
                        style={{
                            position: "relative",
                            height: 400,
                            width: "100%",
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: 16.0774372,
                                longitude: 108.1481306,
                            }}
                            pinColor={"purple"} // any color
                            title={"title"}
                            description={"description"}
                        />
                    </MapView>
                </View>
            </View>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <View style={styles.boxTime}>
                                    <Text style={styles.dukien}>
                                        Dự kiến lấy hàng
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Button
                                            style={{ width: 100 }}
                                            onPress={showTimepicker}
                                            title={`${new Date(
                                                date
                                            ).toLocaleTimeString()}`}
                                        />
                                        <Button
                                            style={{ minWidth: 100 }}
                                            onPress={showDatepicker}
                                            title={`${new Date(
                                                date
                                            ).toLocaleDateString()}`}
                                        />
                                    </View>
                                </View>
                                <View style={styles.boxTime}>
                                    <Text style={styles.dukien}>
                                        Dự kiến giao hàng
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Button
                                            style={{ width: 100 }}
                                            onPress={showTimepicker2}
                                            title={`${new Date(
                                                date2
                                            ).toLocaleTimeString()}`}
                                        />
                                        <Button
                                            style={{ minWidth: 100 }}
                                            onPress={showDatepicker2}
                                            title={`${new Date(
                                                date2
                                            ).toLocaleDateString()}`}
                                        />
                                    </View>
                                </View>

                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                                {show2 && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date2}
                                        mode={mode2}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange2}
                                    />
                                )}
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                }}
                            >
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
                                >
                                    <Text style={styles.textStyle}>Hủy bỏ</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose2]}
                                    onPress={() => handleComple()}
                                >
                                    <Text style={styles.textStyle}>
                                        Hoàn tất
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

               {data?.status === "driverPending" &&  <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        paddingBottom: 30,
                        marginBottom: 0,
                    }}
                >
                    <Pressable
                        style={[styles.mybtn]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Từ chối yêu cầu</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.mybtn, styles.mybtn2]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>
                            Xác nhận vận chuyển
                        </Text>
                    </Pressable>
                </View>}
                {data?.status === "inProgress" &&  <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        paddingBottom: 30,
                        marginBottom: 0,
                    }}
                >
                    <Pressable
                        style={[styles.mybtn, styles.mybtn2]}
                        onPress={() => handleDeliverySucces()}
                    >
                        <Text style={styles.textStyle}>
                           Xác nhận đã giao
                        </Text>
                    </Pressable>
                </View>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Wraper: {
        backgroundColor: "#fff",
        width,
        zIndex: 10000,
    },
    NavBar: {
        padding: 10,
        color: "black",
        marginBottom: 10,
        backgroundColor: "green",
        flexDirection: "row",
        alignItems: "center",
    },
    btn_goBack: {
        flexDirection: "row",
        alignItems: "center",
    },
    text_btn: {
        fontSize: 20,
        fontWeight: "bold",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 50,
        width: 300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        marginTop: 50,
        borderRadius: 10,
        width: 80,
    },
    buttonClose2: {
        backgroundColor: "#2196F3",
        marginTop: 50,
        marginLeft: 10,
        borderRadius: 10,
        width: 80,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    dukien: {
        marginBottom: 15,
        textAlign: "left",
    },
    boxTime: {
        paddingTop: 10,
        paddingBottom: 10,
        width: 200,
    },
    buttonOpen1: {
        borderRadius: 10,
        backgroundColor: "blue",
    },
    mybtn: {
        backgroundColor: "blue",
        paddingTop: 25,
        color: "#fff",
        height: 80,
        lineHeight: 80,
        borderRadius: 10,
        width: 180,
        fontSize: 22,
    },
    mybtn2: {
        marginLeft: 10,
    },
});
