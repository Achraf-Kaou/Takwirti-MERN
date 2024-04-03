import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Sidebar, { SidebarItem } from './SideBar';
import FriendsCard from './FriendsCard';
import { School, Settings, LogOut } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';

const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Page 1', path: '/page1' },
  { label: 'Page 2', path: '/page2' },
  // Add more links as needed
];



const FriendsList = () => {
  const [searchUserTerm, setsearchUserTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([]);
  const [findpeople, setFindpeople] =useState([]);
  const { user } = useAuthContext();
  const handleSearchBar = (searchTerm) => {
    // bar ala jnab
  };
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${user.userObj._id}/friends`);
        setFriends(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriends();
  }, [user.userObj._id]);

  const removeFriend = async (friendId) => {
    try {
      const response = await fetch('http://localhost:4000/api/users/remove_friend', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.userObj._id, friendId })
      });
      
      const data = await response.json();
      console.log(data.message);
      setFriends(friends.filter(friend => friend._id !== friendId));
    } catch (error) {
      console.error('Failed to remove friend', error);
    }
  };
  const handleSearchUser = async () => {
    try {
      console.log("Search term:", searchUserTerm);
      const response = await axios.get(`http://localhost:4000/api/users/search/${searchUserTerm}`);
      console.log(response.data);
      setFindpeople(response.data.users);
    } catch (error) {
      console.error('Failed to search for users', error);
    }
  };
  
  const addFriend = async (friendId) => {
    try {
      alert(friendId)
      
    } catch (error) {
      console.error('Failed to add friend', error);
    }
  };



  return (
    <>
      <NavBar links={links} />
      <div className='flex flex-row'>
        <Sidebar>
          <SidebarItem icon={<FontAwesomeIcon icon={faSearch} />} text={<SearchBox onSearch={handleSearchBar} />} />
          <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
              <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
              <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/list'} />
              <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />

        </Sidebar>
        <div className='m-2'>
        <h2 className='text-bold text-2xl m-2'>Find People</h2>
        <div className="flex items-center justify-center">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-10 py-2 text-green-500 bg-white border rounded-full focus:border-green-500 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    value={searchUserTerm}
                    onChange={(e) => setsearchUserTerm(e.target.value)}
                />
                <button className="px-4 text-white bg-green-500 rounded-full" onClick={handleSearchUser}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
        { findpeople.length > 0 && (
  <div className='m-2'>
    <h2 className='text-bold text-2xl m-2'>Search Results</h2>
    {findpeople.map((person) => (
      <FriendsCard key={person._id} data={person} onAddFriend={addFriend} showAddButton={true} />
    ))}
  </div>
)}

     





          <h2 className='text-bold text-2xl m-2'>All friends</h2>
          {friends.map((friend) => (
            <ul>
              <li key={friend._id}>
                <FriendsCard data={friend} onRemoveFriend={removeFriend} />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
