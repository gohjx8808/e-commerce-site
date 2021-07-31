import firebase from 'gatsby-plugin-firebase';
import 'firebase/database';

export const getPrevOrderCount = () => (firebase.database().ref('orderCount').once('value'));

export const updateOrderCount = (currentOrderCount:number) => firebase.database().ref('orderCount').set(currentOrderCount);
