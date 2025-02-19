import { useRef, useState } from 'react'
import { useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
// import { Button } from "/components/ui/button"
import JoditEditor from "jodit-react";

export default function App() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
  })

  const [isFormDirty, setIsFormDirty] = useState(false)

  useEffect(() => {
    // Load data from local storage on initial load
    const savedData = localStorage.getItem('userData')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }

    // Add event listener for beforeunload to warn about unsaved changes
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    // Save form data to local storage whenever it changes
    if (formData.id) {
      localStorage.setItem('userData', JSON.stringify(formData))
    }
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setIsFormDirty(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.id) {
      setFormData((prevData) => ({
        ...prevData,
        id: uuidv4(),
      }))
    }
    setIsFormDirty(false)
    alert('User data saved!')
  }

  const handleBeforeUnload = (e) => {
    if (isFormDirty) {
      e.preventDefault()
      e.returnValue = '' // Required for Chrome
    }
  }

  const increment = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const decrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0))
  }

  const reset = () => {
    setCount(0)
  }

  
  const config = {
    readonly: false, 
    placeholder: "Start typing...",
    toolbarButtonSize: "small",
  };


  // Calculate background color based on count
  const maxCount = 100 // Define a max count for the gradient
  const gradientPercentage = (count / maxCount) * 100
  const backgroundColor = `linear-gradient(90deg, #ffffff ${gradientPercentage}%, #0070f3 ${gradientPercentage}%)`

  return (
    <>
    <div className='full max-h-screen bg-600'>
    <div className="min-w-30 flex flex-col justify-center items-center" style={{ background: backgroundColor }}>
      <div className="bg-slate-200 w-100 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
        <div className="flex space-x-4">
       
        <button  onClick={increment} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Increment</button>
        <button  onClick={decrement} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">decrement</button>

        <button  onClick={reset} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">reset</button>

        </div>
      </div>
    </div>
    </div>
    <>
    <div className="min-h-[600px] min-w-[400px]  relative flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">User Data Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
       
      </div>
    </div>
    </>
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Rich Text Editor</h2>
      
      <div className="p-4 border rounded-lg shadow-md bg-white">
        <JoditEditor
          ref={editor}
          // value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>

      
      <button
            type="submit"
            className="w-full  relative top-[-41px] bg-blue-500 text-white p-2  rounded-md hover:bg-blue-600"

          onClick={() => setContent(content)}>
            Submit
          </button>
          <h3 className="mt-0 font-medium">Preview:</h3> 
      <div
      
      
        className="p-9 border rounded-md bg-gray-600 text-2xl text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />

    </div>
    
    </>
  )
}