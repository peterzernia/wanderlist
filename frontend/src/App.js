import './App.css'
import React from 'react'
import Layout from './containers/Layout'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

export default function App() {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overides: {
      CardActions: {
        root: {
          overflow: 'scroll'
        }
      }
    },
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#000000',
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Layout />>
    </MuiThemeProvider>
  );
}