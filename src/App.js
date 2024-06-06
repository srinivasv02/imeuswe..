import React, { useState } from 'react';
import Header from './components/header';
import MemberForm from './components/memberform';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = () => {
    setIsModalOpen(true);
  };

  const handleRequestClose = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    toast.success("You have successfully added member");
  };

  return (
    <div>
      <Header onMemberClick={handleMemberClick} />
      <MemberForm isOpen={isModalOpen} onRequestClose={handleRequestClose} onSuccess={handleSuccess} />
      <ToastContainer />
    </div>
  );
};

export default App;
