import { Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { createData, readData } from '../reduxToolkit/usersSlice';

function Create(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state)=>state.api);

  useEffect(()=>{
    dispatch(readData());
  }, [])

  const newUser = {name, email, gender};

  function handleSubmit(event){
    event.preventDefault();
    if(name.trim() !== "" && email.trim() !== "" && gender.trim() !== ""){
      dispatch(createData(newUser));
      alert("Data Created Successfully");
      setName('');
      setEmail('');
      setGender('');
    }
    
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
          <a class="nav-link active fs-5" aria-current="page" href="#">Create Post</a>
        </li>
        <li class="nav-item">
          <Link to="/CRUD_App_ReduxToolkit" class="nav-link active fs-5">All Post({users.users.length})</Link>
        </li> 
      </ul>
    </div>
  </div>
</nav>

       <div className="container w-50 bg-light p-5 mt-3 border rounded"> 
<h2 className="text-center">Fill The Data</h2>

<form onSubmit={handleSubmit}>
  <div class="mb-3 text-center">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Name" onChange={(event)=>setName(event.target.value)} value={name} required/>
  </div>
  <div class="mb-3 text-center">
    <label for="exampleInputPassword1" class="form-label">Email</label>
    <input type="email" class="form-control text-center" id="exampleInputPassword1" placeholder="Enter Email Address" onChange={(event)=>setEmail(event.target.value)} value={email} required/>
  </div>

  <div class="form-check d-flex justify-content-center">
<input class="form-check-input border" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Male" onChange={(event)=>setGender(event.target.value)} checked = {gender === "Male"} required/> 
  <label class="form-check-label ms-2" for="flexRadioDefault1">
    Male
  </label>
</div>
<div class="form-check d-flex justify-content-center mt-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Female" onChange={(event)=>setGender(event.target.value)} checked = {gender === "Female"} required/>
  <label class="form-check-label ms-2" for="flexRadioDefault2">
    Female
  </label>
</div>
<div className="text-center mt-4">
  <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>

       </div>
       </>
    )
}

export default Create;