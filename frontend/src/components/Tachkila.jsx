import React, { useContext, useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPen } from "react-icons/bs";
import { TeamContext } from '../context/Teamcontext';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const Tachkila = ({ handleTachkila }) => {
    const { team, setTeam } = useContext(TeamContext);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [friends, setFriends] = useState([]);
    const { user } = useAuthContext();
    const [showSuggestions, setShowSuggestions] = useState(false);

    const addPlayerFromInput = () => {
        const nameToAdd = newPlayerName.trim();
        if (nameToAdd !== '') {
            setTeam([...team, nameToAdd]);
            setNewPlayerName('');
            setShowSuggestions(false);
        }
    };

    const addPlayerFromSuggestion = (friend) => {
        const nameToAdd = friend.nom + ' ' + friend.prenom;
        setTeam([...team, nameToAdd]);
        setNewPlayerName('');
        setShowSuggestions(false);
    };

    const deletePlayer = (index) => {
        const updatedTeam = team.filter((_, i) => i !== index);
        setTeam(updatedTeam);
    };

    const updatePlayer = (index, newName) => {
        const updatedTeam = [...team];
        updatedTeam[index] = newName;
        setTeam(updatedTeam);
    };

    const handleInputClick = () => {
        setShowSuggestions(true);
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setNewPlayerName(input);
        setShowSuggestions(true);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            addPlayerFromInput();
        }
    };

    useEffect(() => {
        handleTachkila(team);
    }, [team, handleTachkila]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/users/${user.userObj._id}/friends`);
                setFriends(response.data);
                console.log("meiner friends ", response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFriends();
    }, []);

    return (
        <div className="flex flex-col w-full p-4">
            <h1 className="text-3xl font-bold mb-4">Tachkila list</h1>
            <div className="flex flex-col md:flex-row w-full mb-4 items-center justify-center">
                <input
                    type="text"
                    value={newPlayerName}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyPress}
                    placeholder="Add player"
                    className="border border-gray-300 p-2 w-full md:w-1/2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onClick={handleInputClick}
                />
                {showSuggestions && (
                    <ul className="mt-1 max-h-40 max-w-1/2 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
                        {friends.map((friend, index) => (
                            <li key={index} onClick={() => addPlayerFromSuggestion(friend)} className="cursor-pointer p-2 hover:bg-gray-100">
                                {friend.nom} {friend.prenom} {friend._id}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ul className="border border-5 border-gray-200 p-2 rounded-xl shadow-2xl bg-white shadow-slate-500 w-full">
                {team.map((player, index) => (
                    <li key={index} className="flex items-center justify-between border border-5 border-black-500 p-2 bg-primary-50 rounded-full shadow-md shadow-slate-400 text-white">
                        <h1 className="font-bold mx-4">{player}</h1>
                        <div className="flex flex-row">
                            {/* <button
                                onClick={() => deletePlayer(index)}
                                className="flex flex-row items-center border-2 border-red-500 bg-red-500 p-1 rounded-md shadow-md shadow-slate-400 mr-2"
                            >
                                <RiDeleteBin6Line className="w-4 h-4 text-white" />
                            </button>
                            <button
                                onClick={() => {
                                    const newName = prompt('Enter new name:', player);
                                    if (newName !== null) {
                                        updatePlayer(index, newName);
                                    }
                                }}
                                className="flex flex-row items-center border-2 border-blue-500 bg-blue-500 p-1 rounded-md shadow-md shadow-slate-400"
                            >
                                <BsPen className="w-4 h-4 text-white" />
                            </button> */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tachkila;
