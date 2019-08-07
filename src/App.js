import React, { Component } from 'react';
import contacts from './data/contacts.json'
import './App.css';

class App extends Component {

  state = {
    myContacts: contacts.splice(0,5),
    contacts, //esto es lo mismo que "contacts: contacts"
  }

  handleNewRandomContact = () => {
    const {contacts, myContacts} = this.state;
    const randomNumber = Math.round(Math.random() * contacts.length - 1);

    const newContact = contacts[randomNumber];
    const newMyContacts = [...myContacts]; //con spread hacemos una array completamente nueva para que setState lo pueda coger
    
    newMyContacts.push(newContact);
    this.setState({
      myContacts: newMyContacts,
    })
  }

  handleSortByPopularity = () => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts]; //hacemos una shallow copy del array como antes, porque sino solo hariamos referencia al original y no hariamos uno nuevo
    
    newMyContacts.sort((a,b) => {
      return b.popularity - a.popularity
    })
    this.setState({
      myContacts: newMyContacts,
    })
  }

  handleSortByName = () => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts]; 

    newMyContacts.sort((a,b) => {
      if(a.name < b.name) { 
        return -1; 
      }
      if(a.name > b.name) { 
        return 1; 
      }
      return 0;
    })

    this.setState({
      myContacts: newMyContacts,
    })
  }

  deleteContact = (index) => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts]; 
    newMyContacts.splice(index,1)
    
    this.setState({
      myContacts: newMyContacts,
    })
  }


  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.handleNewRandomContact}>Add Random Contacts</button>
        <button onClick={this.handleSortByPopularity}>Sort by Popularity</button>
        <button onClick={this.handleSortByName}>Sort by Name</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.myContacts.map((contact, index) => {
                return (
                  <tr key={index}>
                    <td><img src={contact.pictureUrl} alt={contact.name}/></td>
                    <td><p>{contact.name}</p></td>
                    <td><p>{contact.popularity}</p></td>
                    <td><button onClick={() => {this.deleteContact(index)}}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
