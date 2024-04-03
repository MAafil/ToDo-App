import React from 'react';
import { FaTasks } from 'react-icons/fa';
import MainMenu from '../MainMenu/MainMenu';
import './Header.scss';

function Header() {
  return (
    <>
      <header>
        <div className='title'><FaTasks /> To-Do List</div>
        <div className='author'>By Mahammad Aafil</div>
      </header>
      <MainMenu />
    </>
  );
}

export default Header;