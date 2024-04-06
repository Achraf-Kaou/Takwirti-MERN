import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ParentCalendar2 from '../components/ParentCalender2';
import Stats from '../components/Stats';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import SideBar, { SidebarItem } from '../components/SideBar';
import { School, Settings } from 'lucide-react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const ResponsableContent = ({ user }) => {
  
  const [terrainList, setTerrainList] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [width, setWidth] = useState();
  const [o,setO] = useState();
  const [p, setP]= useState();
  useEffect(() => {
    const setValuesBasedOnScreenSize = () => {
      if (window.matchMedia('(max-width: 600px)').matches) {
        // Small screen
        setO(250);
        setP(250);
      } else if (window.matchMedia('(max-width: 900px)').matches) {
        // Medium screen
        setO(400);
        setP(250);
      } else if (window.matchMedia('(max-width: 1400px)').matches) {
        // Large screen
        setO(600);
        setP(400);
      } else {
        // Extra large screen
        setO(800);
        setP(400);
      }
    };

    // Call the function initially to set values based on initial screen size
    setValuesBasedOnScreenSize();

    // Add event listener to update values when screen size changes
    window.addEventListener('resize', setValuesBasedOnScreenSize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', setValuesBasedOnScreenSize);
    };
  }, []);
  const handleWidth = (width) => {
    setWidth(width);
  }
  useEffect(() => {
    handleWidth(width);
  },[width]);
  const [w, setW] = useState();
  const handleW = (width) => {
    if (width === 284){
    setW(220);}
    else {setW(width);}
  }
  useEffect(() => {
    handleW(width);
  },[width]);
  const listTerrain = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/ter/terrain/list/${id}`);
      const data = response.data;
      setTerrainList(data.terrainList);
    } catch (error) {
      console.error('Failed to fetch terrain list:', error);
    }
  };

  const fetchReservationCount = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/res/reservation/compter/${id}`);
      return response.data.reservationCount;
    } catch (error) {
      console.error('Failed to fetch reservation count:', error);
      throw error; // Propagate the error to the caller
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      listTerrain(user.userObj._id);
      const count = await fetchReservationCount(user.userObj._id);
      setReservationData([{ date: 'Today', value: count }]);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar  />
      <div className='flex flex-row'>
        <SideBar sendWidth={handleWidth}>
          <SidebarItem icon={<School />} text="profile responsable" link={'responsable'} />
          <SidebarItem icon={<Settings />} text="list terrain" link={`terrain/responsable`} />
          <SidebarItem icon={<Settings />} text="reservation list" link={'reservation/listR'} />
        </SideBar>
        <div className={`ml-[50px] flex relative left-[${w}px] top-[82px] w-[calc(100vw-${w}px)] justify-center`}>
          <div className='flex flex-col'>

            <div className='border b-2 p-5 m-2 bg-white shadow-md rounded-md w-[250px] h-auto'>
              <h1 className='text-2xl border-b-2 border-b-black mb-2 '>Terrains</h1>
              <div className='flex flex-col'>
                {terrainList.length > 0 ? (
                  // Render terrain items if there are items in the list
                  terrainList.map((terrain, index) => (
                    <a href={`/responsable/${terrain._id}`} key={index} className='m-2 text-xl hover:text-green-500 '>
                      {terrain.nom}
                    </a>
                  ))
                ) : (
                  // Render a message if there are no terrain items
                  <p className='text-green-500 text-xl text-bold'>No terrains found.</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
            <h2 className='text-xl text-bold  my-2'>Reservation chart</h2>
            <LineChart width={o} height={p} data={reservationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            </div>

            <div className="w-[150px] h-[150px]  border border-gray-400 rounded-2xl shadow-md shadow-slate-400 transform transition-transform hover:rotate-360 m-2">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-gray-600 text-2xl text-bold">total reservations:</h1>
                <h2 className="text-green-500 text-4xl text-bold">{reservationData.length > 0 ? reservationData[0].value : 0}</h2>              
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

const Responsable = () => {
  const { user } = useAuthContext();

  if (!user || user.userObj.__t !== "Responsable") {
    return <Navigate to="/signin" />;
  }

  return <ResponsableContent user={user} />;
};

export default Responsable;
