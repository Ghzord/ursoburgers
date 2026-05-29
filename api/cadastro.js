import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method === 'POST') {
    const { nome, telefone, email, endereco, senha } = request.body;

    // Validação básica se todos os dados chegaram
    if (!nome || !telefone || !email || !endereco || !senha) {
      return response.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    try {
      // Salva os dados na tabela do ursoburgers
      await sql`
        INSERT INTO usuarios (nome, telefone, email, endereco, senha)
        VALUES (${nome}, ${telefone}, ${email}, ${endereco}, ${senha});
      `;
      
      return response.status(201).json({ message: 'Conta criada com sucesso!' });
    } catch (error) {
      console.error(error);
      // Caso o e-mail já esteja cadastrado
      if (error.code === '23505') {
        return response.status(400).json({ error: 'Este e-mail já está cadastrado.' });
      }
      return response.status(500).json({ error: 'Erro ao salvar no banco de dados.' });
    }
  }

  return response.status(405).json({ error: 'Método não permitido.' });
}