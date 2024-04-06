import React, {useState,useEffect} from 'react'
import NavBar from '../components/NavBar';
import Sidebar , { SidebarItem } from '../components/SideBar';
import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TerrainList from '../components/TerrainList';
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { School ,Settings} from 'lucide-react';

  
const PageUtilisateur = () => {
    const view = 'board';
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuthContext();
    const [isLoaded, setIsLoaded] = useState(false); // Initialize isLoaded to false
    const [width, setWidth] = useState();
    const handleWidth = (width) => {
      setWidth(width);
    }
    useEffect(() => {
      handleWidth(width);
    },[width]);
    const [w, setW] = useState();
    const handleW = (width) => {
      if (width === 284){
      setW(400);}
      else {setW(width);}
    }
    useEffect(() => {
      handleW(width);
    },[width]);
    // Check if there is no user or their type is not Particulier
    useEffect(() => {
      if (!user || user.userObj.__t !== 'Particulier') {
        return <Navigate to="/signin" />;
      }
      setIsLoaded(true); // Set isLoaded to true once user data is loaded
    }, [user]);


    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };

    if (!isLoaded) {
      // Return null or a loading component while waiting for user data
      return <div>Loading...</div>;
    }
  return (
    <>
        <NavBar />
        <div className='flex flex-row'>
           <Sidebar sendWidth={handleWidth} >
              <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
              <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
              <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
              <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/listP'} />
              <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />
           </Sidebar>
           <div className={`relative left-[${w}px] top-[82px] w-[calc(100vw-${w}px)] `}>
           {searchTerm ? <TerrainList param={"search"} searchTerm={searchTerm} /> :(
              <div className=''>
                <h1 className='text-3xl font-bold my-2'>Cheapest fields</h1>
                <TerrainList param={"get"}/>
              </div>)}
            </div>
        </div>
    </>
  )
}

export default PageUtilisateur