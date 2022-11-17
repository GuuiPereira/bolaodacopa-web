
import Image from 'next/image';
import appPreviewImage from '../assets/web-app-preview.png';
import logoImage from '../assets/logo.svg';
import avatarImage from '../assets/avatares.png';
import iconCheck from '../assets/icon.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { Avatares } from '../components/Avatares';

interface UserAvatarSrc {
  avatarUrl: string
}
interface HomeProps {
  poolCount: number,
  guessCount: number,
  userCount: number,
  lastFourImageRegistered: UserAvatarSrc[]
}

export default function Home(props: HomeProps) {

  const [poolName, setPoolName] = useState('');
  const router = useRouter();

  async function createPool(ev: FormEvent) {

    ev.preventDefault();

    try {

      const response = await api.post('/pools', {
        title: poolName
      });

      const { code } = response.data;
      setPoolName('');
      router.push(`/pool/${code}`);

    } catch (err) {

      console.log(err);

      alert('Falha ao criar o bolão, tente novamente')

    }

  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>

      <main>
        <Image src={logoImage} alt="Logo" />
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex flex-wrap items-center gap-2 '>
          <Avatares list={props.lastFourImageRegistered }></Avatares>
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-gray-100 text-sm'
            type="text"
            required
            placeholder='Qual nome do seu bolão?'
            onChange={event => setPoolName(event.target.value)}
            value={poolName}
          />
          <button
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type='submit'>Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>

          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'></div>

          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImage}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do app bolão da copa"
        quality={100}
      />

    </div>
  )
}

export const getServerSideProps = async () => {

  const [poolCountResponse, guessCountResponse, userCountResponse, userLastFourImageRegistered] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
    api.get('users/lastFourImageRegistered'),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
      lastFourImageRegistered: userLastFourImageRegistered.data.srcs
    }
  }
}
