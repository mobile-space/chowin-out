import { AsyncStorage, Platform } from "react-native";


// createdAt time display helper
export function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - new Date(timeStamp).getTime()) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast) + ' secs ago';
  }

  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + (parseInt(secondsPast / 60) === 1 ? ' min ago' : ' mins ago');
  }

  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + (parseInt(secondsPast / 3600) === 1 ? ' hr ago' : ' hrs ago');
  }

  if (secondsPast > 86400) {
    day = new Date(timeStamp).getDate();
    month = new Date(timeStamp).toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    year = new Date(timeStamp).getFullYear()
    return day + " " + month + ", " + year;
  }
}
// createdAt timeComment display helper
export function timeSinceComment(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - new Date(timeStamp).getTime()) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast) + 's';
  }

  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) +  'm';
  }

  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + 'h';
  }

  if (secondsPast > 86400) {
    day = new Date(timeStamp).getDate();
    month = new Date(timeStamp).toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    year = new Date(timeStamp).getFullYear()
    return day + " " + month + ", " + year;
  }
}
//Storing URL so if the server is  changed it will be easy to replace URL here and it will work in other screens too
export const ENV_URL =  "https://daug-app.herokuapp.com"


//AsyncStorage starts here, stores userID
export const USER_KEY = "auth-user-key";
export const USER_ID = 'some-random-user-id';


export const onSignIn = (userId) => AsyncStorage.multiSet([[USER_KEY, "true"], [USER_ID, userId.toString()]])

export const onSignOut = () => AsyncStorage.multiRemove([USER_KEY, USER_ID]);

export const getUserId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_ID)
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};




