import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../hooks/useAuthContext";


const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	useEffect(() => {
		// cleanup function (unmounts) (unselects)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);
	return (
		<div className='md:min-w-[940px] flex flex-col h-[600px]'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-primary-50 px-4 py-4 mb-2'>
						<span className='label-text text-white'>To:</span>{" "}
						<span className='text-white font-bold'>{selectedConversation.nom} {selectedConversation.prenom} </span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { user } =useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {user.userObj.nom} {user.userObj.prenom}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};