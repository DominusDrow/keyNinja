import { useState } from 'react'
import TypingPractice from './components/typing/main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <TypingPractice />

    </div>
  )
}

export default App
