// Lista de catálogos com nomes EXATOS dos arquivos do usuário
const catalogosPotenciais = [
    {
        id: 'adaptacoes',
        title: 'Adaptações Molas e Feixes',
        description: 'Soluções em adaptações para molas e feixes automotivos',
        image: 'images/ADAPTAÇOESMOLASEFEIXES.png',
        pdf: 'ADAPTAÇOESMOLASEFEIXES.pdf'
    },
    {
        id: 'freios',
        title: 'Catálogo Linha Freios',
        description: 'Linha completa de componentes para sistemas de freios',
        image: 'images/CATALAGOLINHAFREIOS.png',
        pdf: 'CATALAGOLINHAFREIOS.pdf'
    },
    {
        id: 'carretinha',
        title: 'Catálogo Carretinha',
        description: 'Peças e componentes para carretinhas e reboques',
        image: 'images/CATALOGOCARRETINHA.png',
        pdf: 'CATALOGOCARRETINHA.pdf'
    },
    {
        id: 'tracado',
        title: 'Catálogo Traçado',
        description: 'Linha de caminhões traçado - componentes especializados para tração',
        image: 'images/CATALOGOTRAÇADO.png',
        pdf: 'CATALOGOTRAÇADO.pdf'
    },
    {
        id: 'conexoes',
        title: 'Conexões',
        description: 'Conexões e acoplamentos para sistemas automotivos',
        image: 'images/CONEXOES.png',
        pdf: 'CONEXOES.pdf'
    },
    {
        id: 'cruzeta',
        title: 'Cruzeta Cardan',
        description: 'Cruzetas e componentes para transmissão cardan',
        image: 'images/CRUZETACARDAN.png',
        pdf: 'CRUZETACARDAN.pdf'
    },
    {
        id: 'engate',
        title: 'Engate Automático',
        description: 'Sistemas de engate automático para veículos pesados',
        image: 'images/ENGATEAUTOMATICO.png',
        pdf: 'ENGATEAUTOMATICO.pdf'
    },
    {
        id: 'acessorios',
        title: 'Linha Acessórios',
        description: 'Acessórios diversos para veículos automotores',
        image: 'images/LINHAACESSORIOS.png',
        pdf: 'LINHAACESSORIOS.pdf'
    },
    {
        id: 'automotiva',
        title: 'Linha Automotiva',
        description: 'Linha geral de peças para veículos automotivos',
        image: 'images/LINHAAUTOMOTIVA.png',
        pdf: 'LINHAAUTOMOTIVA.pdf'
    },
    {
        id: 'caminhonetes',
        title: 'Linha Caminhonetes',
        description: 'Peças específicas para caminhonetes e pick-ups',
        image: 'images/LINHACAMINHONETES.png',
        pdf: 'LINHACAMINHONETES.pdf'
    },
    {
        id: 'fixacao',
        title: 'Linha Fixação',
        description: 'Componentes de fixação e parafusaria automotiva',
        image: 'images/LINHAFIXAÇAO.png',
        pdf: 'LINHAFIXAÇAO.pdf'
    },
    {
        id: 'macacos',
        title: 'Linha Macacos',
        description: 'Macacos hidráulicos e pneumáticos para veículos',
        image: 'images/LINHAMACACOS.png',
        pdf: 'LINHAMACACOS.pdf'
    },
    {
        id: 'onibus',
        title: 'Linha Ônibus',
        description: 'Linha completa para ônibus, micro-ônibus e vans',
        image: 'images/LINHAONIBUS.png',
        pdf: 'LINHAONIBUS.pdf'
    },
    {
        id: 'suspensao-caminhoes',
        title: 'Linha Suspensão Caminhões',
        description: 'Sistema de suspensão para caminhões pesados',
        image: 'images/LINHASUSPENSAOCAMINHOES.png',
        pdf: 'LINHASUSPENSAOCAMINHOES.pdf'
    },
    {
        id: 'quinta-roda',
        title: 'Quinta Roda',
        description: 'Quinta roda e componentes para cavalos mecânicos',
        image: 'images/QUINTARODA.png',
        pdf: 'QUINTARODA.pdf'
    },
    {
        id: 'suspensao-carretas',
        title: 'Suspensão Carretas e Trucks',
        description: 'Sistemas de suspensão para carretas e trucks',
        image: 'images/SUSPENSAOCARRETASETRUCKS.png',
        pdf: 'SUSPENSAOCARRETASETRUCKS.pdf'
    }
];

