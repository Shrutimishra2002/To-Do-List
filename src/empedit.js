import React, { useState,useEffect} from 'react'
import  { Link,useNavigate,useParams} from 'react-router-dom';

export default function Empedit(){
    const {empid} = useParams();
    const[id,idchange] =useState("");
    const[title,titlechange] =useState("");
    const[detail,detailchange] =useState("");
    const[date,datechange] =useState("");
    const navigation = useNavigate();
    useEffect(()=>{
        fetch('http://localhost:8000/cruddata/'+empid).then((res)=>{
        return res.json(); 
        }).then((res)=>{
            idchange(res.id);
            titlechange(res.title);
            detailchange(res.detail);
            datechange(res.date);
        }).catch((err)=>{
            console.log(err);
        })
   
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        const empdata = {id,title,detail,date}
       
            fetch('http://localhost:8000/cruddata/'+empid,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(empdata)
            }).then((res)=>{
                alert('Record inserted');
                navigation('/');
            }).catch((err)=>{
                console.log(err);
            })
           }
  return (
    <div>
      <div className='row'>
        <div className='container'>
            <div className='card'>
                <div className='card-title'>
                    <h2>Shruti's To-Do List</h2>
                </div>
                <div className='card-body'>
                <div className='offset-lg-3 col-lg-6'>
                <form onSubmit={handleSubmit}>
                    <div className='row' style={{'textAlign':'left'}}>
                    <div className='container'>
                    <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>Title</label>
                                    <input type='text' value={title} onChange={e=>titlechange(e.target.value)} className='form-control' required></input>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>Detail</label>
                                    <input type='text' value={detail} onChange={e=>detailchange(e.target.value)} className='form-control' required></input>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>Date</label>
                                    <input type='text' value={date} onChange={e=>datechange(e.target.value)} className='form-control' required></input>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group' style={{'textAlign':'center'}}>
                                    <button type='submit' className='btn btn-success m-2'>Submit</button>
                                    <Link to="/" className='btn btn-danger'>Back</Link>
                                </div>
                            </div>
                    </div>
                </div>
            </form>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}
