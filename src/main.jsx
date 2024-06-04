import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {AddPost, AllPost, EditPost, Home, Login, Post, SignUp} from './pages/index.js'
import AuthlayOut from './components/AuthlayOut.jsx'

const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/login',
          element:(
            <AuthlayOut authentication ={false}>
              <Login/>
            </AuthlayOut>
          )
        },
        {
          path:'/signup',
          element:(
            <AuthlayOut authentication={false}>
              <SignUp/>
            </AuthlayOut>
          )
        },
        {
          path:'/add-post',
          element:(
            <AuthlayOut authentication={true}>
              {" "}
              <AddPost/>
            </AuthlayOut>
          )
        },
        {
          path:'/all-posts',
          element:(
            <AuthlayOut authentication={true}>
              {" "}
              <AllPost/>
            </AuthlayOut>
          )
        },
        {
          path:'/edit-post/:slug',
          element:(
            <AuthlayOut>
              {"  "}
              <EditPost/>
            </AuthlayOut>
          )
        },
        {
          path:"/post/:slug",
          element:<Post/>
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
