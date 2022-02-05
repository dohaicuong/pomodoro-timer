import { createTheme } from '@mui/material'
import { orange } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  status: {
    danger: orange[500],
  },
})

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }

  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}
