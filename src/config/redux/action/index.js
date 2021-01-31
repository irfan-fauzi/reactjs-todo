import firebase, { database } from '../../firebase'

export const registerUserAPI = (data) => (dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch({ type: 'CHANGE_LOADING', value: true })
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        // Signed in 
        console.log('success', res);
        dispatch({ type: 'CHANGE_LOADING', value: false })
        resolve(true)
      })
      .catch((error) => {
        let errorMessage = error.message;
        //console.log(errorCode, errorMessage);
        dispatch({ type: 'CHANGE_LOADING', value: false })
        reject(errorMessage)
      })

  })

}

export const LoginUserAPI = (data) => (dispatch) => {

  return new Promise((resolve, reject) => {
    dispatch({ type: 'CHANGE_LOADING', value: true })
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        let dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken
        }
        //console.log(`success : `, dataUser)
        dispatch({ type: 'CHANGE_LOADING', value: false })
        dispatch({ type: 'CHANGE_ISLOGIN', value: true })
        dispatch({ type: 'CHANGE_USER', value: dataUser })
        resolve(dataUser)
      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorCode, errorMessage)
        dispatch({ type: 'CHANGE_LOADING', value: false })
        dispatch({ type: 'CHANGE_ISLOGIN', value: false })
        reject(errorMessage)
      })
  })

}

export const writeDataAPI = (data) => (dispatch) => {
  // set untuk mengganti, push untuk menambah
  database.ref('notes/' + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date
  });


}