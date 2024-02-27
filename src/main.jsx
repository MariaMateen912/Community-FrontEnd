import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider,  extendTheme} from '@chakra-ui/react'
import colors from './styles/Branding.jsx'

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ChakraProvider  theme={theme} > 
    <App />
    </ChakraProvider>
</React.StrictMode>
)
