import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import MapView from "react-native-maps";
import React, { useState } from "react";
const Transaction = () => (
    <View>
      <View style={{
        width: 50, height: 50, backgroundColor: 'powderblue'
      }} />
      <View style={{
        width: 100, height: 100, backgroundColor: 'skyblue'
      }} />
      <View style={{
        width: 150, height: 150, backgroundColor: 'steelblue'
      }} />
    </View>
)
export default Transaction;
