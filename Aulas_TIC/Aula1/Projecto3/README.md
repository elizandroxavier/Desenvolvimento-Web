# 📬 Formulário de Contacto Profissional

Um formulário de contacto moderno, elegante e totalmente funcional, desenvolvido com HTML5, CSS3 e JavaScript puro (Vanilla JS).

## ✨ Características

### 🎨 Design
- **Visual sofisticado** com gradiente azul/roxo moderno
- **Layout responsivo** com sistema de grid para duas colunas
- **Animações suaves** e transições elegantes
- **Efeitos visuais** de hover, focus e estados
- **Tipografia Inter** do Google Fonts
- **Sombras e bordas** profissionais

### ⚙️ Funcionalidades
- ✅ Validação em tempo real de todos os campos
- ✅ Feedback visual imediato (erro/sucesso)
- ✅ Estado de carregamento durante envio
- ✅ Mensagem de confirmação animada
- ✅ Prevenção de envio com dados inválidos
- ✅ Simulação de API com Promise
- ✅ Foco automático e navegação por teclado

### 📋 Campos do Formulário
1. **Primeiro nome** (obrigatório)
2. **Segundo nome** (obrigatório)
3. **E-mail** (obrigatório, validação de formato)
4. **Número** (obrigatório, validação de telefone)
5. **Assunto** (obrigatório)
6. **Mensagem** (obrigatório, mínimo 20 caracteres)

### 🔒 Validações Implementadas

| Campo | Validação |
|-------|-----------|
| Primeiro Nome | Mínimo 2 caracteres, apenas letras |
| Segundo Nome | Mínimo 2 caracteres, apenas letras |
| E-mail | Formato RFC compliant |
| Número | Formato internacional, 9-20 caracteres |
| Assunto | Mínimo 5 caracteres |
| Mensagem | Mínimo 20, máximo 1000 caracteres |

## 📱 Responsividade

- **Desktop** (>768px): Layout de 2 colunas para nome/email e email/número
- **Tablet** (481-768px): Layout de 1 coluna com espaçamento otimizado
- **Mobile** (<480px): Layout vertical, campos otimizados para toque

## 🚀 Como Usar

### Instalação Simples
1. Faça download dos 3 arquivos:
   - `index.html`
   - `style.css`
   - `script.js`

2. Coloque todos os arquivos na mesma pasta

3. Abra o `index.html` no navegador

### Estrutura de Arquivos
```
projeto/
├── index.html      # Estrutura HTML
├── style.css       # Estilos e animações
└── script.js       # Validação e lógica
```

## 🔧 Personalização

### Alterar Cores
No arquivo `style.css`, edite as variáveis CSS:

```css
:root {
    --primary-color: #2563eb;      /* Cor principal */
    --primary-hover: #1d4ed8;      /* Hover do botão */
    --error-color: #dc2626;        /* Cor de erro */
    --success-color: #059669;      /* Cor de sucesso */
}
```

### Alterar Gradiente de Fundo
```css
body {
    background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #4c1d95 100%);
}
```

### Conectar a uma API Real
No arquivo `script.js`, substitua a função `submitFormData`:

```javascript
function submitFormData(formData) {
    return fetch('https://sua-api.com/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json());
}
```

## 🎯 Recursos Técnicos

### HTML
- Estrutura semântica
- Atributos ARIA para acessibilidade
- Autocomplete otimizado
- Labels associados corretamente

### CSS
- CSS Variables para fácil personalização
- Flexbox e CSS Grid
- Media Queries mobile-first
- Animações com @keyframes
- Estados hover, focus, active
- Suporte a `prefers-reduced-motion`
- Suporte a `prefers-contrast`

### JavaScript
- ES6+ (Arrow functions, const/let, template literals)
- Validação com RegEx
- Manipulação do DOM
- Event Listeners
- Promises para assincronicidade
- IIFE para encapsulamento
- Código documentado com JSDoc

## ♿ Acessibilidade

- ✅ Navegação por teclado (Tab, Enter)
- ✅ Atributos ARIA (aria-required, aria-invalid, aria-label)
- ✅ Foco visível em todos os elementos
- ✅ Mensagens de erro associadas aos campos
- ✅ Contraste de cores adequado
- ✅ Suporte a leitores de tela
- ✅ Redução de movimento para usuários sensíveis

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Dispositivos
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablets (iPad, Android)
- ✅ Smartphones (iOS, Android)

## 📊 Performance

- **Tamanho total**: ~15KB (não comprimido)
- **Tempo de carregamento**: <100ms
- **Sem dependências externas** (exceto Google Fonts)
- **Otimizado para Core Web Vitals**

## 🐛 Solução de Problemas

### O formulário não está validando
- Verifique se os IDs dos campos no HTML correspondem ao JavaScript
- Abra o Console do navegador (F12) para ver possíveis erros

### Os estilos não estão aparecendo
- Confirme que `style.css` está no mesmo diretório que `index.html`
- Verifique a tag `<link>` no HTML

### O JavaScript não funciona
- Confirme que `script.js` está no mesmo diretório
- Verifique se há erros no Console (F12)
- Certifique-se de que o JavaScript está habilitado no navegador

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins comerciais e pessoais.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Otimizar o código

## 📧 Suporte

Para dúvidas ou suporte, consulte a documentação ou entre em contato.

---

**Desenvolvido com ❤️ para a comunidade web**
