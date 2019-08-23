import './App.css'
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Layout from './containers/Layout'

export default function App() {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overides: {
      CardActions: {
        root: {
          overflow: 'scroll',
        },
      },
    },
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#000000',
      },
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  )
}
