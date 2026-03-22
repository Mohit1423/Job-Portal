import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider } from 'react-redux'
import store from './redux/store'
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
    
        <Provider store={store}>
            <PersistGate loading={false} persistor ={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    

);