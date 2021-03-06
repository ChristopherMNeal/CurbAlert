import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {db} from './../firebase/firebase-config';
import {collection, getDocs, doc, setDoc, Timestamp} from 'firebase/firestore';
import {windowWidth, windowHeight} from '../utils/Dimensions';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {getLocation} from '../utils/getLocation';
import {useFocusEffect} from '@react-navigation/native';
import {getDistance} from './../utils/getDistance';

function ItemList({navigation, route}) {
  const [itemList, setItemList] = useState({empty: true});
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {params} = route;

  const messageDisplay = () => {
    if (params) {
      const now = new Date().getTime();
      if (params.message && now - params.messageTimeOut < 10000) {
        return (
          <View style={styles.item}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {params.message}
            </Text>
          </View>
        );
      }
    }
  };

  const getData = async () => {
    setIsLoading(true);
    const location = await getLocation();
    const itemsCollection = collection(db, 'items');
    const itemSnapshot = await getDocs(itemsCollection);
    const newItemList = itemSnapshot.docs.map(d => d.data());
    newItemList.map(item => {
      item.distance = getDistance(
        location.latitude,
        location.longitude,
        item.coordinate.latitude,
        item.coordinate.longitude,
      );
    });
    setItemList(newItemList);
    setIsLoading(false);
    const date = new Date();
    console.log('location updated: ' + date);
  };

  // This retrieves data when the page loads the first time and when the reload button is pushed
  useEffect(() => {
    getData();
    console.log('USE EFFECT reload');
  }, [update]);

  // This should update the page when navigating to it
  useFocusEffect(() => {
    () => getData();
    console.log('FOCUSED reload');
  });

  // This bookends when the page is loading for development purposes
  useEffect(() => {
    const now = new Date().getTime();
    console.log('isLoading = ' + isLoading + ' ' + now);
  }, [isLoading]);

  const checkIfLoading = () => {
    if (isLoading === true || itemList.empty === true) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('./../assets/logo.png')}
            opacity={0.8}
            style={{width: 250, height: 250}}
          />
        </View>
      );
    } else {
      return (
        <View style={{height: windowHeight - 200}}>
          {messageDisplay()}
          <FlatList
            data={itemList}
            renderItem={({item}) => <>{itemDisplayBlock(item)}</>}
          />
        </View>
      );
    }
  };

  const getTakenTimeout = time => {
    return new Date().getTime() / 1000 - time.seconds;
  };

  const itemDisplayBlock = item => {
    if (item.flagged > 0) {
      return <></>;
    } else if (item.is_taken && getTakenTimeout(item.taken_time) > 20) {
      return <></>;
    } else if (item.is_taken) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemDetail', {item})}
          style={styles.takenItem}>
          <View style={styles.itemDisplay} opacity={0.6}>
            <Image source={{uri: item.image_path}} style={styles.img} />
            <View style={styles.itemWords}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text numberOfLines={1} style={styles.description}>
                This item has been claimed.
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.distance}>
              {item.distance < 501
                ? `${item.distance} feet away`
                : `${(item.distance / 5280).toFixed(1)} miles away`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemDetail', {item})}
          style={styles.item}>
          <View style={styles.itemDisplay}>
            <Image source={{uri: item.image_path}} style={styles.img} />
            <View style={styles.itemWords}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text numberOfLines={1} style={styles.description}>
                {item.description}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.distance}>
              {item.distance < 501
                ? `${item.distance} feet away`
                : `${(item.distance / 5280).toFixed(1)} miles away`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.pageDisplay}>
      {checkIfLoading()}
      <View>
        <TouchableOpacity>
          <View style={styles.btnText}>
            <Icon
              style={{...styles.icon, position: 'absolute', bottom: 2}}
              name="map"
              onPress={() => navigation.navigate('Map', {itemList})}
            />
            <Icon
              style={{
                ...styles.icon,
                position: 'absolute',
                bottom: 2,
                left: (windowWidth - 140) / 2,
              }}
              name="plus"
              onPress={() => navigation.navigate('AddItem')}
            />
            <Icon
              style={{
                ...styles.icon,
                position: 'absolute',
                bottom: 2,
                right: 0,
              }}
              name="refresh"
              onPress={() => setUpdate(prevState => !prevState)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ItemList;

const styles = StyleSheet.create({
  pageDisplay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 3,
    backgroundColor: '#d2e6ef',
  },
  itemDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: 'solid black 1px',
    paddingBottom: 7,
    paddingTop: 7,
    margin: 1,
    paddingLeft: 5,
    backgroundColor: '#9dc6dd',
  },
  takenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: 'solid black 1px',
    paddingBottom: 7,
    paddingTop: 7,
    margin: 1,
    paddingLeft: 5,
    backgroundColor: '#B4D3E4',
  },
  distance: {width: 80, marginRight: 5},
  description: {color: '#254952', fontSize: 16},
  itemWords: {width: windowWidth - 170},
  img: {
    width: 65,
    height: 65,
    borderRadius: 5,
    marginRight: 8,
  },
  titleText: {
    color: '#254952',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginLeft: 50,
    marginRight: 50,
    backroundColor: '#529aff',
  },
  icon: {
    color: '#254952',
    fontSize: 40,
    textAlign: 'center',
  },
});

// old useEffect that I changed to call getData from useFocusEffect
// useEffect(() => {
//   let didCancel = false;
//   const getData = async () => {
//     const location = await getLocation();
//     if (!didCancel) {
//       const itemsCollection = collection(db, 'items');
//       const itemSnapshot = await getDocs(itemsCollection);
//       const newItemList = itemSnapshot.docs.map(d => d.data());
//       newItemList.map(item => {
//         item.distance = getDistance(
//           location.latitude,
//           location.longitude,
//           item.coordinate.latitude,
//           item.coordinate.longitude,
//         );
//       });
//       console.log(newItemList);
//       setItemList(newItemList);
//       const date = new Date();
//       console.log('location updated: ' + date);
//     }
//   };
