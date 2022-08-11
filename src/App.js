import { useState, useEffect } from 'react'
import Form from './components/form'
import Nav from './components/nav'
import toast from 'react-hot-toast'
import Card from './components/card'
import './App.css'
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
    if (conatactData?.length) {
      setContactList(conatactData)
    } else {
      setContactList([])
    }
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
      <div className='wrapper'>
        <button className='btn' onClick={() => setAddForm((prev) => !prev)}>
          {addForm ? 'hide' : 'Add Contact'}
        </button>
        {addForm && (
          <Form
            className='addForm'
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
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default App
