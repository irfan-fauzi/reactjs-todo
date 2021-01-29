import firebase from '../../firebase'

export const registerUserAPI = (data) => (dispatch) => {

  dispatch({ type: 'CHANGE_LOADING', value: true })
  return (
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        // Signed in 
        console.log('success', res);
        dispatch({ type: 'CHANGE_LOADING', value: false })
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: 'CHANGE_LOADING', value: false })
      })
  )
}

export const LoginUserAPI = (data) => (dispatch) => {

  return new Promise((resolve, reject) => {
    dispatch({ type: 'CHANGE_LOADING', value: true })
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        let dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified
        }
        console.log(`success : `, dataUser.email)
        dispatch({ type: 'CHANGE_LOADING', value: false })
        dispatch({ type: 'CHANGE_ISLOGIN', value: true })
        dispatch({ type: 'CHANGE_USER', value: dataUser })
        resolve(true)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        dispatch({ type: 'CHANGE_LOADING', value: false })
        dispatch({ type: 'CHANGE_ISLOGIN', value: false })
        reject(false)
      })
  })

}