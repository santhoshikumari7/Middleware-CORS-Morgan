import React, { useEffect, useRef } from 'react'
import { useState} from 'react';


function EmployeesForm() {

    let [countriesList,setCountriesList] = useState([]);
    let [departmentsList,setDepartmentsList] = useState([]);
    let [gendersList,setGendersList] = useState([]);

    let [employees,setEmployees] = useState([]);

    let countrySelectRef = useRef();
    let departmentSelectRef = useRef();
    let genderSelectRef = useRef();


    useEffect(()=>{
        getCounrysList();
        getDepartmentsList();
        getGendersList();
    },[]);

    let getCounrysList = async ()=>{
      
        let reqOptions = {
            method:"GET",
        }

        let JSONData = await fetch("http://localhost:4567/countriesList",reqOptions);
    
        let JSOData = await JSONData.json();
        setCountriesList(JSOData);

        console.log(JSOData);

    };

    let getDepartmentsList = async ()=>{
      
        let reqOptions = {
            method:"GET",
        };

        let JSONData = await fetch("http://localhost:4567/departmentsList",reqOptions);
    
        let JSOData = await JSONData.json();
        setDepartmentsList(JSOData);

        console.log(JSOData);

    };

    let getGendersList = async ()=>{
      
        let reqOptions = {
            method:"GET",
        };

        let JSONData = await fetch("http://localhost:4567/gendersList",reqOptions);
    
        let JSOData = await JSONData.json();
        setGendersList(JSOData);

        console.log(JSOData);

    };


   let getEmployeesFromServer = async ()=>{
     
    let reqOptions = {
        method:"GET"
    };

    let url1 = `http://localhost:4567/getEmployees?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`;

    let url2 = `http://localhost:4567/getEmployees/${countrySelectRef.current.value}/${departmentSelectRef.current.value}/${genderSelectRef.current.value}?limit=7`;

    console.log(url1);
    console.log(url2);


    let JSONData = await fetch(url1,reqOptions);

    let JSOData = await JSONData.json();
    setEmployees(JSOData);
    console.log(JSOData); 

  };

  return (
    <div>
        <form>
        <div>
            <label>Country</label>
            <select ref={countrySelectRef}>
                {countriesList.map((ele,i)=>{
                    return <option key={i}>{ele}</option>
                })}
            </select>
        </div>
        <div>
            <label>Department</label>
            <select ref={departmentSelectRef}>
                {departmentsList.map((ele,i)=>{
                    return <option key={i}>{ele}</option>;
                })}
            </select>
        </div>
        <div>
            <label>Gender</label>
            <select ref={genderSelectRef}>
               {gendersList.map((ele,i)=>{
                        return <option key={i}>{ele}</option>;
                    })}
                </select>
        </div>
      <button type="button" onClick={()=>{
       getEmployeesFromServer();
      }}
      >Get Employees
      </button>
      </form>
      <table>
        <thead>
            <tr>
                <th>S.No</th>
                <th>id</th>
                <th>Profile Pic</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Country</th>
            </tr>
        </thead>
        <tbody>
            {employees.map((ele,i)=>{
         return (
            <tr key={i}> 
                <td>{i+1}</td>
                <td>{ele.id}</td>
                <td><img src={ele.profilePic} alt=''></img></td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.age}</td>
                <td>{ele.email}</td>
                <td>{ele.gender}</td>
                <td>{ele.department}</td>
                <td>{ele.country}</td>
            </tr>
         );
            
        })};
            
        </tbody>
        <tfoot></tfoot>
      </table>
      
   </div>
  );
}

export default EmployeesForm