// Função para verificar se um arquivo existe
async function verificarArquivoExiste(caminho) {
    try {
        const response = await fetch(caminho, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Função para detectar catálogos automaticamente
async function detectarCatalogos() {
    console.log('🔍 Procurando por catálogos...');
    const catalogosValidos = [];
    
    // Verificar catálogos da lista predefinida
    for (const catalogo of catalogosPotenciais) {
        const pdfExiste = await verificarArquivoExiste(catalogo.pdf);
        const imagemExiste = await verificarArquivoExiste(catalogo.image);
        
        if (pdfExiste && imagemExiste) {
            console.log(`✅ ${catalogo.title} - Arquivos encontrados`);
            catalogosValidos.push(catalogo);
        } else {
            console.log(`❌ ${catalogo.title} - Arquivos ausentes`);
        }
    }
    
    console.log(`✅ Total de catálogos válidos: ${catalogosValidos.length}`);
    return catalogosValidos;
}

// Função para gerar título automaticamente
function gerarTitulo(nomeArquivo) {
    return nomeArquivo
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()
        .replace(/\s+/g, ' ');
}

// Função para gerar descrição automaticamente
function gerarDescricao(nomeArquivo) {
    const descricoes = {
        'ADAPTAÇOESMOLASEFEIXES': 'Soluções em adaptações para molas e feixes automotivos',
        'CATALAGOLINHAFREIOS': 'Linha completa de componentes para sistemas de freios',
        'CATALOGOCARRETINHA': 'Peças e componentes para carretinhas e reboques',
        'CATALOGOTRAÇADO': 'Linha de caminhões traçado - componentes especializados para tração',
        'CONEXOES': 'Conexões e acoplamentos para sistemas automotivos',
        'CRUZETACARDAN': 'Cruzetas e componentes para transmissão cardan',
        'ENGATEAUTOMATICO': 'Sistemas de engate automático para veículos pesados',
        'LINHAACESSORIOS': 'Acessórios diversos para veículos automotores',
        'LINHAAUTOMOTIVA': 'Linha geral de peças para veículos automotivos',
        'LINHACAMINHONETES': 'Peças específicas para caminhonetes e pick-ups',
        'LINHAFIXAÇAO': 'Componentes de fixação e parafusaria automotiva',
        'LINHAMACACOS': 'Macacos hidráulicos e pneumáticos para veículos',
        'LINHAONIBUS': 'Linha completa para ônibus, micro-ônibus e vans',
        'LINHASUSPENSAOCAMINHOES': 'Sistema de suspensão para caminhões pesados',
        'QUINTARODA': 'Quinta roda e componentes para cavalos mecânicos',
        'SUSPENSAOCARRETASETRUCKS': 'Sistemas de suspensão para carretas e trucks'
    };
    
    return descricoes[nomeArquivo] || 'Linha de produtos automotivos especializados';
}

// Função para criar cards dos catálogos
function criarCardCatalogo(catalogo) {
    return `
        <div class="portfolio-card">
            <img src="${catalogo.image}" alt="${catalogo.title}" class="card-image" loading="lazy">
            <div class="card-content">
                <h3 class="card-title">${catalogo.title}</h3>
                <p class="card-description">${catalogo.description}</p>
                <a href="${catalogo.pdf}" class="download-button" download>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    Baixar PDF
                </a>
            </div>
        </div>
    `;
}

// Função principal para carregar catálogos
async function carregarCatalogos() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (!portfolioGrid) {
        console.error('❌ Elemento portfolioGrid não encontrado');
        return;
    }
    
    // Mostrar loading
    portfolioGrid.innerHTML = '<div class="loading">🔍 Carregando catálogos...</div>';
    
    try {
        const catalogos = await detectarCatalogos();
        
        if (catalogos.length === 0) {
            portfolioGrid.innerHTML = '<div class="no-catalogs">📁 Nenhum catálogo encontrado. Verifique se os arquivos PDF e PNG estão nas pastas corretas.</div>';
            return;
        }
        
        // Gerar HTML dos catálogos
        const catalogosHTML = catalogos.map(criarCardCatalogo).join('');
        portfolioGrid.innerHTML = catalogosHTML;
        
        console.log(`🎉 ${catalogos.length} catálogos carregados com sucesso!`);
        
    } catch (error) {
        console.error('❌ Erro ao carregar catálogos:', error);
        portfolioGrid.innerHTML = '<div class="error">❌ Erro ao carregar catálogos. Verifique o console para mais detalhes.</div>';
    }
}

// Função para recarregar catálogos (útil para debug)
window.recarregarCatalogos = carregarCatalogos;

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', carregarCatalogos);

console.log('📋 Script totalmente automático carregado - versão corrigida');

