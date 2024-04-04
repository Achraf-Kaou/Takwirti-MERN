import './App.css';
import Sign_in from './pages/Sign_in';
import Stats from './components/Stats';
import MainPage from './pages/MainPage';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import DashboardRes from './components/DashboardRes';
import ParentCalendar from './components/Parentcalendar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Terrain from './components/Terrain';
import Responsable from './pages/Responsable';
import TerrainsResp from './components/TerrainsResp';
import PageUtilisateur from './pages/PageUtilisateur';
import Detail from './components/Detail';
import Profile from './components/Profile';
import Sign_up from './pages/Sign_up';
import { ReservationAdd } from './components/ReservationAdd';
import ReservationEdit from './components/ReservationEdit';
import ReservationList from './components/ReservationList';
import List from './components/List';
import SearchBox from './components/SearchBox';
import TerrainList from './components/TerrainList';
import ProfileModif from './components/ProfileModif';
import { useAuthContext } from './hooks/useAuthContext';
import FriendsList from './components/FriendsList';
import Notifications from './components/Notifications';
import Tachkila from './components/Tachkila';
import { TeamProvider } from './context/Teamcontext';
import ReservationAddParent from './components/ReservationAddParent';
import Responsable2 from './components/Responsable2';

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

    //protection mtaa el routes ( pour le moment particulier w reponsable )
    const { user } = useAuthContext();


  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage HomePage={true}/>} />
          <Route path="/navbar" element={<NavBar/>} />
          <Route path="/sidebar" element={<SideBar links={links}/>} />
          <Route path="/calendar" element={<ParentCalendar/>} />
          <Route path="/signuprespo" element={<Sign_up xxx={"responsable"}/>} />
          <Route path="/signupparti" element={<Sign_up xxx={"particulier"}/>} />
          <Route path="/signin" element={<Sign_in/>} />
          <Route path="/stats" element={<Stats/>} />
          <Route path='/responsable' element={<Responsable/>}/>  {/* protected */} 
          <Route path='/responsable/:terrainId' element={<Responsable2/>}/>
          <Route path='/terrain/add' element={<Terrain func={"add"} id={"9876543210fedcba"}/>}/>
          <Route path='/terrain/responsable' element={<TerrainsResp/>}/>
          <Route path='/particulier' element={<PageUtilisateur/>}/> {/* protected */} 
          <Route path="/terrain/detail/:id" element={<Detail/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/modifier" element={<ProfileModif/>} />
          <Route path="/notifications" element={<Notifications/>} />     
          <Route path="/Reservation/add/:idUser/:idTer" element={<ReservationAddParent />} />
          <Route path="/list" element={<List/>} />
          <Route path="/reservation/list" element={<ReservationList xxx={"Particulier"}/>} />
          <Route path="/reservation/edit" element={<ReservationEdit iduser={"6602626e608a35e2bf409f56"}/>} />
          <Route path='/terrain/update/:id' element={<Terrain func={"update"}/>}/>
          <Route path='/friendslist' element={<FriendsList/>}/>
          <Route path='/tachkila' element={<Tachkila/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

      
export default App;
