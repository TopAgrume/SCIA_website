import Link from 'next/link';

function Presentation() {
  return (
    <div
      style={{ gridArea: '1 / 1 / 4 / 5' }}
      className='bg-secondary border border-black block p-6'
    >
      <h1 className='tracking-tighter text-navbar font-extrabold mb-6'>
        Bienvenue sur le site de la majeure SCIA d’EPITA !
      </h1>
      <p className='tracking-tighter mb-6'>
        Ce site est le site officiel de la majeure SCIA d’EPITA, sur lequel vous
        pourrez retrouver pleins d’informations et de projets super intéressants
        ! N’hésitez pas à faire des suggestions d’article scientifique, vidéo,
        ou de quelconque ressource en rapport avec l’IA ou la Data dans la
        partie Suggestions !
      </p>
      <p className='mb-6'>
        Pour tout problème, proposition d’amélioration, demande ou réclamation,
        veuillez vous adresser directement à Mr Devaux-Rivière.
      </p>
      <p className='mb-5'>This website is all you need.</p>
    </div>
  );
}

function Links() {
  return (
    <div
      style={{ gridArea: '4 / 1 / 6 / 5' }}
      className='bg-secondary border border-black block p-6'
    >
      <h2 className='tracking-tighter text-xl font-extrabold mb-4'>
        Liens utiles
      </h2>
      <ul>
        <li>
          <div className='flex'>
            <p className='pr-2'>Serveur discord SCIA 2025 : </p>
            <Link
              href='https://discord.gg/B4hdx4HV'
              target='_blanké'
              className='text-red-400 font-bold'
            >
              clique ici
            </Link>
          </div>
        </li>

        <li>
          <div className='flex'>
            <p className='pr-2'>Wolfram alpha : </p>
            <Link
              href='https://www.wolframalpha.com/'
              target='_blanké'
              className='text-red-400 font-bold'
            >
              clique ici
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

function AiNews() {
  return (
    <div
      style={{ gridArea: '6 / 1 / 11 / 10' }}
      className='bg-secondary border border-black p-5'
    >
      <h1 className='tracking-tighter text-3xl font-extrabold mb-2 text-center'>
        Actualités IA
      </h1>
      <div className='flex justify-center'>
        <Link
          href='https://buttondown.com/ainews'
          className='text-red-400 text-center'
          target='_blank'
        >
          Faites par AI NEWS
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className='grid grid-cols-9 grid-rows-10 gap-6 p-5 bg-gray-200'>
      <Presentation />
      <div
        style={{ gridArea: '1 / 5 / 6 / 10' }}
        className='bg-secondary border border-black'
      ></div>
      <Links />
      <AiNews />
    </div>
  );
}
