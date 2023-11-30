import { useState, useEffect, useRef } from "react";
import { ContactsList } from "./ContactsList/ContactsList";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";

import { nanoid } from 'nanoid'


const App = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')

  const effectRun = useRef(true)


  useEffect(() => {
    if(effectRun.current){
      effectRun.current = false
      console.log("initial")
      const contacts = localStorage.getItem('contacts')
      const parsedContacts = JSON.parse(contacts) 

      if (parsedContacts) {
        setContacts(parsedContacts)
        
      }
      return
    }
    if(contacts.length > 0){
      localStorage.setItem('contacts', JSON.stringify(contacts))
      console.log(contacts.length)
    }
  }, [contacts])



  const formSubmitHandler = ({name,number}) => {

    if (!checkExistHandler(name)) {
      return
    }

    const contact = {
      id: nanoid(),
      name,
      number
    }

    setContacts(prevState => ([contact, ...prevState]))


  }

  const changeFilter = e => {
    setFilter(e.currentTarget.value)
  }

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase()
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  const onDeleteContact = contactId => {
    if(contacts.length === 1){
      localStorage.clear()
    }
    setContacts(
      contacts.filter(contact => contact.id !== contactId)
    )
  }

  const checkExistHandler = name => {
    const res = contacts.find((value) => {
      return value.name === name
    })

    if (res) {
      alert(`${name} is already in contacts list`)
      return false
    }

    return true

  }



    const filteredContacts = getFilteredContacts()

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length !== 0 ? <ContactsList contacts={filteredContacts} deleteContact={onDeleteContact} /> : <h3>You have no contacts in your list yet</h3>}
      </>
    )
}

export default App;
