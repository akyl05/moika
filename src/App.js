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
    toast("Необходимо указать цену!")
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
    <select onChange={e => setValue({...value,mark:e.target.value})} value={value.mark} name="mark" >

      <option value="другая машина">другая машина</option>
      <option value="Toyota">Toyota</option>
      <option value="Subaru">Subaru</option>
      <option value="Mersedes">Merseder</option>
      <option value="Honda">Honda</option>
      <option value="Nissan">Nissan</option>
      <option value="Jiga">Jiga</option>
      <option value="Lexus">Lexus</option>
      <option value="Bmw">Bmw</option>
      
    </select>
    <input placeholder='цена' type="number" min={50} step={50} max={1000} onChange={e => setValue({...value,price:e.target.value})} value={value.price} />
    <button onClick={addPost}>+</button>

      </form>
      <div>
        {post.length === 0 ?
          <h2 className='h1' style={{textAlign:'center'}}>нет машин !</h2>:
          post.map((item,index)=>{
            return(


              <div  className='posts' key={index}>
                <div><h1>марка  : <span>{item.mark.length === 0? 'другая машина' : item.mark}</span></h1></div>
                <div><h1>{item.price} сом</h1></div>
                
              </div>


            )
          })
        }
        <div style={{display:'flex',justifyContent:'center',fontSize:'20px'}}><p>сегодня автомобили: {price}</p></div>

       
      </div>
        <ToastContainer/>
      <div style={{textAlign:'center'}}>
      <button onClick={deleteAll} style={{width:'100px',color:'red'}}>удалить все</button>
      </div>
    </div>
  );
}

export default App;
