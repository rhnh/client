import { Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { useAuth } from 'contexts/userContext'
import { Login, Register, Profile } from 'screens/user'
import { CreateUserTaxonomy } from 'screens/taxonomies/CreateUserTaxonomy'
import { CreatePost, FeaturedPost, Posts } from 'screens/posts'
import { List, Lists, CreateList } from 'screens/lists/'
import { About, Main } from 'screens/main'
import { TaxonomyScreen } from 'screens/taxonomies'
import { TaxonomyById } from 'screens/taxonomies/TaxonomyById'
import FeaturedArticle from 'screens/posts/featured'
import { Members } from 'screens/user/Members'
import { ShowPost } from 'screens/lists/ShowPost'

export const AppRoutes: FC = () => {
  const { isLogin, username } = useAuth()
  return isLogin ? (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <Main>
              <FeaturedArticle />
            </Main>
          }
        />
        <Route path="/posts" element={<Posts />} />
        <Route path={`/posts/post/:id`} element={<ShowPost />} />
        <Route path="/posts/post" element={<CreatePost />} />
        <Route path="/lists/list" element={<CreateList />} />
        <Route path={`/${username}/lists`} element={<Lists />} />
        <Route path={`/${username}/list/:listName`} element={<List />} />
        <Route path="/about" element={<About />} />
        <Route path="/taxonomies" element={<TaxonomyScreen />} />
        <Route path="/taxonomies/:listName" element={<CreateUserTaxonomy />} />
        <Route path="/taxonomy/:taxonomyId" element={<TaxonomyById />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/members" element={<Members />} />
        <Route path="*" element={<Main />} />
      </Route>
    </Routes>
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
        <Route path="/posts" element={<Posts />} />{' '}
        <Route path="/about" element={<About />} />
        <Route path="/taxonomy/:taxonomyId" element={<TaxonomyById />} />
        <Route path="*" element={<Main />} />
      </Route>
    </Routes>
  )
}
