import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const SideNavbar = () => {
  return (
    <>
    <div className='side-navbar border border-dark'>
      <div className='bg-header text-white ltr p-3'>ADMIN PANEL <FontAwesomeIcon icon={faUser} /></div>
      <hr/>
      <ul>
      <li className='side-menu pb-2 ps-2'><NavLink className={({isActive}) => isActive ? 'text-dark freeStyle' : 'text-secondary freeStyle'} to={'/admin/*'}>داشبورد</NavLink></li>
      <li className='side-menu pb-2 ps-2'><NavLink className={({isActive}) => isActive ? 'text-dark freeStyle' : 'text-secondary freeStyle'} to={'/admin/tracks'}>ترک ها</NavLink></li>
      <li className='side-menu pb-2 ps-2'><NavLink className={({isActive}) => isActive ? 'text-dark freeStyle' : 'text-secondary freeStyle'} to={'/admin/musicvideos'}>موزیک ویدیو ها</NavLink></li>
      <li className='side-menu pb-2 ps-2'><NavLink className={({isActive}) => isActive ? 'text-dark freeStyle' : 'text-secondary freeStyle'} to={'/admin/coworkers'}>همکاران</NavLink></li>
      </ul>
    </div>
    </>
  )
}
