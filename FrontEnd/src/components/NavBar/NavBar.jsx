import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {publicRoutes, privateRoutes} from './navigation.js'
import Container from '../UI/Container.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
function NavBar() {

    const location = useLocation()
    const {isAuth, signout} = useAuth()

  return (
    <nav className='bg-zinc-950'>
        <Container className="flex justify-between py-3 text-white">
                <Link to='/'><h1>Nombre empresa</h1></Link>
                <ul className="flex gap-x-2">
                
                {isAuth ? 
                    <>{
                        privateRoutes.map(({ path, name}) => ( //Si el usuario esta autenticado, solo mostrar rutas privadas, sino mostrar las rutas publicas
                            <li key={name} className={
                                `${location.pathname === path && 'bg-indigo-500 px-3 py-1'}`
                            }>
                                <Link to={path}>{name}</Link>
                            </li>
                            ))
                    }
                    <li onClick={() => {
                            signout()
                        }}>
                            Salir
                    </li>
                    </> : publicRoutes.map(({ path, name}) => (
                        <li key={name} className={
                            `${location.pathname === path && 'bg-indigo-500 px-3 py-1'}`
                        }>
                            <Link to={path}>{name}</Link>
                        </li>
                    ))}
                </ul>
        </Container>
    </nav>
  )
}

export default NavBar
