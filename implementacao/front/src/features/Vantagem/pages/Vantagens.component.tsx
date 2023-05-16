import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { VantagemForm } from '../components/VantagemForm';
import { VantagemService } from '../services';
import { IVantagem } from '../services/interfaces';
import { VantagemCard } from '../components';

const modalId: string = 'vantagemForm';

export const Vantagens = () => {
  const [selectedVantagem, setSelectedVantagem] = React.useState<IVantagem | null>(null);
  const id = localStorage.getItem('id');

  const getListaVantagens = async (): Promise<IVantagem[]> => {
    try {
      return await VantagemService.getAllVantagens();
    } catch (error) {
      return [];
    }
  };

  const { data, refetch } = useQuery<IVantagem[]>({
    queryKey: ['vantagens'],
    queryFn: getListaVantagens,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className='flex flex-col grow h-full'>
        <div className='flex mx-12 mt-12 justify-end'>
          <label htmlFor={modalId} className='btn btn-primary shadow'>
            Criar
          </label>
        </div>
        <div className={`flex flex-col ${data?.length === 0 && 'justify-center'} mx-12 my-6 h-full`}>
          {(data?.length === 0 || data === undefined) && (
            <div className='flex justify-center items-center p-2'>
              <p className='text-gray-500'>Nenhuma vantagem encontrada</p>
            </div>
          )}
          {data?.length !== 0 && (
            <div className='grid grid-cols-3 gap-4'>
              {data?.map((vantagem) => (
                <VantagemCard key={vantagem._id} title={vantagem.nome} description={vantagem.descricao} image={vantagem.foto} value={vantagem.valor} />
              ))}
            </div>
          )}
        </div>
      </div>
      <VantagemForm modalId={modalId} refetchVantagens={refetch} onClose={() => console.log('fechou')} id={selectedVantagem?._id || null} />
    </>
  );
};
