import React from 'react'
import { NavLink , useNavigate , useLocation } from 'react-router-dom'

export const TopNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        localStorage.clear();
        navigate('/admin/login', {replace: true});
    }

    const change = () => {
        navigate('/admin/changeuser', {replace: true})
    }
    return (
        <>
            <header className='row bg-header rounded-bottom'>
                <div className='d-flex justify-content-between'>
                    <ul className='top-menu'>
                        <li className='top-menu p-4 ps-2'><NavLink className={({isActive}) => isActive ? 'text-white freeStyle' : 'text-secondary freeStyle'} to={'/admin/*'}>داشبورد</NavLink></li>
                        <li className='top-menu p-4 ps-2'><NavLink className={({isActive}) => isActive ? 'text-white freeStyle' : 'text-secondary freeStyle'} to={'/admin/tracks'}>ترک ها</NavLink></li>
                        <li className='top-menu p-4 ps-2'><NavLink className={({isActive}) => isActive ? 'text-white freeStyle' : 'text-secondary freeStyle'} to={'/admin/musicvideos'}>موزیک ویدیو ها</NavLink></li>
                        <li className='top-menu p-4 ps-2'><NavLink className={({isActive}) => isActive ? 'text-white freeStyle' : 'text-secondary freeStyle'} to={'/admin/coworkers'}>همکاران</NavLink></li>
                    </ul>
                    <div className='p-2'>
                        <button className='btn btn-sm btn-outline-info ms-2' onClick={change}>تغییر نام کاربری و رمز عبور</button>
                        <button className='btn btn-sm btn-outline-info' onClick={logout}>خروج</button>
                    </div>
                </div>
                    <div className='ltr pb-2 ps-4'><span className='text-white'>{location.pathname}</span></div>
            </header>
        </>
    )
}
