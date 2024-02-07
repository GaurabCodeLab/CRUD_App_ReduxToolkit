import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { readData, deleteData} from '../reduxToolkit/usersSlice';
import { useDispatch, useSelector} from 'react-redux';

function Read(){
const navigate = useNavigate();
const [show, setShow] = useState(true);
const [user, setUser] = useState(null);
const [searchText, setSearchText] = useState("");
const [checkRadio, setCheckRadio] = useState("");
const users = useSelector((state)=>state.api);
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(readData());
}, [dispatch]);

function handleView(id){
  setShow(false);
   const user = users.users.find((value)=>{
    return value.id == id;
   });
   setUser(user);
};

function handleDelete(id){
  if(id){
    dispatch(deleteData(id));
    alert("Data Deleted Successfully");
  }
}

function handleUpdate(id){
navigate(`/update/${id}`);
}

const filteredUsers = users.users
.filter((value)=>{
 if(searchText.trim() === ""){
   return value;
 } else{
   return value.name.toLowerCase().startsWith(searchText.toLowerCase());
 }
})
.filter((value)=>{
 if(checkRadio === ""){
   return value;
 } else if(checkRadio === "Male"){
   return value.gender === "Male";
 } else{
   return value.gender === "Female";
 }
})

    return (
        <>
       <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div class="container-fluid">
    <h1 class="navbar-brand my-0 fs-3 text-primary">RTK</h1>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
        <li className="nav-item">
          <Link to="/create" class="nav-link active fs-5">Create Post</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link active fs-5" aria-current="page" href="#">All Post({filteredUsers.length})</a>
        </li> 
      </ul>
      {
        show ? <form className="d-flex w-50 mx-auto mx-lg-0">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={(event)=>setSearchText(event.target.value)}/>
      </form> : null
      }
    </div>
  </div>
</nav>
 
 {
  users.loading ? <h1 className='text-center mt-3'>loading...</h1> : 
  show ? 
  <div className="container">
        <h2 className="text-center mt-3">All Data</h2>

        <div className="text-center"> 
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="" checked={checkRadio === ""} onChange={()=>setCheckRadio("")}/>
  <label className="form-check-label" for="inlineRadio1">All</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Male" checked={checkRadio === "Male"} onChange={(event)=>setCheckRadio(event.target.value)} />
  <label className="form-check-label" for="inlineRadio2">Male</label>
</div>
<div class="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Female" checked={checkRadio === "Female"} onChange={(event)=>setCheckRadio(event.target.value)} />
  <label className="form-check-label" for="inlineRadio3">Female</label>
</div>
</div>

{
 
 filteredUsers.map((value, index)=>(
  <div className="card text-center bg-light mx-auto mt-3" style={{width : "32rem"}} key={index}>
<div className="card-body">
  <h5 className="card-title">{value.name}</h5>
  <h6 className="card-subtitle mb-2 text-muted">{value.email}</h6>
  <p className="card-text">{value.gender}</p>
  <a href="#" class="btn btn-primary me-3" onClick={()=>handleView(value.id)}>View</a>
  <a className="btn btn-info me-3" onClick={()=>handleUpdate(value.id)}>Edit</a>
  <a href="#" class="btn btn-danger" onClick={()=>handleDelete(value.id)}>Delete</a>
</div>
</div>
))
}
        </div> :
        <div className='container d-flex align-items-center' style={{height : "89vh"}}>
        <div className="card text-center bg-light mx-auto mt-3" style={{width : "25rem"}}>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
          <p className="card-text">{user.gender}</p>
          <button type="button" className="btn btn-secondary" onClick={()=>setShow(true)}>Close</button>
        </div>
      </div>
      </div>
      
 }
        </>
    )
}

export default Read;