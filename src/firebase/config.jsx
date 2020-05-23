export const firebaseConfig = ((nodeEnv, projectId) => {
  if (nodeEnv === 'production' && projectId === 'ec-app-12ba0') {
    return {
      apiKey: "AIzaSyCnTBLrXElOs0Dr3foIJvyvnpXG9qMncHU",
      authDomain: "ec-app-12ba0.firebaseapp.com",
      databaseURL: "https://ec-app-12ba0.firebaseio.com",
      projectId: "ec-app-12ba0",
      storageBucket: "ec-app-12ba0.appspot.com",
      messagingSenderId: "962257704090",
      appId: "1:962257704090:web:4a815c3aa80694a2f1bb23",
      measurementId: "G-26GDHDEQ1H"
    }
  } else {
    return {
      apiKey: "AIzaSyDMbpWnCBzRSnguiJY8NfoJPcQhlZokAKA",
      authDomain: "ec-app-dev-12c21.firebaseapp.com",
      databaseURL: "https://ec-app-dev-12c21.firebaseio.com",
      projectId: "ec-app-dev-12c21",
      storageBucket: "ec-app-dev-12c21.appspot.com",
      messagingSenderId: "474173017980",
      appId: "1:474173017980:web:e60bed9f218676b27cdef9",
      measurementId: "G-1T2JF4T3Z3"
    }
  }
})(process.env.NODE_ENV, process.env.REACT_APP_PROJECT_ID);
