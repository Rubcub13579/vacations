import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Components/LayoutArea/Layout/Layout.tsx'
import './index.css'
import { interceptor } from './Utils/Interceptor.ts'
import { Provider } from 'react-redux'
import { store } from './redux/Store.ts'

interceptor.create();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter >
    <Provider store={store}>
      <Layout />
    </Provider>
  </BrowserRouter>,
)
