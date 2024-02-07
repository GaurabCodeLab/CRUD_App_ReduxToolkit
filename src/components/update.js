import { Link, useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { updateData, readData } from '../reduxToolkit/usersSlice';

function Update(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state)=>state.api.users);
  const updatedUser = {name, email, gender};
  const data = {id, updatedUser};

useEffect(()=>{
if(users.length){
  const user = users.find((value)=>{
    return value.id == id;
  });
  setName(user.name);
  setEmail(user.email);
  setGender(user.gender);
} else{
  dispatch(readData());
}
}, [users]);

function handleSubmit(event){
  event.preventDefault();
  dispatch(updateData(data));
  alert("Data Updated Successfully");
  navigate('/CRUD_App_ReduxToolkit');
}

    return (
       <>
       <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div class="container-fluid">
    <h1 class="navbar-brand my-0 fs-3 text-primary">RTK</h1>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
        <li class="nav-item">
          <Link to="/create" class="nav-link active fs-5">Create Post</Link>
        </li>
        <li class="nav-item">
          <Link to="/CRUD_App_ReduxToolkit" class="nav-link active fs-5">All Post({users.length})</Link>
        </li> 
      </ul>
    </div>
  </div>
</nav>

       <div className="container w-50 bg-light p-5 mt-3 border rounded"> 
<h2 className="text-center">Edit The Data</h2>

<form onSubmit={handleSubmit}>
  <div class="mb-3 text-center">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Name" value={name} onChange={(event)=>setName(event.target.value)} required/>
  </div>
  <div class="mb-3 text-center">
    <label for="exampleInputPassword1" class="form-label">Email</label>
    <input type="email" class="form-control text-center" id="exampleInputPassword1" placeholder="Enter Email Address" value={email} onChange={(event)=>setEmail(event.target.value)} required/>
  </div>

  <div class="form-check d-flex justify-content-center">
<input class="form-check-input border" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Male" checked={gender === "Male"} onChange={(event)=>setGender(event.target.value)} required/> 
  <label class="form-check-label ms-2" for="flexRadioDefault1">
    Male
  </label>
</div>
<div class="form-check d-flex justify-content-center mt-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Female" checked={gender === "Female"} onChange={(event)=>setGender(event.target.value)} required/>
  <label class="form-check-label ms-2" for="flexRadioDefault2">
    Female
  </label>
</div>
<div className="text-center mt-4">
  <button type="submit" class="btn btn-primary me-4">Submit</button>
  <Link to='/CRUD_App_ReduxToolkit'><button type="button" class="btn btn-dark">Back</button></Link>
  </div>
</form>

       </div>
       </>
    )
}

export default Update;