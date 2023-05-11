import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import ProjectsPage from './ProjectsPage';
import LoginForm from './login/LoginForm';

function App() {
  return (
	<LoginForm></LoginForm>
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
