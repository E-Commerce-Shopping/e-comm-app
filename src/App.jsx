import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Main from './Outer-Main-Component/Main';
import { createBrowserRouter } from 'react-router-dom';
import Login from './Login-Component/Login';
import SignUp from './Login-Component/SignUp';

function App() {
  const [count, setCount] = useState(0)


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          path: '/',
          element: <Login />
        },
        {
          path: '/signup',
          element: <SignUp />
        }

      ]
    },
   
  ])
  return (
    <>
    <Routes>
      <Route path='/' element={<Main />}>
       <Route path="/" element={<Login />} />
       <Route path="/signup" element={<SignUp />} />
       </Route>
    </Routes>
    </>

  )
}

export default App;
