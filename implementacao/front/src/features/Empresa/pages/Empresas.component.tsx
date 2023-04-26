import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { EmpresaService } from '../services';
import { IEmpresa } from '../services/interfaces';
import { EmpresaForm } from '../components';

const modalId: string = 'aluguelForm';

export const Empresas = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState<string | null>(null);

  const getListaEmpresas = async () => {
    try {
      return await EmpresaService.getAllEmpresas();
    } catch (error) {
      return [];
    }
  };

  const { data, refetch } = useQuery<IEmpresa[]>({
    queryKey: ['empresas'],
    queryFn: getListaEmpresas,
  });

  return (
    <>
      <div className='flex justify-end items-center p-2'>
        <label htmlFor={modalId} className='btn'>
          Criar
        </label>
      </div>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map(
                (empresa: IEmpresa) => (
                  <label htmlFor={modalId}>
                    <tr key={empresa.id} onClick={() => setSelectedEmpresa(empresa.id!)}>
                      <td>{empresa.nome}</td>
                      <td>{empresa.email}</td>
                    </tr>
                  </label>
                ),
                []
              )}
          </tbody>
        </table>
        {(data?.length === 0 || data === undefined) && (
          <div className='flex justify-center items-center p-2'>
            <p className='text-gray-500'>Nenhuma empresa cadastrada</p>
          </div>
        )}
      </div>
      <EmpresaForm id={selectedEmpresa} modalId={modalId} refetchEmpresas={refetch} onClose={() => setSelectedEmpresa(null)} />
    </>
  );
};
