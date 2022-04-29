import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
// import { localServer } from 'mocks'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { UserProvider } from 'contexts/userContext'
import { InfoBanner } from 'screens/misc/info'

// localServer()
const queryClient = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <InfoBanner text="Safarilive.org had a some minor issues with Web hosting. Which will be fixed sooner. Thank for you patiences." />
          <App />
        </Router>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
