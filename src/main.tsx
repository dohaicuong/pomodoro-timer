import { createRoot } from 'react-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './providers/routes/AppRoutes'

import ThemeProvider from './providers/theme/ThemeProvider'

const rootElement = document.getElementById('root')
if(!rootElement) throw new Error('Root element not found. Unable to render the App')

createRoot(rootElement).render(
  <BrowserRouter>
    <ThemeProvider>
      <ErrorBoundary fallback={<>Something went wrong!</>}>
        <Suspense fallback='Loading...'>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  </BrowserRouter>
)
