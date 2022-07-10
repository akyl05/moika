import './App.css';
import React,{useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const getfromLocal = () =>{
    const list = localStorage.getItem('lists')
    
    
    if(list){
      return JSON.parse(localStorage.getItem('lists'))
    }else{
      return []
    }
  
  }
  const getdig = ()=>{
    const dig = localStorage.getItem('dig')
    if(dig){
      return JSON.parse(localStorage.getItem('dig'))
    }else{
    return 0
  }}
const [value,setValue] = useState({mark:'',price:''})
const [post,setPost] = useState(getfromLocal())
let [price,setPrice] = useState(getdig())
console.log(value);

const addPost = (e)=>{
  e.preventDefault()
  setValue({mark:'',price:''})
  console.log(post)
  
 
  if(value.price.length === 0){
    toast("Price doesn't should be empty")
  }else{
    setPost([...post,{...value, id:Date.now()}])
    setPrice(price + 1)
  }

}
const deleteAll=()=>{
  setPrice(0)
  localStorage.clear()

}
useEffect(()=>{
  localStorage.setItem('lists',JSON.stringify(post))
  localStorage.setItem('dig',JSON.stringify(price))
},[post,price])



  return (
    <div className="App">
      <form >
    <input placeholder='mark' type="a-z" onChange={e => setValue({...value,mark:e.target.value})} value={value.mark}/>
    <input placeholder='price' type="number" onChange={e => setValue({...value,price:e.target.value})} value={value.price} />
    <button onClick={addPost}>+</button>

      </form>
      <div>
        {post.length === 0 ?
          <h1 style={{textAlign:'center'}}>has not car</h1>:
          post.map((item,index)=>{
            return(


              <div  className='posts' key={index}>
                <div><h1>mark : <span>{item.mark}</span></h1></div>
                <div><h1>{item.price} som</h1></div>
                
              </div>


            )
          })
        }
        <div style={{display:'flex',justifyContent:'center',fontSize:'20px'}}><p>today cars: {price}</p></div>

       
      </div>
        <ToastContainer/>
      <div style={{textAlign:'center'}}>
      <button onClick={deleteAll} style={{width:'100px',color:'red'}}>Delete all</button>
      </div>
    </div>
  );
}

export default App;
