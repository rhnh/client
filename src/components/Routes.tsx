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
import { InfoBox } from './themed-components'
import { Taxonomy } from 'screens/taxonomies/Taxonomy'
import { ShowPost } from 'screens/posts/ShowPost'
import { Notifications } from 'screens/notifications/Notifications'
import { CreateTaxonomy } from 'screens/taxonomies/CreateTaxonomy'
import { UnApproved } from 'screens/taxonomies/UnApproved'
import { LinkedButton } from './themed-button'

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
        {/* Lists */}
        <Route path={`/lists/:username`} element={<Lists />} />
        <Route path={`/lists/:username/list/:listName`} element={<List />} />
        <Route path="/lists/:username/list" element={<CreateList />} />
        {/* Posts */}
        <Route path="/posts" element={<Posts />} />
        <Route path={`/posts/post/:id`} element={<ShowPost />} />
        <Route path="/posts/post" element={<CreatePost />} />
        <Route path="/posts" element={<Posts />} />
        {/* Taxonomies */}
        <Route path="/taxonomies" element={<Taxonomies />} />
        <Route path="/taxonomies/taxonomy" element={<CreateUserTaxonomy />} />
        <Route
          path={`/taxonomies/taxonomyName/:taxonomyName`}
          element={<Taxonomy />}
        />
        <Route
          path="/taxonomies/taxonomy/create"
          element={<CreateTaxonomy />}
        />
        <Route path="/taxonomies/taxonomy/id/:id" element={<SpeciesById />} />
        <Route path="taxonomies/unapproved" element={<UnApproved />} />
        {/* Users */}
        <Route path="/users/profile/:username" element={<Profile />} />
        <Route path="/users/members" element={<Members />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/panel" element={<Notifications />}></Route>
        {/* main */}
        <Route path="/main/about" element={<About />} />
        <Route
          path="*"
          element={
            <InfoBox>
              Page not found! Please Login or refresh!
              <LinkedButton to="/" variant="primary">
                Back main page
              </LinkedButton>
            </InfoBox>
          }
        />
      </Route>
    </Routes>
  )
}
