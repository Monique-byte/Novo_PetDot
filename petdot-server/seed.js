const mongoose = require('mongoose');
const Pet = require('./models/Pet'); 
require('dotenv').config();

const popularBanco = async () => {
  try {
    // 1. Conecta ao Banco de Dados
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/petdot');
    console.log('✅ Conectado ao MongoDB.');

    // 2. Limpa o banco atual
    await Pet.deleteMany({});
    console.log('1. Banco de dados limpo.');

    // --- 3. SEUS ANIMAIS LOCAIS (COM HISTÓRIA E HOBBIES) ---
    const caesLocais = [
      { 
        nome: "Dinho", tipo: "dog", sexo: "Macho", disponivel: true, idade: "3 anos", imagem: "/dinho.png", 
        descricao: "Dinho é um companheiro fiel.",
        historia: "Dinho foi resgatado em uma estrada movimentada. Apesar do susto, ele nunca perdeu a confiança nos humanos e hoje espera um lar para correr e brincar.",
        hobbies: ["Correr no parque", "Bolinha de tênis", "Soneca à tarde"]
      },
      { 
        nome: "Floquinho", tipo: "dog", sexo: "Macho", disponivel: false, idade: "6 meses", imagem: "/DogFloquinho 2.png", 
        descricao: "Cheio de energia.",
        historia: "Floquinho nasceu em um abrigo e é o mais agitado da ninhada. Ele precisa de uma família que tenha paciência para ensinar truques novos.",
        hobbies: ["Morder chinelos", "Pular em poças", "Brincar de cabo de guerra"]
      },
      { 
        nome: "Lilica", tipo: "dog", sexo: "Fêmea", disponivel: true, idade: "2 anos", imagem: "/lilica.png", 
        descricao: "A Lilica é dócil e castrada.",
        historia: "Lilica vivia com uma idosa que infelizmente faleceu. Ela é muito educada, sabe andar na guia e adora carinho na barriga.",
        hobbies: ["Receber carinho", "Passeios lentos", "Observar a janela"]
      },
      { 
        nome: "Caramelo", tipo: "dog", sexo: "Macho", disponivel: false, idade: "4 anos", imagem: "/DogCaramelo 2.png", 
        descricao: "Inteligente e protetor.",
        historia: "O legítimo vira-lata caramelo. Foi encontrado em um posto de gasolina e cuidava de todos os funcionários. Agora ele quer cuidar de uma família.",
        hobbies: ["Vigiar a casa", "Pedir petiscos", "Acompanhar caminhadas"]
      },
      { 
        nome: "Café", tipo: "dog", sexo: "Macho", disponivel: true, idade: "1 ano", imagem: "/DogCafé 2.png", 
        descricao: "Agitado e busca aventuras.",
        historia: "Café tem esse nome por causa da sua cor e da sua energia. Ele não para um segundo e seria o parceiro ideal para quem gosta de trilhas.",
        hobbies: ["Explorar mato", "Correr atrás de gravetos", "Lamber rostos"]
      },
      { 
        nome: "Trovão", tipo: "dog", sexo: "Macho", disponivel: false, idade: "5 anos", imagem: "/DogBlack 2.png", 
        descricao: "Um gigante gentil.",
        historia: "Trovão assusta pelo tamanho, mas tem medo de chuva. Ele é extremamente calmo e se dá bem com outros cães e crianças.",
        hobbies: ["Ganhar cafuné", "Ficar deitado no sol", "Comer frutas"]
      }
    ];

    const gatosLocais = [
      { 
        nome: "Mingau", tipo: "cat", sexo: "Macho", disponivel: true, idade: "1 ano", imagem: "/Gatinho.png", 
        descricao: "Rei do sofá.",
        historia: "Mingau foi encontrado dentro de uma caixa de papelão. Ele se adaptou rápido à vida de apartamento e hoje se considera o dono da casa.",
        hobbies: ["Dormir no teclado", "Catiar sachê", "Caçar laser"]
      },
      { 
        nome: "Fumaça", tipo: "cat", sexo: "Fêmea", disponivel: false, idade: "2 anos", imagem: "/Gatinho (1).png", 
        descricao: "Independente e calma.",
        historia: "Fumaça é uma gatinha resgatada de um telhado. Ela demora um pouco para confiar, mas quando confia, é a gata mais carinhosa do mundo.",
        hobbies: ["Observar pássaros", "Escalar prateleiras", "Esconder tampinhas"]
      }
    ];

    // --- 4. GERANDO ANIMAIS DA WEB (COM DADOS GENÉRICOS) ---
    const nomesDogsWeb = ["Bento", "Amora", "Pingo", "Zeca", "Cookie", "Pipoca", "Marley", "Luna", "Thor", "Bella", "Hulk", "Maya", "Toby", "Nina"];
    const nomesCatsWeb = ["Simba", "Nala", "Oliver", "Mia", "Tom", "Jade", "Chico", "Bibi", "Soneca", "Rajado", "Tico", "Mimi", "Ziza", "Gordo", "Frajola", "Garfield"];

    const caesWeb = nomesDogsWeb.map((nome, i) => ({
      nome,
      tipo: "dog",
      sexo:  i % 2 === 0 ? "Macho" : "Fêmea", 
      disponivel: i % 2 !== 0,
      idade: `${Math.floor(Math.random() * 10) + 1} anos`,
      imagem: `https://placedog.net/500/500?id=${i + 10}`,
      descricao: `${nome} espera por um lar.`,
      historia: `${nome} é um animal resgatado que busca uma segunda chance para ser feliz ao lado de humanos amorosos.`,
      hobbies: ["Brincar", "Passear", "Ganhar petisco"]
    }));

    const gatosWeb = nomesCatsWeb.map((nome, i) => ({
      nome,
      tipo: "cat",
      sexo: i % 2 === 0 ? "Macho" : "Fêmea", 
      disponivel: i % 2 === 0,
      idade: `${Math.floor(Math.random() * 8) + 1} anos`,
      imagem: `https://cataas.com/cat?unique=${i + 20}`,
      descricao: `${nome} é muito companheiro.`,
      historia: `${nome} foi encontrado em uma colônia de gatos e agora está pronto para ter o seu próprio sofá e família.`,
      hobbies: ["Arranhar postes", "Dormir", "Brincar com fios"]
    }));

    // --- 5. MESCLANDO TUDO ---
    const todosOsPets = [...caesLocais, ...caesWeb, ...gatosLocais, ...gatosWeb];

    // 6. Inserir no Banco de Dados
    await Pet.insertMany(todosOsPets);

    console.log(`✅ SUCESSO!`);
    console.log(`📊 Total: ${todosOsPets.length} animais populados.`);
    console.log(`💡 Agora os pets possuem 'historia' e 'hobbies'.`);

    process.exit();
  } catch (err) {
    console.error('❌ Erro ao popular banco:', err);
    process.exit(1);
  }
};

popularBanco();