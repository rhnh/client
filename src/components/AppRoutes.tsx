import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from 'screens/login'
import Main from 'screens/Main'
import { Register } from 'screens/register'

type Props = {}

export const AppRoutes = (props: Props) => {
  return (
    <div className="">
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Main>
                <p>Welcome home</p>
              </Main>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<p>oops</p>} />
        </Route>
      </Routes>
    </div>
  )
}
