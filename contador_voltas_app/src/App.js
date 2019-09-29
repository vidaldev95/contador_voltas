import React, {useState, useEffect} from 'react'
import './styles.css'

import MostraVoltas from './MostraVoltas'
import MostraTempo from './MostraTempo'
import MostraTempoAtual from './MostraTempoAtual'
import Button from './Button'

function App() {
  const [numVoltas, setNumVoltas] = useState(0)
  const [running, setRunning] = useState(false)
  const [tempo, setTempo] = useState(0)

  useEffect(() => {
    let timer = null
    if(running){
      timer = setInterval(() => {
        setTempo(old => old + 1)
      }, 1000)
    }

    return () => {
      if(timer) {
        clearInterval(timer)
      }
    }
  }, [running])

  const toggleRunning = () =>{
    setRunning(!running)
  }

  const increment = () => {
    setNumVoltas(numVoltas + 1)
  }

  const decrement = () =>{
    if(numVoltas > 0)
    setNumVoltas(numVoltas - 1)
  }
  const reset = () =>{
    setNumVoltas(0)
    setTempo(0)
  }
  return (
    <div>
      <MostraVoltas voltas={numVoltas} />

      <Button text="+" onClick={increment} />  
      <Button text="-" onClick={decrement} />
      {
        numVoltas > 0 &&
        <MostraTempo tempo={Math.round(tempo/numVoltas)} />
      }      
      <MostraTempoAtual tempo={tempo} />

      <Button onClick={toggleRunning} text={running ? 'Pausar' : 'Iniciar'} />  
      <Button onClick={reset} text="Reiniciar" />

    </div>
  )
}

export default App;
