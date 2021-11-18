import {
    StyleSheet,
    Text,
    Button,
    View,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity,
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
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log(text);
        const db_Drivers = app.database().ref().child(`/drivers`);
        try {
            db_Drivers.on("value", (snap) => {
                if (snap.val()) {
                    let isTrue = false;
                    let currentUser;
                    Object.values(snap.val()).forEach((driver) => {
                        if (driver.loginCode == text) {
                            isTrue = true;
                            currentUser = driver;
                        }
                    });
                    if (isTrue) {
                        dispatch(loginUser(currentUser));
                            history.push("/home");
                    } else {
                        Alert.alert(
                            "Mã đăng nhập không đúng. Vui lòng thử lại!"
                        );
                    }
                } else {
                    Alert.alert("Có lỗi xảy ra.");
                }
            });
        } catch (error) {
            Alert.alert("Có lỗi xảy ra.");
        }
    };

    return (
        <View style={styles.wraper}>
            <Image
                style={styles.tinyLogo}
                source={require("../../assets/logon.png")}
            />

            <Link to="/home" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Login</Text>
            </Link>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <Button
                title="Sign in"
                color="#f194ff"
                onPress={() => handleSubmit()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
