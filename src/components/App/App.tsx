import React from 'react'
import './App.styles.css'
import AppRouter from '../AppRouter/AppRouter'
import { Provider } from 'react-redux'
import { store } from '../../store/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  )
}

export default App
