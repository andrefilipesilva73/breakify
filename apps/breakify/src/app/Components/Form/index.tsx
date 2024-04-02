import {useEffect, useState} from 'react'

export function Form({
  firstNamePlaceholder,
  lastNamePlaceholder,
  onSubmit,
}: {
  firstNamePlaceholder: string
  lastNamePlaceholder: string
  onSubmit: (firstName: string, lastName: string) => void
}) {
  // Hold data
  const [formState, setFormState] = useState<'ok' | 'not-ok'>('ok')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // Listen for form state change
  useEffect(() => {
    // Check if form state is not ok
    if (formState === 'not-ok') {
      // Set state to ok after 1s
      setTimeout(() => {
        // Set state
        setFormState('ok')
      }, 1000)
    }
  }, [formState])

  // Build
  return (
    <div className="w-full">
      <div className="flex gap-3">
        <div className="flex flex-col">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            First name
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder={firstNamePlaceholder}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Last name
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder={lastNamePlaceholder}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="mt-3">
        <button
          className=" text-white font-semi py-2 px-4 rounded focus:outline-none focus:shadow-outline 2 w-full"
          style={{
            background: formState === 'ok' ? '#026635' : 'red',
            transition: 'background 0.5s',
          }}
          type="button"
          onClick={() => {
            // Validate input data
            if (firstName.trim() === '' || lastName.trim() === '') {
              // Not ok
              setFormState('not-ok')

              // Stop execution here
              return
            }

            // Form is valid, submit
            onSubmit(firstName, lastName)
          }}
        >
          Breakify
        </button>
      </div>
    </div>
  )
}
