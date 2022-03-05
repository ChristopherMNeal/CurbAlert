import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  Image,
  Button,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import 'react-native-get-random-values';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import HomeScreen from './HomeScreen';
import ItemList from './ItemList';
import AddItem from './AddItem';
import {v4 as uuid} from 'uuid';
import ItemDetail from './ItemDetail';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Logo from './../assets/logo.jpeg';

const Stack = createNativeStackNavigator();

const App = () => {
  function LogoTitle() {
    return <Image style={{width: 50, height: 50}} source={Logo} />;
  }

  function ItemForm({navigation}) {
    return (
      <View style={styles.list}>
        <AddItem addItem={addItem} calculateDistance={calculateDistance} />
        <Button
          title="Submit"
          onPress={() => navigation.navigate('ItemList')}
        />
      </View>
    );
  }

  function ItemDetailFunc({navigation}) {
    return (
      <View style={styles.list}>
        <ItemDetail item={selectedItem} deleteItem={deleteItem} />
      </View>
    );
  }

  const [selectedItem, setSelectedItem] = useState({});
  const handleSelectingItem = id => {
    const changeSelectedItem = items.filter(item => item.id === id)[0];
    setSelectedItem(changeSelectedItem);
    // STILL NOT SURE HOW TO MAKE THIS WORK. THIS IS THE FORMAT FOR PASSING PROPS
    // I think i should be passing just the item ID instead of the whole item
    // should store the whole item in a global store instead
    // navigation.navigate('ItemDetail', {item: changeSelectedItem});
  };

  const calculateDistance = () => {
    return (Math.random() * 3).toFixed(1);
  };

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const addItem = (text, description, distance) => {
    // const {navigation} = NavigationContainer;
    setItems(prevItems => {
      return [{id: uuid(), text, description, distance}, ...prevItems];
    });
    // I was trying to add navigation to the button here
    // navigation.goBack();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#014351',
          },
          headerTintColor: '#E4F1F1',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {/* <Stack.Screen name="Header" component={Header} /> */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddItem"
          component={ItemForm}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <Icon
                name="bars"
                size={20}
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#E4F1F1"
              />
            ),
            // title: 'Add an item!',
            // headerStyle: {
            //   backgroundColor: '#f4511e',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
          }}
        />
        {/* PASSING IN PROPS THIS WAY NOT WORKING
        {props => <ItemForm {...props} calculateDistance={calculateDistance} addItem={addItem} />} */}
        <Stack.Screen
          name="ItemList"
          component={ItemList}
          options={{title: 'Items'}}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailFunc}
          // Pass in the item name as a param to display that as a title
          // options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  text: {
    color: 'darkslateblue',
    fontSize: 40,
  },
  img: {
    width: 200,
    height: 200,
  },
  list: {
    flex: 1,
    marginBottom: 100,
  },
});

export default App;