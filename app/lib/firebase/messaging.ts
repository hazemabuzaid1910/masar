import { initializeApp } from "firebase/app";
import { getMessaging, getToken, type Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDyazYQcwc5X2SZwrVDk2B4dHhokelecMM",
  authDomain: "masar-dashboard-4d33c.firebaseapp.com",
  projectId: "masar-dashboard-4d33c",
  storageBucket: "masar-dashboard-4d33c.firebasestorage.app",
  messagingSenderId: "356124174929",
  appId: "1:356124174929:web:cfdb35f2dedd46c2092670",
  measurementId: "G-T7T7J8Q6F3"
};

const app = initializeApp(firebaseConfig);


export async function getFcmToken(): Promise<string | null> {

  if (typeof window === "undefined") {
    return null;
  }


  if (!("serviceWorker" in navigator)) {
    return null;
  }


  try {

    const messaging: Messaging = getMessaging(app);


    const permission =
      await Notification.requestPermission();


    if(permission !== "granted"){
      return null;
    }


    const token = await getToken(
      messaging,
      {
        vapidKey: "BL4TQ7-MkpHLmog_I_wtdi65qdRCRatip27a9A2dlA0WWttI8I3k0CoydaZNq59W_VRVwEgeVw_s_Y0XjZnh-pc"
      }
    );


    return token;


  } catch(error){

    console.error(
      "FCM Error:",
      error
    );

    return null;
  }

}