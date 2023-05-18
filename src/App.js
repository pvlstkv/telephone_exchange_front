import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import ProjectsPage from './ProjectsPage';
import LoginForm from './login/LoginForm';
import { useNavigate } from 'react-router-dom';
import SubscriberProfile from './user_profile/SubscriberProfile';
import CityTable from './city/CityTable';
import DistrictTable from './district/DistrictTable';
import TelephoneNumberTable from './TelephoneNumber/TelephoneNumberTable';
import TelephoneNumberEdit from './TelephoneNumber/TelephoneNumberEdit';
import TelephoneNumberCreate from './TelephoneNumber/TelephoneNumberCreate';
import SubscriberTable from './user_profile/SubscriberTable';
import TelephoneExchangeTable from './TelephoneExchange/TelephoneExchangeTable';
import CityCreate from './city/CityCreate';
import DistrictCreate from './district/DistrictCreate';

function App() {
  // const navigate = useNavigate();
  // let page;
  let isAuthenticated = JSON.parse(localStorage.getItem('authenticated'))
  // console.log(isAuthenticated)
  // let pathPage = isAuthenticated ? '/' : '/login'
  // if (isAuthenticated){
  //   page = <MainPage></MainPage>
  // }else{
  //   page = <LoginForm></LoginForm>
  // }
  return (
    <Router>
      <Routes>

      <Route exact path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <MainPage />}> </Route>
        
        {/* <Route exact path={pathPage} element={page}></Route> */}
      {/* {!JSON.parse(localStorage.getItem('authenticated')) ? 
        <Route exact path='/login' element={<LoginForm></LoginForm>}></Route> 
            :<Route exact path='/contact' element={<ContactPage/>}></Route> } */}
        <Route exact path='/login' element={<LoginForm/>}></Route>
        <Route exact path='/' element={<MainPage/>}></Route>
        <Route exact path='/contact' element={<ContactPage></ContactPage>} ></Route>
        <Route exact path='/profile' element={<SubscriberProfile></SubscriberProfile>}></Route>
        
        <Route exact path='/cities' element={<CityTable></CityTable>}></Route>
        <Route exact path='/cities/creating' element={<CityCreate/>}/>
       
        <Route exact path='/districts' element={<DistrictTable></DistrictTable>}></Route>
        <Route exact path='/districts/creating' element={<DistrictCreate />}/>

        <Route exact path='/telephone-numbers' element={<TelephoneNumberTable></TelephoneNumberTable>}></Route>
        <Route exact path='/telephone-numbers/editing/:id' element={<TelephoneNumberEdit></TelephoneNumberEdit>}></Route>
        <Route exact path='/telephone-numbers/creating' element={<TelephoneNumberCreate></TelephoneNumberCreate>}></Route>
        
        <Route exact path='/subscribers' element={<SubscriberTable/>}/>
        <Route exact path='/subscribers/editing/:id' element={<SubscriberProfile/>}/>
        <Route exact path='/subscribers/creating' element={<SubscriberProfile/>}/>

        <Route exact path='/telephone-exchanges' element={<TelephoneExchangeTable/>}/>
        {/* {navigate('/')} */}
      </Routes>
    </Router>
    
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<MainPage />}>
    //     </Route>
    //     <Route path="/contact" element={<ContactPage />}>
    //     </Route>
    //     <Route path="/about" element={<AboutPage />}>
    //     </Route>
    //     <Route path="/projects" element={ <ProjectsPage />}>     
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
