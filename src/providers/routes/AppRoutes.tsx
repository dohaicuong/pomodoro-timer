import { Routes, Route } from 'react-router-dom'
import DefaultClock from '../../pages/DefaultClock'
import SmartClock from '../../pages/SmartClock'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<DefaultClock />} />
      <Route path='/smart' element={<SmartClock />} />
    </Routes>
  )
}
