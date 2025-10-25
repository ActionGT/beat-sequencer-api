import { useState } from 'react'
import './App.css'
import SequencerGrid from './components/SequencerGrid'
import TransportControls from './components/TransportControls'

function App() {
 

  return (
    <>
      <div>
       
        
      
      <h1>Beat-Seq-Front</h1>
      <TransportControls />
      <SequencerGrid />
    
      </div>
    </>
  )
}

export default App
