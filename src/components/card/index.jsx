export default function Card({ item, handleDelete, handleUpdate }) {
  return (
    <div className='card'>
      <p className='name'>{item.fullname}</p>
      <p className='name'>{item.email}</p>
      <p className='name'>{item.phone}</p>
      <p className='name'>{item.status}</p>
      <div className='btnWrapper'>
        <button onClick={() => handleUpdate(item)}>Edit</button>
        <button onClick={() => handleDelete(item.timestamp)}>delete</button>
      </div>
    </div>
  )
}
