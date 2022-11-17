import { GetStaticPaths, GetStaticProps } from 'next';
import QRCode from "react-qr-code";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  WhatsappShareButton,
} from "react-share";

import {
  WhatsappIcon,

} from "react-share";
interface IPoolProps {
  code: string
}

export default function Pool({ code }: IPoolProps) {

  const notify = async () => {

    await navigator.clipboard.writeText(code);
    toast("Código copiado com sucesso!");

  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto flex justify-center items-center'>
      <main>

        <div>

        </div>
        <p className='text-white text-center text-2xl mb-5'>Bolão criado com sucesso!</p>
        <p
          className='text-center text-green-500  text-5xl font-bold leading-tight cursor-pointer'
          onClick={notify}
        >
          {code}
        </p>
        <p className='text center text-white mt-5'>Copie o código acima ou abra seu aplicativo e leia o QRCode abaixo</p>
        <div className='h-auto bg-white p-4 ml-auto mr-auto mt-10 max-w-[150px] w-full'>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={code}
            viewBox={`0 0 256 256`}
          />
        </div>

        <div className='flex justify-center gap-3 mt-12'>
          <div>
            <WhatsappShareButton
              url={`https://localhost:3000/pool/${code}`}
              title={'Venha participar do meu bolão da copa'}
              separator=":: "
            >
              <WhatsappIcon size={48} round />
            </WhatsappShareButton>
          </div>

        </div>

        
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )

}

export const getStaticPaths: GetStaticPaths = async () => {

  const paths: string[] = []
  return {
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { pool } = ctx.params as { pool: string };

  return {
    props: {
      code: pool
    },
    revalidate: 60 * 60 * 24, // 24Hours
  }
};

