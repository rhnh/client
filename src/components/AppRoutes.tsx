import { Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { useAuth } from 'contexts/userContext'
import { Login, Register, Profile } from 'screens/user'
import { CreateUserTaxonomy } from 'screens/taxonomies/CreateUserTaxonomy'
import { CreatePost, FeaturedPost, Posts } from 'screens/posts'
import { List, Lists, CreateList } from 'screens/lists/'
import { About, Main } from 'screens/main'
import { Taxonomy, TaxonomyScreen } from 'screens/taxonomies'

export const AppRoutes: FC = () => {
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
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/post" element={<CreatePost />} />
          <Route path="/lists/list" element={<CreateList />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/lists/:listName" element={<List />} />
          <Route path="/about" element={<About />} />
          <Route path="/taxonomies" element={<TaxonomyScreen />} />
          <Route
            path="/taxonomies/:listName"
            element={<CreateUserTaxonomy />}
          />
          <Route path="/taxonomy/:taxonomyId" element={<Taxonomy />} />
          <Route path="/profile" element={<Profile />} />
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
        <Route path="/taxonomies" element={<TaxonomyScreen />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/taxonomy/:taxonomyId" element={<Taxonomy />} />

        <Route path="*" element={<p>No Router found</p>} />
      </Route>
    </Routes>
  )
}
