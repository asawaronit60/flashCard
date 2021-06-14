import React,{useState ,useEffect  ,useRef}  from "react";
import FlashCardList from "./FlashCardList";
import './app.css'
import axios from 'axios'

function App() {
   
  const [flashcards , setFlashcard ] = useState([])
  const [categorires , setCategories] = useState([])
  
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(()=>{
    axios.get('https://opentdb.com/api_category.php')
    .then(res =>{
         setCategories(res.data.trivia_categories)
    })
  })


  useEffect(()=>{
     axios.get('https://opentdb.com/api.php?amount=10')
      .then(response=>{
      //  console.log(response.data.results)
        setFlashcard(response.data.results.map((questionItem,index)=>{
          const answer = (questionItem.correct_answer)
          const options = [...questionItem.incorrect_answers.map(a=>decodedString(a)) , answer]
          return {
            id: `${index} ${Date.now()}`,
            key: `${index} ${Date.now()}`,
            questions:decodedString(questionItem.question),
            answer:answer,
            options:options.sort(()=> Math.random - .5)
          }
        })
        )
      })
  } , [])

  function decodedString(str){
    const txtArea =  document.createElement('textarea')
    txtArea.innerHTML=  str
    return txtArea.value
  }

 function handleSumbit(e){
       e.preventDefault();
       axios.get('https://opentdb.com/api.php',{
         params:{
           amount:document.getElementById("amount").value,
           category: categoryEl.current.value
         }
       })
      .then(response=>{
        setFlashcard(response.data.results.map((questionItem,index)=>{
          const answer = decodedString(questionItem.correct_answer)
          const options = [...questionItem.incorrect_answers.map(a=>decodedString(a)) , answer]
          return {
            id: `${index} ${Date.now()}`,
            key: `${index} ${Date.now()}`,
            questions:decodedString(questionItem.question),
            answer:answer,
            options:options.sort(()=> Math.random - .5)
          }
        })
        )
      })
       
 }

  return (
    <>
     <form className= "header" onSubmit={handleSumbit}> 
          <div className="form-group"> 
               <label htmlFor="category" >Category</label>
               <select id ="category" ref={categoryEl} >
                  {categorires.map(category=>{
                    return <option value={category.id} key={category.id} >{category.name}</option>
                  })}
               </select>
          </div>
          <div className="form-group"> 
               <label htmlFor="amount" >No. of questions</label>
                <input type="number" min = "1" defaultValue="10" step="1" id="amount" ref={amountEl} />
          </div>
          <div className="form-group">  
            <button className="btn"> Generate </button> 
           </div>
     </form>
    <div className="container">
      <FlashCardList flashCards={flashcards}  />
    </div>
 </>
         
    );
}



export default App;
