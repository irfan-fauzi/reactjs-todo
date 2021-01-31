import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeDataAPI } from '../../../config/redux/action'
import '../Dashboard/Dashboard.css'

export class Dashboard extends Component {

  state = {
    title: '',
    content: '',
    date: ''
  }



  handleSaveNotes = () => {
    const { content, title } = this.state;
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid
    }
    this.props.addDataAPi(data)
    console.log(data)
  }

  handleChangeText = (e, type) => {
    this.setState({
      [type]: e.target.value
    })

  }

  render() {
    const { title, content, date } = this.state;
    return (
      <div className="container">
        <div className="input-form">
          <input type="text" placeholder="title" className="input-title" value={title} onChange={(e) => this.handleChangeText(e, 'title')} id="title" />
          <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.handleChangeText(e, 'content')} id="content">

          </textarea>
          <button className="save-btn" onClick={this.handleSaveNotes}>simpan</button>
        </div>
        <div className="card-content">
          <p className="title">title</p>
          <p className="date">21 Sep 2012</p>
          <p className="content">Content notes</p>
        </div>
      </div>
    )
  }
}

const reduxDespatch = (dispatch) => ({
  addDataAPi: (data) => dispatch(writeDataAPI(data))
})

// get data user
const reduxState = (state) => (
  {
    userData: state.user
  }
)

export default connect(reduxState, reduxDespatch)(Dashboard)