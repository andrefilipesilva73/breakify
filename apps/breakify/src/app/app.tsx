import {Logo} from './Components/Logo'
import {Form} from './Components/Form'
import {useEffect, useState} from 'react'
import {PeriodicElementsRepository} from './Repositories/periodic-elements'
import {PeriodicElement} from './Documents/periodic-elements'

// Hold default values
const defaultFirstName = 'Breaking'
const defaultLastName = 'Bad'

export function App() {
  // Hold data
  const [elementsData, setElementsData] = useState<Array<PeriodicElement>>([])
  const [firstName, setFirstName] = useState(defaultFirstName)
  const [lastName, setLastName] = useState(defaultLastName)

  // On mount
  useEffect(() => {
    // Get database
    let database = localStorage.getItem('database')

    // Eval
    if (!database) {
      // Load from Api
      PeriodicElementsRepository.instance.getPeriodicElements().then((data) => {
        // Save to local storage
        localStorage.setItem('database', JSON.stringify(data))

        // Assign
        database = JSON.stringify(data)

        // Set state
        setElementsData(data)
      })
    } else {
      // Assign
      const data = JSON.parse(database)

      // Set state
      setElementsData(data)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center justify-center w-fit flex flex-col gap-20">
        <div className="w-96">
          <Logo
            firstName={firstName}
            lastName={lastName}
            elementsData={elementsData}
          />
        </div>
        <Form
          firstNamePlaceholder={defaultFirstName}
          lastNamePlaceholder={defaultLastName}
          onSubmit={(firstName, lastName) => {
            setFirstName(firstName)
            setLastName(lastName)
          }}
        />
      </div>
    </div>
  )
}

export default App
