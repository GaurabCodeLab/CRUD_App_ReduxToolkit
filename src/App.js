import { Routes, Route} from 'react-router-dom';
import Read from './components/read';
import Create from './components/create';
import Update from './components/update';

function App(){
  return (
    <>
    <Routes>
      <Route path='/CRUD_App_ReduxToolkit' element = {<Read/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/update/:id' element={<Update/>} />
      <Route path='*' element={<h1 className='text-center mt-4'>404 Page Not Found</h1>} />
    </Routes>
    </>
  )
}

export default App;