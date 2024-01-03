import { sql } from '@vercel/postgres';
import { Libros } from '../lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import OrderButtons from '../orderButons';
export const fetchCache = 'force-no-store';


export default async function Libro({ searchParams }: { searchParams: { titulo: string; categoria?:string; ordenarPorDecla:string } }) {
  
    async function fetchData() {
        let data;
        let list = []
        try {
          let query = 'SELECT * FROM libros';
          if(searchParams.titulo){
            list.push(searchParams.titulo)
            query += ` WHERE titulo ILIKE '%' || $${list.length} || '%' AND`
          };
          if(searchParams.categoria){
            list.push(searchParams.categoria)
            query += ` ${searchParams.titulo ? '' : 'WHERE'} categoria ILIKE '%' || $${list.length} || '%'`
          }
          if(searchParams.ordenarPorDecla){
            query += ` ORDER BY DECLARACION(Price AS DECIMAL) ${searchParams.ordenarPorDecla === 'max' ? 'DESC' : 'ASC'}`
          }
          query = query.replace(/ AND$/, "")
          data = await sql.query(query, list)
            return data.rows
          } catch (error) {
            console.error('Error fetching libros:', error);
          }
        }

const data = await fetchData();

  return (
    <main className="flex flex-wrap flex-col content-center items-start mx-5">
      <div className='w-full inline-flex justify-between'>
        {searchParams.categoria ? 
        <div className='gap-2 flex flex-row items-center'><h2>Categoria: {searchParams.categoria}</h2>
        
        <Link href='/libro'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="red" className="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        </Link>
        </div>
        : <div></div>}
        <OrderButtons/>
        </div> 
      <div className="flex flex-wrap justify-center my-8">
            {data?.length ? data.map((libro) => (
                <Link 
                key={libro.id}
                href={`/libro/${libro.id}`}>
                <div className="flex flex-col h-72 w-72 cursor-pointer items-center border-solid border-x border-y border-gray-300 rounded m-2 hover:border-blue-600 bg-white justify-center">
                    <Image className="hover:w-52 mt-5"
                        src={libro.image}
                        width={200}
                        height={200}
                        alt={libro.titulo}
                    />
                    <div className="flex bg-white text-center justify-center mb-4 border-solid border-2 border-gray rounded-2xl w-3/4 mx-5 my-2 p-2 text-xs font-bold items-center">
                        <p className='text-black'>{libro.titulo}</p>
                        <p className="bg-blue-600 mx-2 p-1 rounded-2xl text-white">${libro.price} USD</p>
                    </div>
                </div>
                </Link>
            ))
        : <Link href='/libros'><h1>libro not found!</h1>
            </Link>}
        </div>
    </main>
  );
}