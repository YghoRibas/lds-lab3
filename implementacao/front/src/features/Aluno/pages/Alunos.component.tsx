import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AlunoService } from '../services';
import { IAluno } from '../services/interfaces';
import { AlunoForm } from '../components';

const modalId: string = 'alunoForm';

export const Alunos = () => {
  const [selectedAluno, setSelectedAluno] = useState<string | null>(null);

  const getListaAlunos = async () => {
    try {
      return await AlunoService.getAllAlunos();
    } catch (error) {
      return [];
    }
  };

  const { data, refetch } = useQuery<IAluno[]>({
    queryKey: ['alunos'],
    queryFn: getListaAlunos,
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
              <th>Moedas</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map(
                (aluno: IAluno) => (
                  <label htmlFor={modalId}>
                    <tr key={aluno.id} onClick={() => setSelectedAluno(aluno.id!)}>
                      <td>{aluno.nome}</td>
                      <td>{aluno.email}</td>
                      <td>{aluno.moedas}</td>
                    </tr>
                  </label>
                ),
                []
              )}
          </tbody>
        </table>
        {(data?.length === 0 || data === undefined) && (
          <div className='flex justify-center items-center p-2'>
            <p className='text-gray-500'>Nenhum aluno cadastrado</p>
          </div>
        )}
      </div>
      <AlunoForm id={selectedAluno} modalId={modalId} refetchAlunos={refetch} onClose={() => setSelectedAluno(null)} />
    </>
  );
};
