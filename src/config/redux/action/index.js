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

export const getDataAPI = (postId) => (dispatch) => {
  let urlNotes = database.ref('notes/' + postId);
  return new Promise((resolve, reject) => {

    urlNotes.on('value', (snapshot) => {
      // console.log('get data', snapshot.val())
      const arrData = [];
      Object.keys(snapshot.val()).map(key => {
        arrData.push(
          {
            id: key,
            data: snapshot.val()[key]
          }
        )
      })
      dispatch({ type: 'SET_NOTES', value: arrData })
      resolve(arrData)
      //console.log(arrData)
    });
  })
}

export const updateDataAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`notes/${data.userId}/${data.idNotes}`);
  return new Promise((resolve, reject) => {
    urlNotes.set({
      title: data.title,
      content: data.content
    }, (error) => {
      if (error) {
        console.log(error)
        reject(false)
      } else {
        console.log("success")
        resolve(true)
      }
    })
  })

}