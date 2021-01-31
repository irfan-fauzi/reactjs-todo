import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeDataAPI, getDataAPI, updateDataAPI } from '../../../config/redux/action'
import '../Dashboard/Dashboard.css'
import CardContent from '../../../components/molecules/CardContent';

export class Dashboard extends Component {

  state = {
    title: '',
    content: '',
    date: '',
    idNotes: '',
    textButton: 'simpan'
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    this.props.getDataApi(userData.uid)
  }


  handleSaveNotes = () => {
    const { content, title, textButton, idNotes } = this.state;
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
      //idNotes: idNotes
      //  idNotes: this.props.id
    }
    //console.log(data)

    if (textButton === 'simpan') {
      this.props.addDataAPi(data)
    } else {
      data.idNotes = idNotes
      console.log(data)
      this.props.updateNotes(data)
    }

  }
  // edit data
  editData = (el) => {
    console.log(el.data)
    this.setState({
      title: el.data.title,
      content: el.data.content,
      textButton: 'update',
      idNotes: el.id
    })
    // console.log(this.state)
  }

  handleChangeText = (e, type) => {
    this.setState({
      [type]: e.target.value
    })

  }

  cancelUpdate = () => {
    this.setState({
      title: '',
      content: '',
      textButton: 'simpan'
    })
  }

  render() {
    const { title, content, date, textButton } = this.state;
    //console.log(this.props.arrNotes)
    return (
      <div className="container">
        <div className="input-form">
          <input type="text" placeholder="title" className="input-title" value={title} onChange={(e) => this.handleChangeText(e, 'title')} id="title" />
          <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.handleChangeText(e, 'content')} id="content">

          </textarea>
          <div className="btn-wrap">
            <button className="save-btn cancel-btn" onClick={this.cancelUpdate}>CANCEL</button>
            <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
          </div>
        </div>

        {
          this.props.arrNotes.map(el => (
            <CardContent key={el.id} title={el.data.title} date={el.data.date} content={el.data.content} onClick={() => this.editData(el)} />
          ))
        }


      </div>
    )
  }
}

const reduxDespatch = (dispatch) => ({
  addDataAPi: (data) => dispatch(writeDataAPI(data)),
  getDataApi: (data) => dispatch(getDataAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data))
})

// get data user
const reduxState = (state) => (
  {
    userDataAPI: state.user,
    arrNotes: state.notes
  }
)

export default connect(reduxState, reduxDespatch)(Dashboard)