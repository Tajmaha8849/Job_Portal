import React,{useContext,useState,useEffect} from 'react'
import { Context } from '../../main.jsx'
import axios from 'axios'
import {useNavigate,Link} from "react-router-dom"


const Jobs = () => {
  const [jobs,setJobs]=useState([])
  const {isAuthorized}=useContext(Context)
  const navigate=useNavigate()


  useEffect(()=>{
    try{
      axios.get(`http://localhost:8000/api/v1/job/getall`,{withCredentials:true}).then((res)=>{
        setJobs(res.data)
      })
    }
    catch(error){
      console.log(error)

    }
  },[])

  if(!isAuthorized){
    navigate("/login")
  }
  return (
    <div className='jobs page'>
      <div className="container">
        <h1>ALL Available</h1>
        <div className="banner">
          {
            jobs.jobs && jobs.jobs.map((element)=>{
              return(
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>

                </div>
              )
            })
          }
        </div>
      </div>


    </div>
  )
}

export default Jobs