import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './services/store.ts'
import GithubSearch from './pages/GithubSearch.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <GithubSearch />
    </Provider>
  </StrictMode>,
)
