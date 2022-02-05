import { createRoot } from 'react-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ThemeProvider from './providers/theme/ThemeProvider'

import App from './App'

const rootElement = document.getElementById('root')
if(!rootElement) throw new Error('Root element not found. Unable to render the App')

createRoot(rootElement).render(
  <ThemeProvider>
    <ErrorBoundary fallback={<>Something went wrong!</>}>
      <Suspense fallback='Loading...'>
        <App />
      </Suspense>
    </ErrorBoundary>
  </ThemeProvider>
)
