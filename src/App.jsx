import { useEffect, useState } from 'react'
import './App.css'
import { PieChart } from '@mui/x-charts'
import { desc, legend } from 'motion/react-client'

function App() {
  const [balance, setBalance] = useState(0)
  const [totalincome, setTotalIncome] = useState(0)
  const [totalexpense, setTotalexpense] = useState(0)
  const [incomearr, setIncomearr] = useState([])
  const [expensearr, setExpensearr] = useState([])
  const [amountobject, setAmountobject] = useState({
    description: '',
    amount: ''
  })
  const [popup, setPopup] = useState(false)
  const [description, setDescription] =useState('')
  const [amount, setAmount] = useState('') 
  const [transtactiontype, setTransactiontype] = useState('')


  function Clear() {
    setAmount('')
    setDescription('')
    setPopup(false)
  }




  function setExpense() {
    
  
  }

  function setIncome() {
    if(amount !== '' && description !== '') {
    const tempIncome = totalincome +  Math.floor(amount)
    const newTransaction = {description,amount}
    if(transtactiontype === 'income') {
      const temptotalincome = totalincome + Math.floor(amount)
      const tempincome =[...incomearr, newTransaction]
      setTotalIncome(temptotalincome)
      setIncomearr(tempincome)
     
    }
    else {
      const tempExpense = totalexpense + Math.floor(amount)
      setTotalexpense(tempExpense)
      setExpensearr([...expensearr, newTransaction])

    }
   
    console.log(totalincome,totalexpense)
     
    Clear()
  }
  }

  useEffect(() => {
    const tempbalance = Math.floor(totalincome) - Math.floor(totalexpense)
    setBalance(tempbalance)
  },[totalincome,totalexpense])
 

  
  return (
    
    <div className="wrapper">


   

    {popup ? <><div className='gray'></div> 
     <div className="popup">
      <div className="popupwrapper">
      <p className='titlepopup'>Add new Transaction</p>
      <form>
        <p className='p1'>Enter Description</p>
        <input className='in1' 
        onChange={(e) =>setDescription(e.target.value) }
        value={description}
        placeholder='Enter Transaction Description'
        
        />
        <p className='p1'>Enter Amount</p>
        <input className='in1' 
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
         placeholder='Enter Transaction Description'
        required
        
        /><br />
        <div className="radiowrapper">
        <input type='radio'
        name='question'
        onChange={() => setTransactiontype('income')}
        required
        
        /><label>Income</label>
        <input type='radio'
        name='question' 
        onChange={() => setTransactiontype('expense')}
        
        /><label>Expense</label></div>  <br></br>
        <div className='buttonwrapper'>
        <button onClick={(e) => {
          e.preventDefault()
          setIncome()
        }}>Submit</button>
        <button onClick={() => setPopup(false)}>Cancle</button>
        </div>
      </form>
      </div>
      
      
      
      
      
      
      
      
      
      
      
      </div></>: ""}



      
    <div>
      <header>
        <h1>Expense Tracker</h1>
        <button onClick={() => setPopup(true)} className='transactionbutton'>Add New Transaction</button>
      </header>
      <div className="main">
        <div className="balance">
          <p className='balancetext'>Balance is ${balance}</p>

          <p className='money'>$ {totalincome}</p>
          <p>Total Income</p>

          <p className='money'>$ {totalexpense}</p>
          <p>Total Expense</p>

        </div>

        <div className="chart">
        <PieChart
      series={[
        {
          data: [
            { id: 0, value: totalexpense,label: 'Total Expenses ' },
            { id: 1, value: totalincome,label: 'Total Income' },
            
          ],
        },
      ]}
      
      width={400}
      height={200}
      slotProps={{legend: { hidden: true }}}
      
    />
        </div>
      </div>


      <div className="income-expense">

        <div className="income">
          <p>Income</p>
        {incomearr.map((item) => (
          <div className='cetnertransaction div1'>
            <p className='pmoney'>{item.description}</p>
            <p>{item.amount }$</p>
          </div>
        ))}
        </div>
        <div className="expense">
          <p>Expense</p>
          {expensearr.map((item) => (
          <div className='cetnertransaction div2'>
            <p className='pmoney'>{item.description}</p>
            <p>{item.amount }$</p>
          </div>
        ))}    
        </div>
      </div>
    </div>
    </div>

  )
}

export default App
