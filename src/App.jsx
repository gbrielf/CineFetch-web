import Header from './components/Header'
import Home from './pages/Home/Home.jsx'

function App() {
  return (
    <div className="w-full min-h-screen relative">
      <div className="w-full min-h-screen bg-black bg-opacity-60 overflow-y-auto">
        <Header />
        <main className="flex items-center justify-center min-h-screen pt-20">
           <Home />
        </main>
      </div>
    </div>
  )
}

export default App