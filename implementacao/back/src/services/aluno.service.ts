import { IAluno } from '../models/aluno';
import { AlunoRepository, EmpresaRepository, TransacaoRepository, VantagemRepository } from '../repositories';
import { CustomError } from '../utils/errorHandler';
import { MailType, sendEmail } from '../utils/mailer';

export class AlunoService {
  private alunoRepository: AlunoRepository;
  private transacaoRepository: TransacaoRepository;
  private vantagemRepository: VantagemRepository;
  private empresaRepository: EmpresaRepository;

  constructor() {
    this.alunoRepository = new AlunoRepository();
    this.transacaoRepository = new TransacaoRepository();
    this.vantagemRepository = new VantagemRepository();
    this.empresaRepository = new EmpresaRepository();
  }

  public async getAllAlunos(): Promise<IAluno[]> {
    return await this.alunoRepository.getAllAlunos();
  }

  public async getAlunoById(id: string): Promise<IAluno | null> {
    const aluno = await this.alunoRepository.getAlunoById(id);

    if (aluno) {
      return aluno;
    } else {
      throw new CustomError('Aluno não encontrado', 404);
    }
  }

  public async createAluno(data: IAluno): Promise<IAluno> {
    return await this.alunoRepository.createAluno(data);
  }

  public async updateAluno(id: string, data: IAluno): Promise<IAluno | null> {
    return await this.alunoRepository.updateAluno(id, data);
  }

  public async deleteAluno(id: string): Promise<void> {
    return await this.alunoRepository.deleteAluno(id);
  }

  public async resgatarVantagem(id: string, idAluno: string): Promise<void> {
    const aluno = await this.alunoRepository.getAlunoById(idAluno);

    const vantagem = await this.vantagemRepository.getVanatagemById(id);

    if (vantagem) {
      if (aluno) {
        if (aluno.moedas - vantagem.valor >= 0) {
          aluno.moedas -= vantagem.valor;
          await this.alunoRepository.updateAluno(idAluno, aluno);

          await this.transacaoRepository.createTransacao({
            remetenteId: idAluno,
            destinatarioId: vantagem.idEmpresa,
            valor: vantagem.valor,
            vantagemId: vantagem._id,
            data: new Date(),
            descricao: `Resgate de vantagem: ${vantagem.nome}`,
          });

          const empresa = await this.empresaRepository.getEmpresaById(vantagem.idEmpresa);

          await sendEmail(aluno.email, {
            subject: 'Vantagem Resgatada',
            type: MailType.TEXT,
            body: `Voce resgatou a vantagem ${vantagem.nome} por ${vantagem.valor} moedas. Codógo para resgate: ${vantagem._id}`,
          });

          if (empresa) {
            await sendEmail(empresa.email, {
              subject: 'Vantagem Resgatada',
              type: MailType.TEXT,
              body: `A vantagem ${vantagem.nome} foi resgatada por ${aluno.nome} com sucesso.`,
            });
          }
        } else {
          throw new CustomError('Moedas insuficientes', 400);
        }
      } else {
        throw new CustomError('Aluno não encontrado', 404);
      }
    } else {
      throw new CustomError('Vantagem não encontrada', 404);
    }
  }
}
