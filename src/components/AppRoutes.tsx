import { useAuth } from 'contexts/userContext'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from 'screens/about'
import AddPost from 'screens/add-post'
import AddList from 'screens/AddList'
import { Lists } from 'screens/lists'
import { Login } from 'screens/login'
import Main from 'screens/Main'
import { FeaturedPost } from 'screens/post'
import Posts from 'screens/posts'
import { Register } from 'screens/register'
import { Taxonomies } from 'screens/taxonomies'

type Props = {}

export const AppRoutes = (props: Props) => {
  const { isLogin } = useAuth()
  return isLogin ? (
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
          <Route path="/posts/post" element={<AddPost />} />
          <Route path="/lists/list" element={<AddList />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<p>No Router found</p>} />
        </Route>
      </Routes>
    </div>
  ) : (
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
        <Route
          index
          element={
            <div className="main">
              <FeaturedPost
                title={'Karula'}
                image_url="/profiles/images/leopard.jpeg"
                body="Karula was a Leopard"
              />
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/birds" element={<Taxonomies />} />
        <Route path="/posts" element={<Posts />}></Route>
      </Route>
    </Routes>
  )
}
