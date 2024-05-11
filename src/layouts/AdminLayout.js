import React, {useEffect} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { TopNavbar } from './TopNavbar'
import { SideNavbar } from './SideNavbar'
import { Dashboard } from '../components/dashboard/Dashboard'
import { Tracks } from '../components/tracks/Tracks'
import { MusicVideos } from '../components/musicvideos/MusicVideos'
import axios from 'axios'
import { ChangeUser } from '../components/login/ChangeUser'
import { CoWorkers } from '../components/coworkers/CoWorkers'

export const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const authenticate = React.useCallback(async () => {
        const baseApiUrl = process.env.REACT_APP_API_URL;
        const APIurl = `${baseApiUrl}/api/auth`;
        await axios.post(APIurl, {}, {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem('token'),
            },
          })
        .catch(err => {
            navigate('/admin/login', { replace: true });
        })
    },[navigate]);
    useEffect(() => {
      
        authenticate();
      
    }, [location, authenticate, navigate])
    
    return (
        <>
            <div className='container-fluid row'>
                <section className='col-md-2'><SideNavbar /></section>
                <section className='col-md-10'>
                    <TopNavbar />
                </section>
            </div>

            <Routes>
                <Route path='/*' element={<Dashboard />} />
                <Route path='/tracks/*' element={<Tracks />} />
                <Route path='/musicvideos/*' element={<MusicVideos />} />
                <Route path='/coworkers/*' element={<CoWorkers />} />
                <Route path='/changeuser/*' element={<ChangeUser />} />
            </Routes>
        </>
    )
}
