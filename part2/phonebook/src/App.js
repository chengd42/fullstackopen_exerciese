import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
const Filter = ({search, handleSearchChange}) => (
  <div>
    filter shown with <input value={search} onChange={handleSearchChange} />
  </div>
)
const PersonForm = ({newName,newNumber,handleSubmit, handleNameChange, handleNumberChange}) => (
  <form onSubmit={handleSubmit}>
    <div>name: <input value={newName} onChange={handleNameChange}/></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div><button type="submit">add</button></div>
  </form>
)
const Persons = ({personsToShow}) => (
  <ul>
    {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    
    setShowAll(false)
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) ) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {name: newName, number: newNumber}
    

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
  

   return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App