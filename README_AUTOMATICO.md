# 🚀 DANKAR Portfolio - Versão Automática

## ✨ Nova Funcionalidade: Detecção Automática de Catálogos

Esta versão do site detecta automaticamente todos os arquivos PDF na pasta e cria os catálogos dinamicamente, sem necessidade de editar código!

## 📋 Como Adicionar Novos Catálogos

### Passo 1: Adicionar o PDF
- Coloque o novo arquivo PDF diretamente na pasta `dankar_portfolio`
- Exemplo: `NOVO_CATALOGO.pdf`

### Passo 2: Adicionar a Imagem de Capa
- Extraia a primeira página do PDF como imagem PNG
- Salve na pasta `images/` com o **mesmo nome** do PDF
- Exemplo: `images/NOVO_CATALOGO.png`

### Passo 3: Pronto!
- Recarregue o site e o novo catálogo aparecerá automaticamente
- O título e descrição serão gerados automaticamente baseados no nome do arquivo

## 🎯 Regras de Nomenclatura

### Para Títulos Automáticos:
- `LINHAACESSORIOS.pdf` → "Linha Acessórios"
- `CATALOGOFREIOS.pdf` → "Catálogo Freios"
- `SUSPENSAOCAMINHOES.pdf` → "Suspensão Caminhões"

### Para Descrições Automáticas:
O sistema gera descrições baseadas no nome do arquivo ou usa uma descrição genérica.

## 🔧 Estrutura de Arquivos

```
dankar_portfolio/
├── index.html
├── styles.css
├── script_auto.js          ← Novo script automático
├── images/
│   ├── logo.png
│   ├── CATALOGO1.png       ← Imagem do catálogo
│   ├── CATALOGO2.png
│   └── ...
├── CATALOGO1.pdf           ← PDF do catálogo
├── CATALOGO2.pdf
└── ...
```

## ⚡ Funcionalidades

### ✅ Detecção Automática
- Escaneia automaticamente todos os PDFs na pasta
- Verifica se existe imagem correspondente
- Cria catálogos apenas para PDFs que têm imagem

### ✅ Títulos Inteligentes
- Converte nomes de arquivos em títulos legíveis
- Corrige acentuação automaticamente
- Capitaliza palavras adequadamente

### ✅ Fallback Seguro
- Se a detecção automática falhar, usa a lista manual
- Garante que o site sempre funcione

### ✅ Loading Visual
- Mostra indicador de carregamento
- Exibe mensagens de erro se necessário

## 🎨 Personalização

### Para Personalizar Títulos:
Edite a função `formatTitle()` no arquivo `script_auto.js`

### Para Personalizar Descrições:
Edite o objeto `descriptions` na função `generateDescription()` no arquivo `script_auto.js`

## 🔍 Exemplo Prático

### Adicionando "Catálogo de Pneus":

1. **Adicione o PDF:**
   - Salve como: `CATALOGOPNEUS.pdf`

2. **Adicione a imagem:**
   - Salve como: `images/CATALOGOPNEUS.png`

3. **Resultado automático:**
   - Título: "Catálogo Pneus"
   - Descrição: "Catálogo de produtos catálogo pneus"
   - Link de download funcionando

## 🚨 Solução de Problemas

### Catálogo não aparece:
1. Verifique se o PDF está na pasta raiz
2. Verifique se a imagem está na pasta `images/`
3. Verifique se os nomes são **exatamente iguais** (exceto a extensão)
4. Recarregue a página

### Título ou descrição incorretos:
- Edite as funções de formatação no `script_auto.js`

### Site não carrega:
- Verifique o console do navegador (F12)
- Use um servidor HTTP local (`py -m http.server 8080`)

## 🎉 Vantagens da Versão Automática

- ✅ **Fácil manutenção:** Apenas adicione PDF + imagem
- ✅ **Sem edição de código:** Não precisa mexer no JavaScript
- ✅ **Prova de erros:** Sistema de fallback integrado
- ✅ **Escalável:** Suporta quantos catálogos quiser
- ✅ **Inteligente:** Gera títulos e descrições automaticamente

---

**Desenvolvido para DANKAR Distribuidora de Molas e Peças**
*Versão Automática - Facilitando a gestão de catálogos*

