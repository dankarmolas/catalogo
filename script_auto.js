// Função para detectar automaticamente PDFs e criar catálogos
async function detectCatalogos() {
    try {
        // Fazer requisição para listar arquivos da pasta
        const response = await fetch('./');
        const html = await response.text();
        
        // Extrair nomes de arquivos PDF do HTML retornado
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a[href$=".pdf"]');
        
        const catalogos = [];
        
        for (const link of links) {
            const pdfName = link.getAttribute('href');
            const baseName = pdfName.replace('.pdf', '');
            const imageName = `images/${baseName}.png`;
            
            // Verificar se a imagem existe
            const imageExists = await checkImageExists(imageName);
            
            if (imageExists) {
                const catalogo = {
                    id: baseName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    title: formatTitle(baseName),
                    description: generateDescription(baseName),
                    image: imageName,
                    pdf: pdfName
                };
                catalogos.push(catalogo);
            }
        }
        
        return catalogos;
    } catch (error) {
        console.error('Erro ao detectar catálogos:', error);
        // Fallback para a lista manual em caso de erro
        return getCatalogosManual();
    }
}

// Função para verificar se uma imagem existe
async function checkImageExists(imagePath) {
    try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

// Função para formatar o título baseado no nome do arquivo
function formatTitle(baseName) {
    // Remover caracteres especiais e converter para título
    let title = baseName
        .replace(/[_-]/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim();
    
    // Capitalizar primeira letra de cada palavra
    title = title.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    
    // Correções específicas para termos conhecidos
    const corrections = {
        'Adaptacoes': 'Adaptações',
        'Molas': 'Molas',
        'Feixes': 'Feixes',
        'Catalago': 'Catálogo',
        'Linha': 'Linha',
        'Freios': 'Freios',
        'Carretinha': 'Carretinha',
        'Conexoes': 'Conexões',
        'Cruzeta': 'Cruzeta',
        'Cardan': 'Cardan',
        'Engate': 'Engate',
        'Automatico': 'Automático',
        'Acessorios': 'Acessórios',
        'Automotiva': 'Automotiva',
        'Caminhonetes': 'Caminhonetes',
        'Fixacao': 'Fixação',
        'Macacos': 'Macacos',
        'Suspensao': 'Suspensão',
        'Caminhoes': 'Caminhões',
        'Quinta': 'Quinta',
        'Roda': 'Roda',
        'Carretas': 'Carretas',
        'Trucks': 'Trucks'
    };
    
    Object.keys(corrections).forEach(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        title = title.replace(regex, corrections[key]);
    });
    
    return title;
}

// Função para gerar descrição baseada no nome do arquivo
function generateDescription(baseName) {
    const descriptions = {
        'ADAPTAÇÕESMOLASEFEIXES': 'Soluções em adaptações para molas e feixes automotivos',
        'CATALAGOLINHAFREIOS': 'Linha completa de componentes para sistemas de freios',
        'CATALOGOCARRETINHA': 'Peças e componentes para carretinhas e reboques',
        'CONEXOES': 'Conexões e acoplamentos para sistemas automotivos',
        'CRUZETACARDAN': 'Cruzetas e componentes para transmissão cardan',
        'ENGATEAUTOMATICO': 'Sistemas de engate automático para veículos pesados',
        'LINHAACESSORIOS': 'Acessórios diversos para veículos automotores',
        'LINHAAUTOMOTIVA': 'Linha geral de peças para veículos automotivos',
        'LINHACAMINHONETES': 'Peças específicas para caminhonetes e pick-ups',
        'LINHACONEXÕES': 'Linha especializada em conexões automotivas',
        'LINHAFIXAÇAO': 'Componentes de fixação e parafusaria automotiva',
        'LINHAMACACOS': 'Macacos hidráulicos e pneumáticos para veículos',
        'LINHASUSPENSAOCAMINHÕES': 'Sistema de suspensão para caminhões pesados',
        'QUINTARODA': 'Quinta roda e componentes para cavalos mecânicos',
        'SUSPENSAOCARRETASETRUCKS': 'Sistemas de suspensão para carretas e trucks'
    };
    
    // Retornar descrição específica ou gerar uma genérica
    return descriptions[baseName] || `Catálogo de produtos ${formatTitle(baseName).toLowerCase()}`;
}

// Função fallback com catálogos manuais (caso a detecção automática falhe)
function getCatalogosManual() {
    return [
        {
            id: 'adaptacoes',
            title: 'Adaptações Molas e Feixes',
            description: 'Soluções em adaptações para molas e feixes automotivos',
            image: 'images/ADAPTAÇÕESMOLASEFEIXES.png',
            pdf: 'ADAPTAÇÕESMOLASEFEIXES.pdf'
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
            id: 'conexoes-linha',
            title: 'Linha Conexões',
            description: 'Linha especializada em conexões automotivas',
            image: 'images/LINHACONEXÕES.png',
            pdf: 'LINHACONEXÕES.pdf'
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
            id: 'suspensao-caminhoes',
            title: 'Linha Suspensão Caminhões',
            description: 'Sistema de suspensão para caminhões pesados',
            image: 'images/LINHASUSPENSAOCAMINHÕES.png',
            pdf: 'LINHASUSPENSAOCAMINHÕES.pdf'
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
}

// Função para criar cards do portfólio (modificada para usar detecção automática)
async function createPortfolioCards() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    // Mostrar loading
    portfolioGrid.innerHTML = '<div class="loading">Carregando catálogos...</div>';
    
    try {
        // Detectar catálogos automaticamente
        const catalogos = await detectCatalogos();
        
        // Limpar loading
        portfolioGrid.innerHTML = '';
        
        catalogos.forEach((catalogo, index) => {
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <img src="${catalogo.image}" alt="${catalogo.title}" class="card-image" loading="lazy">
                <div class="card-content">
                    <h3 class="card-title">${catalogo.title}</h3>
                    <p class="card-description">${catalogo.description}</p>
                    <a href="${catalogo.pdf}" class="download-button" download>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Baixar PDF
                    </a>
                </div>
            `;
            
            portfolioGrid.appendChild(card);
        });
        
        console.log(`${catalogos.length} catálogos carregados automaticamente`);
        
    } catch (error) {
        console.error('Erro ao carregar catálogos:', error);
        portfolioGrid.innerHTML = '<div class="error">Erro ao carregar catálogos. Tente recarregar a página.</div>';
    }
}

// Função para navegação suave
function smoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para destacar link ativo na navegação
function highlightActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Função para menu mobile
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Função para animação de scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    const animateElements = document.querySelectorAll('.portfolio-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função para efeito parallax no hero
function setupParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Função para loading das imagens
function setupImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    createPortfolioCards();
    smoothScroll();
    highlightActiveNav();
    setupMobileMenu();
    animateOnScroll();
    setupParallax();
    setupImageLoading();
    
    // Adicionar classe para animações CSS
    document.body.classList.add('loaded');
});

// Função para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimizar eventos de scroll
const optimizedScroll = debounce(() => {
    highlightActiveNav();
}, 10);

window.addEventListener('scroll', optimizedScroll);

