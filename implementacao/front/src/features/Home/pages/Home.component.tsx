import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { HomeService } from '../services';
import { ISaldo } from '../services/interfaces';
import { TransacaoForm } from '../components';

const modalId: string = 'transacaoForm';

export const Home = () => {
  const navigate = useNavigate();

  const id = localStorage.getItem('id');
  const tipo = localStorage.getItem('tipo');

  const getListaEmpresas = async (): Promise<ISaldo> => {
    try {
      return await HomeService.getSaldo();
    } catch (error) {
      return { moedas: 0, transacoes: [] };
    }
  };

  const { data, refetch } = useQuery<ISaldo>({
    queryKey: ['saldo'],
    queryFn: getListaEmpresas,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className='navbar bg-base-200'>
        <div className='flex-1'>
          <a className='btn btn-ghost normal-case text-xl'>Sistema de Mérito Escolar</a>
        </div>
        <div className='flex-none'>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </label>
            <ul tabIndex={0} className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
              <li>
                <a
                  onClick={() => {
                    localStorage.removeItem('id');
                    localStorage.removeItem('tipo');

                    navigate('/login');
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex mx-12 mt-12 mb-6 justify-between'>
        <div className='flex text-lg  items-center gap-1'>
          Saldo: {data?.moedas}{' '}
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
        </div>
        {tipo === 'professor' && (
          <label htmlFor={modalId} className='btn btn-primary'>
            Nova Transação
          </label>
        )}
      </div>
      <div className='overflow-x-auto mx-12 mt-6'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Remetente</th>
              <th>Destinatário</th>
              <th>Valor</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.transacoes.length > 0 &&
              data.transacoes.map(
                (transacao) => (
                  <tr key={transacao._id}>
                    <td>{transacao.remetenteId !== id ? 'Recebimento' : 'Envio'}</td>
                    <td>{transacao.remetenteNome}</td>
                    <td>{transacao.destinatarioNome}</td>
                    <td>{transacao.valor}</td>
                    <td className='text-ellipsis'>{transacao.descricao}</td>
                  </tr>
                ),
                []
              )}
          </tbody>
        </table>
        {(data?.transacoes.length === 0 || data === undefined) && (
          <div className='flex justify-center items-center p-2'>
            <p className='text-gray-500'>Nenhuma transação encontrada</p>
          </div>
        )}
      </div>
      <TransacaoForm modalId={modalId} refetchTransacoes={refetch} />
    </>
  );
};
