import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCGBmfQ1TOfluPCEcPci05W29WgSJNmxQU",
        authDomain: "chatapp-17e0f.firebaseapp.com",
        databaseURL: "https://chatapp-17e0f.firebaseio.com",
        projectId: "chatapp-17e0f",
        storageBucket: "chatapp-17e0f.appspot.com",
        messagingSenderId: "169227118560",
        appId: "1:169227118560:web:3698441d45ddfb1966ed85",
        measurementId: "G-FHHWHP5BJR",
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
