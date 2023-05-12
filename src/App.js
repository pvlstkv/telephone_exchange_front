import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import ProjectsPage from './ProjectsPage';
import LoginForm from './login/LoginForm';

function App() {
  let page;
  if (JSON.parse(localStorage.getItem('authenticated'))){
    page = <MainPage></MainPage>
  }else{
    page = <LoginForm></LoginForm>
  }
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={page}></Route>
      {/* {!JSON.parse(localStorage.getItem('authenticated')) ? 
        <Route exact path='/login' element={<LoginForm></LoginForm>}></Route> 
            :<Route exact path='/contact' element={<ContactPage/>}></Route> } */}

        <Route exact path='/contact' element={<ContactPage></ContactPage>} ></Route>
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
