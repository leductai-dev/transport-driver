import {
    StyleSheet,
    Text,
    Button,
    View,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Pressable,
    Alert,
} from "react-native";
import { Link } from "react-router-native";
import React, { useState, useEffect } from "react";
import { app } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Actions/Actions";

const Login = () => {
    const [text, onChangeText] = React.useState("421602");
    const [loading, setLoading] = React.useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log(1);
        setLoading(true)
        const db_Drivers = app
            .database()
            .ref()
            .child(`/drivers`)
            .orderByChild("code")
            .equalTo(421602);

        db_Drivers.on("value", (snap) => {
            if (snap.val()) {
                console.log(1);
                dispatch(loginUser(Object.values(snap.val())[0]));
                history.push("/home");
            } else {
                Alert.alert("Mã đăng nhập không đúng. Vui lòng thử lại!");
            }
        });
    };

    return (
        <View style={styles.wraper}>
            <Image
                style={styles.tinyLogo}
                source={require("../../assets/logon.png")}
            />

            <Link to="/home" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Nhập mã để đăng nhập!</Text>
            </Link>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <Pressable style={styles.SignButton} onPress={() => handleSubmit()}>
                <Text style={styles.signText}>Đăng nhập</Text>
               {loading &&  <ActivityIndicator size="large" color="#fff" />}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    signText: {
        color: "white",
        textAlign:'center',
        fontWeight: 'bold',
    },
    SignButton: {
        borderRadius: 10,
        width: 150,
        height: 50,
        backgroundColor: "blue",
        textAlign:'center',
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    wraper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    login: {
        backgroundColor: "red",
        color: "black",
    },
    tinyLogo: {
        marginTop: 70,
        resizeMode: "contain",
        width: 300,
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Login;
