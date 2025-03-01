import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store, history } from './store/configureStore.js';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { ThemeProvider } from './layout/ThemeContext.jsx';
import "./config/i18n.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router history={history}> {/* Ensure history is passed here */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </StrictMode>,
)
