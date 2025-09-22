import { useEffect, useState } from 'react'


function App() {
  const [amount, setAmount] = useState('')
  const [rates, setRates] = useState({})
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
    .then((res) => res.json())
    .then((data) => {
      console.log('api write a', data);
      setRates(data.rates)
      setLoading(false)
    })
    .catch((err) => {
      console.error('error', err);
      setLoading(false)
    })
  }, [])

  if(loading) return(
    <div className='loading_container'>
      <h1>loading</h1>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  )

  const convert = () => {
    if(rates[from] && rates[to]) {
      const usdAmout = amount / rates[from]
      const converted = usdAmout * rates[to]
      setResult(converted.toFixed(2))
    }
  }

  return(
    <div className="converter_container">
      <input type="number" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Write a num'
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        {Object.keys(rates).map(code => (
          <option value={code} key={code}>{code}</option>
        ))}
      </select>
      <span> ➝ </span>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        {Object.keys(rates).map(code => (
          <option value={code} key={code}>{code}</option>
        ))}
      </select>
      <button onClick={convert}>Value converted</button>

      {result && (
        <h2>
          {amount} {from} = {result} {to}
        </h2>
      )}
    </div>
  )
}

export default App
