// import * as admin from 'firebase-admin';
// import {initialize} from 'fireorm';
// import {firestore} from '@firebase/firestore'
// // import serviceAccount from '../serviceAccountKey.json';
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { ServiceAccount} from 'firebase-admin';
import admin from "firebase-admin";

import serviceAccount from "serviceAccountKey.json";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
// const firebaseConfig = {
//     var admin = require("firebase-admin"); var serviceAccount = require("path/to/serviceAccountKey.json"); admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
// Initialize Cloud Firestore and get a reference to the service
const db = admin.firestore();

export default db;
// const serviceAccount = require('../serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
// });

// const firestore = admin.firestore();
// initialize(firestore);

// export default firestore;