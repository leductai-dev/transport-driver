import * as React from "react";
// import { StatusBar } from "expo-status-bar";
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
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { app } from "../firebaseConfig";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { useLocation, useHistory } from "react-router-dom";
const { width, height } = Dimensions.get("screen");

export default function TransactionDetail() {
    const location = useLocation();
    const history = useHistory();
    const [mapRegion, setMapRegion] = React.useState(null);
    // const {customer, data} = location.state
    console.log("location")
    // console.log(location)
    React.useEffect(() => {
        setMapRegion({
            latitude: 16.0774372,
            longitude: 108.1481306,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0421,
        });
    }, [location]);

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
                        <Text style={styles.clName}>customer.name</Text>
                        <Text style={styles.clPhone}>
                            Phone: customer.phone
                        </Text>
                        <Text style={styles.clEmail}>
                            Email: ductaidn992@gmail.com
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
                            Người gửi: customer.name
                        </Text>
                        <Text style={styles.clPhone}>
                            Số điện thoại: customer.phone
                        </Text>
                        <Text style={styles.clEmail}>Địa chỉ lấy hàng</Text>
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
                            Người nhận: customer.name
                        </Text>
                        <Text style={styles.clPhone}>
                            Số điện thoại: customer.phone
                        </Text>
                        <Text style={styles.clEmail}>Địa chỉ lấy hàng</Text>
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
                            Tên sản phầm: this is tên sản phẩm
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 2,
                            }}
                        >
                            <Text style={{ width: "50%" }}>
                                Chiều dài: 1 (m)
                            </Text>
                            <Text style={{ width: "50%" }}>
                                Chiều rộng(m): 1 (m)
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
                                Chiều cao: 1 (m)
                            </Text>
                            <Text style={{ width: "50%" }}>
                                Khối lượng: 1 (kg)
                            </Text>
                        </View>
                        <Text style={styles.clPhone}>
                            Ghi chú: customer.phone
                        </Text>
                    </View>
                </View>
                <View style={{marginTop: 15}}>
                    <ScrollView horizontal={true}>
                        <Image
                            source={require("../../assets/product.jpg")}
                            style={{
                                resizeMode: "contain",
                                width: 120,
                                height: 80,
                                marginRight: 10
                            }}
                        />
                              <Image
                            source={require("../../assets/product.jpg")}
                            style={{
                                resizeMode: "contain",
                                width: 120,
                                height: 80,
                                marginRight: 10
                            }}
                        />
                        <Image
                            source={require("../../assets/product.jpg")}
                            style={{
                                resizeMode: "contain",
                                width: 120,
                                height: 80,
                                marginRight: 10
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
});
