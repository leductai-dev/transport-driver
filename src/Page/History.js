import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TransactionComponent from '../Components/Transaction';

const { width, height } = Dimensions.get("screen");


const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  Pending: ()=><TransactionComponent transactionType={'pending'}/>,
  Processing:()=><TransactionComponent transactionType={'processing'}/>,
  Completed: ()=><TransactionComponent transactionType={'completed'}/>
});

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Pending', title: 'Pending' },
    { key: 'Processing', title: 'In Process' },
    { key: 'Completed', title: 'Completed' },
  ]);

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
    color: 'blue',
    height: height - 63,
    width,
    position: 'relative',
    left: 0,
    top: 0
  },
  scene: {
    flex: 1,
  },
});
