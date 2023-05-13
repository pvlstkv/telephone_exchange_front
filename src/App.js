import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import ProjectsPage from './ProjectsPage';
import LoginForm from './login/LoginForm';
import { useNavigate } from 'react-router-dom';
import UserProfile from './user_profile/UserProfile';
import CityTable from './city/CityTable';
import DistrictTable from './district/DistrictTable';
import TelephoneNumberTable from './TelephoneNumber/TelephoneNumberTable';

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
        <Route exact path='/profile' element={<UserProfile></UserProfile>}></Route>
        <Route exact path='/cities' element={<CityTable></CityTable>}></Route>
        <Route exact path='/districts' element={<DistrictTable></DistrictTable>}></Route>
        <Route exact path='/telephone-numbers' element={<TelephoneNumberTable></TelephoneNumberTable>}></Route>

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
