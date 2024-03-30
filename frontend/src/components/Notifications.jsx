import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Sidebar, { SidebarItem } from './SideBar';
import { School, Settings, LogOut } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';
import NotificationCard from './NotificationCard';

const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Page 1', path: '/page1' },
    { label: 'Page 2', path: '/page2' },
    // Add more links as needed
  ];



const Notifications = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuthContext();
    
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/noti/getallnotiuser/${user.userObj._id}`);
          setNotifications(response.data.notifications);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNotifications();
    },[]); 

  
    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };
  


    return (
        <>
            <NavBar links={links} />
            <div className='flex flex-row'>
                <Sidebar>
                    <SidebarItem icon={<FontAwesomeIcon icon={faSearch} />} text={<SearchBox onSearch={handleSearch} />} />
                    <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
                    <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
                    <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
                    <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/list'} />
                    <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />
                    <SidebarItem icon={<LogOut />} text="Se déconnecter"/>
                </Sidebar>
                <div className='m-2'>
                    <h2 className='text-bold text-2xl m-2'>All notifications</h2> 
                    {notifications.map((notification) => (
                        <NotificationCard key={notification._id} data={notification} />
                    ))}
                </div>
            </div>
        </>
    );
                  }      
  
  export default Notifications;
  