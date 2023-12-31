
"use client"
import Link from 'next/link';
import logo from '../../../public/moran.png
import Image from 'next/image';
import styled from "styled-components";

const Componente = styled.div`
opacity: 1;
display: flex;
justify-content: center;
align-items: center;
font-size: 400px
`



const Navbar = () => {
  return (<>
<div className='bg-[#1e0e34]'>

      <Image
      src={logo}
      width={500}
      style={{position:"fixed", left:"2%", top: "2%" }}
      alt="logotipo"/>
      <ul className="flex">
        <li className="fixed"
        >
          <Link href="/"className="ring-8" style= {{position:"fixed", left:"60%", top: "2%" }}> Inicio </Link>
        </li>
        <li>
        <Link href="/"className="text-red"
        style={{position:"fixed", left:"70%", top: "2%" }}> Libros </Link>
  
        </li>
       </ul>
         <Link href="/login" style={{position:"fixed", left:"90%", top: "2%" }} className="text-red"> Login
          </Link>
         </div>

    </>  );
};

export default Navbar;
