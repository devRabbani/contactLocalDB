import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Form({
  data,
  setData,
  fetchData,
  setAddForm,
  contactList,
  isUpdate,
  setIsUpdate,
}) {
  const { fullname, email, phone, status } = data

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newData
    if (isUpdate) {
      newData = [
        ...contactList.filter((item) => item.timestamp !== data.timestamp),
        { ...data, timestamp: Date.now() },
      ]
      toast.success(fullname + ' Updated Successfully')
      setIsUpdate(false)
    } else {
      newData = [...contactList, { ...data, timestamp: Date.now() }]
      toast.success(fullname + ' Added Successfully')
    }

    localStorage.setItem('data', JSON.stringify(newData))
    setAddForm(false)
    setData({
      fullname: '',
      email: '',
      phone: '',
      status: 'active',
    })
    fetchData()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={fullname}
        onChange={handleChange}
        name='fullname'
        required
        placeholder='Name'
      />
      <input
        type='email'
        value={email}
        onChange={handleChange}
        name='email'
        required
        placeholder='Email'
      />
      <input
        type='text'
        value={phone}
        onChange={handleChange}
        maxLength={12}
        minLength={10}
        required
        name='phone'
        placeholder='Phonenumber'
      />
      <select value={status} onChange={handleChange} name='status'>
        <option value='active'>Active</option>
        <option value='inactive'>InActive</option>
      </select>
      <button type='submit'>{isUpdate ? 'Update' : 'Submit'}</button>
    </form>
  )
}
