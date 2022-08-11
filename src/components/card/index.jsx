import '../card/App.css'
import { MdDelete, MdEdit } from 'react-icons/md'
export default function Card({ item, handleDelete, handleUpdate }) {
  return (
    <tr>
      <td>{item.fullname}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.status}</td>
      <td className='btnWrapper'>
        <button onClick={() => handleUpdate(item)}>
          <MdEdit />
        </button>
        <button onClick={() => handleDelete(item.timestamp)}>
          <MdDelete />
        </button>
      </td>
    </tr>
    // <div className='card'>
    //   <p className='name'><h4>Name</h4>{item.fullname}</p>
    //   <p className='name'><h4>Mail Id</h4>{item.email}</p>
    //   <p className='name'><h4>Mobile</h4>{item.phone}</p>
    //   <p className='name'><h4>Status</h4>{item.status}</p>
    //   <div className='btnWrapper'>
    //     <button onClick={() => handleUpdate(item)}>Edit</button>
    //     <button onClick={() => handleDelete(item.timestamp)}>Delete</button>
    //   </div>
    // </div>
  )
}
