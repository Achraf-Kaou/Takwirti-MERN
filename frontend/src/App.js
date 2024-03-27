import './App.css';
import Sign_in from './components/Sign_in';
import Stats from './components/stats';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import DashboardRes from './components/DashboardRes';
import ParentCalendar from './components/parentcalendar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTerrain from './components/AddTerrain';
import Responsable from './components/Responsable';
import MesTerrains from './components/MesTerrains';
import PageUtilisateur from './components/PageUtilisateur';
import Detail from './components/Detail';
import Profile from './components/Profile';
import Sign_up from './components/Sign_up';
import { ReservationAdd } from './components/ReservationAdd';
import ReservationEdit from './components/ReservationEdit';
import ProfileModif from './components/ProfileModif';
import FriendsList from './components/FriendsList';
import Tachkila from './components/Tachkila';

const data = [
  { id: 1, name: 'Item 1', image:'/Section 1 image.jpg' },
  { id: 2, name: 'Item 2', image:'/Section 2 image.png' },
  { id: 3, name: 'Item 3', image:'/Section 3 image.jpg' },
  { id: 4, name: 'Item 4', image:'/Section 3 image.jpg' },
  { id: 5, name: 'Item 5', image:'/Section 3 image.jpg' },
  // Add more items as needed
];

const links = [
  {label: 'Accueil', path: '/'} ,
  {label: 'Page 1', path: '/page1'} ,
  {label: 'Page 2', path: '/page2' },
 // Add more links as needed
];

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/navbar" element={<NavBar/>} />
          <Route path="/sidebar" element={<SideBar links={links}/>} />
          <Route path="/calendar" element={<ParentCalendar/>} />
          <Route path="/signuprespo" element={<Sign_up xxx={"responsable"}/>} />
          <Route path="/signupparti" element={<Sign_up xxx={"utilisateur"}/>} />
          <Route path="/signin" element={<Sign_in/>} />
          <Route path="/stats" element={<Stats/>} />
          <Route path='/responsable' element={<Responsable/>}/>
          <Route path='/addterrain' element={<AddTerrain/>}/>
          <Route path='/mesterrains' element={<MesTerrains/>}/>
          <Route path='/utilisateur' element={<PageUtilisateur/>}/>
          <Route path="/detail" element={<Detail/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/addreservation" element={<ReservationAdd/>} />
          <Route path="/editreservation" element={<ReservationEdit iduser={1}/>} />
          <Route path="/profilemodifier" element={<ProfileModif/>} />
          <Route path="/friendslist" element={<FriendsList/>} />
          <Route path="/tachkila" element={<Tachkila/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

      
export default App;
