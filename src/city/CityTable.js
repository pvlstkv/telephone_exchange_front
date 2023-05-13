import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CityTable() {
  const [cities, setCities] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState([]);
  let jwt = localStorage.getItem('token')
  let axiosConfig = {
    headers:{
        Authorization: "Bearer " + jwt
    }
  }  

  useEffect(() => {
    const fetchCities = async ()=>{
      // const response = await 
      axios.get(`http://localhost:8080/cities/all-extended`, axiosConfig)
      .then(response=>{
        setCities(response.data)
        console.log('cities', response.data)

        // response.data.forEach((city) => {
        //   if (city.districtIds.length > 0){
        //     const districtIds = city.districtIds.join(',');
        //     console.log('district ids is ', districtIds)
        //     // const districtResponse = await
        //      axios.get(`http://localhost:8080/districts/${districtIds}`, axiosConfig)
        //     .then(response2=>{
        //       setDistricts([...districts, response2.data])
        //       console.log('districts is', response2.data)
        //     });
        //     console.log()
        //     //console.log('districts is', districts)
        // }
        // });
      })

      
        }
    fetchCities();
  }, []);

  const handleRowMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  // useEffect(()=>{
  //   async function fetchDistricts(){
  //     if(cities.length > 0 ){
  //       const response = await axios.get(`http://localhost:8080/districts/${ids}`, axiosConfig)
  //     }
  //   }
  // },)

  // const fetchDistricts = (ids) =>{
  //   let d
  //   const fetchCities = async ()=>{
  //     const response = await axios.get(`http://localhost:8080/districts/${ids}`, axiosConfig)
  //     setDistricts(response.data)
  //     d = response.data 

  //   }
  //   fetchCities();
  // return d
  // }

  return (
    <div>
      <h1>"Таблица города"</h1>
      <p>{`${cities.length} найдено записей`}</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Названия города</th>
            <th>Районы города</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, ind) => (
            <tr
              key={ind}
              onMouseEnter={() => handleRowMouseEnter(ind)}
              onMouseLeave={handleRowMouseLeave}
              style={{ backgroundColor: highlightedRow === ind ? 'yellow' : ind % 2 === 0 ? 'white' : 'lightgray' }}
            >
              <td>{ind}</td>
              <td>{city.name}</td>
             
              <td>{city.districts.length > 0 ? city.districts.map(district => district.name).join(', '): "-"}</td>

               
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <button disabled={cities.length < pageSize} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div> */}
    </div>
  );
}

export default CityTable;
