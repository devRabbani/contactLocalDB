import { useState, useEffect } from 'react'
import Form from './components/form'
import Nav from './components/nav'
import toast from 'react-hot-toast'
import Card from './components/card'

function App() {
  const [addForm, setAddForm] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [contactList, setContactList] = useState([])
  const [data, setData] = useState({
    fullname: '',
    email: '',
    phone: '',
    status: 'active',
  })

  const fetchData = () => {
    const conatactData = JSON.parse(localStorage.getItem('data'))
    if (data) setContactList(conatactData)
  }

  const handleDelete = (timestamp) => {
    const newData = contactList.filter((item) => item.timestamp !== timestamp)
    localStorage.setItem('data', JSON.stringify(newData))
    toast.success('Deleted Successfully')
    fetchData()
  }

  const handleUpdate = (olddata) => {
    setIsUpdate(true)
    setAddForm(true)
    setData(olddata)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Nav />
      <button onClick={() => setAddForm((prev) => !prev)}>
        {addForm ? 'hide' : 'Add Contact'}
      </button>
      {addForm && (
        <Form
          contactList={contactList}
          fetchData={fetchData}
          setAddForm={setAddForm}
          data={data}
          setData={setData}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      )}
      {contactList.length > 0 && (
        <>
          <h2>List of Contacts</h2>
          {contactList
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((item, i) => (
              <Card
                key={i}
                handleDelete={handleDelete}
                item={item}
                handleUpdate={handleUpdate}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App
