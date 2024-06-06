import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './memberform.css';

const MemberForm = ({ isOpen, onRequestClose, onSuccess }) => {
  const [member, setMember] = useState({
    relationship: '',
    firstName: '',
    middleName: '',
    lastName: '',
    status: '',
    birthDate: '',
    birthPlace: '',
    currentPlace: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
    validateForm();
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
    validateForm();
  };

  const validateForm = () => {
    const isValid = profilePic && member.relationship && member.firstName &&
      member.lastName && member.status && member.birthDate && member.birthPlace &&
      member.currentPlace;
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePic', profilePic);
    Object.keys(member).forEach(key => formData.append(key, member[key]));

    try {
      const response = await axios.post('http://localhost:5000/api/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        alert('You have successfully added a member');
        onSuccess();
        onRequestClose();
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Member">
      <h2>Add Member</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Picture:
          <input type="file" name="profilePic" onChange={handleFileChange} />
        </label>
        <label>
          Relationship:
          <select name="relationship" value={member.relationship} onChange={handleChange}>
            <option value="">Select Relationship</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
          </select>
        </label>
        <label>
          First Name:
          <input type="text" name="firstName" placeholder="First Name" value={member.firstName} onChange={handleChange} />
        </label>
        <label>
          Middle Name:
          <input type="text" name="middleName" placeholder="Middle Name" value={member.middleName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" placeholder="Last Name" value={member.lastName} onChange={handleChange} />
        </label>
        <div>
          <label>
            <input type="radio" name="status" value="Living" onChange={handleChange} checked={member.status === 'Living'} /> Living
          </label>
          <label>
            <input type="radio" name="status" value="Deceased" onChange={handleChange} checked={member.status === 'Deceased'} /> Deceased
          </label>
        </div>
        <label>
          Birth Date:
          <input type="date" name="birthDate" value={member.birthDate} onChange={handleChange} />
        </label>
        <label>
          Birth Place:
          <input type="text" name="birthPlace" placeholder="Birth Place" value={member.birthPlace} onChange={handleChange} />
        </label>
        <label>
          Current Place:
          <input type="text" name="currentPlace" placeholder="Current Place" value={member.currentPlace} onChange={handleChange} />
        </label>
        <button type="submit" disabled={!isFormValid}>Add Member</button>
      </form>
    </Modal>
  );
};

export default MemberForm;
