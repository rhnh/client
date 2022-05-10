import { Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { Login, Register, Profile } from 'screens/user'
import { CreateUserTaxonomy } from 'screens/taxonomies/CreateUserTaxonomy'
import { CreatePost, Posts } from 'screens/posts'
import { List, Lists, CreateList } from 'screens/lists/'
import { About, Main } from 'screens/main'
import { Taxonomies } from 'screens/taxonomies'
import { SpeciesById } from 'screens/taxonomies/SpeciesById'
import FeaturedArticle from 'screens/posts/featured'
import { Members } from 'screens/user/Members'
import { ReLoginButton, InfoBox } from './themed-components'
import { Taxonomy } from 'screens/taxonomies/Taxonomy'
import { ShowPost } from 'screens/posts/ShowPost'
import { Notifications } from 'screens/notifications/Notifications'

export const AppRoutes: FC = () => {
  return (
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
        <Route path={`/lists/:username`} element={<Lists />} />
        <Route path={`/lists/:username/list/:listName`} element={<List />} />
        <Route path="/lists/:username/list" element={<CreateList />} />
        <Route path="/posts" element={<Posts />} />
        <Route path={`/posts/post/:id`} element={<ShowPost />} />
        <Route path="/posts/post" element={<CreatePost />} />
        <Route path="/taxonomies" element={<Taxonomies />} />
        <Route path="/taxonomies/:listName" element={<CreateUserTaxonomy />} />
        <Route
          path={`/taxonomy/taxonomyName/:taxonomyName`}
          element={<Taxonomy />}
        ></Route>
        <Route path="/taxonomy/id/:id" element={<SpeciesById />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/members" element={<Members />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />{' '}
        <Route path="/about" element={<About />} />
        <Route path="/panel" element={<Notifications />}></Route>
        <Route
          path="*"
          element={
            <InfoBox>
              Page not found! Please Login or refresh!
              <ReLoginButton />
            </InfoBox>
          }
        />
      </Route>
    </Routes>
  )
}
