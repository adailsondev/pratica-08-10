import mysql from 'mysql2';

// Criar pool de conexões (recomendado)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // seu usuário
    password: 'sua_senha', // sua senha
    database: 'nome_do_banco', // nome do seu banco
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Converter para promises (async/await)
const promisePool = pool.promise();

// Testar conexão
pool.getConnection((err, connection) => {
    if (err) {
        console.log('❌ Erro ao conectar no MySQL:', err);
    } else {
        console.log('✅ Conectado ao MySQL!');
        connection.release();
    }
});

export default promisePool;