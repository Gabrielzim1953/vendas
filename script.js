'use strict';

/* ================= Constantes ================= */
const KEY = 'gestao-vendas:v1';
const STATUS = ['Pendente', 'Pago', 'Enviado', 'Entregue', 'Cancelado'];
const CANAIS = ['Site', 'Instagram', 'WhatsApp', 'Mercado Livre', 'Shopee', 'Loja física'];
const PAGAMENTOS = ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Boleto', 'Dinheiro'];

const ICONS = {
  painel: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  vendas: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  produtos: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  clientes: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  relatorios: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  config: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  edit: '<path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  print: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  box: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
};
const icon = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

/* ================= Utilitários ================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const brl = v => (+v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const num = v => (+v || 0).toLocaleString('pt-BR');
const pct = v => (isFinite(v) ? (v * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%' : '—');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sum = (arr, f) => arr.reduce((s, x) => s + f(x), 0);
const byId = (arr, id) => arr.find(x => x.id === id);
const byNome = (a, b) => a.nome.localeCompare(b.nome, 'pt-BR');
const opts = (list, sel) => list.map(o => `<option ${o === sel ? 'selected' : ''}>${esc(o)}</option>`).join('');
const compact = v => v >= 1000
  ? 'R$ ' + (v / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil'
  : 'R$ ' + Math.round(v);

const z = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
const parseYmd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
const hoje = () => ymd(new Date());
const fmtData = s => (s ? parseYmd(s).toLocaleDateString('pt-BR') : '—');
const diasNoMes = (y, m) => new Date(y, m + 1, 0).getDate();

/* ================= Dados ================= */
let db = carregar();
const ui = {
  vendas: { q: '', status: '', canal: '', de: '', ate: '', limite: 50 },
  produtos: { q: '', cat: '' },
  clientes: { q: '' },
  rel: { periodo: '30', de: addDays(hoje(), -29), ate: hoje() },
};

function carregar() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* segue com dados de exemplo */ }
  return dadosExemplo();
}

function salvar() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch (e) { toast('Não foi possível salvar os dados neste navegador.', 'erro'); }
}

function dadosExemplo() {
  let s = 7;
  const rnd = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const pick = a => a[Math.floor(rnd() * a.length)];

  const produtos = [
    ['Camiseta Básica Algodão', 'Roupas', 22, 59.9],
    ['Moletom Canguru', 'Roupas', 68, 149.9],
    ['Calça Jeans Slim', 'Roupas', 55, 139.9],
    ['Tênis Casual Branco', 'Calçados', 95, 229.9],
    ['Chinelo Slide', 'Calçados', 18, 49.9],
    ['Boné Aba Curva', 'Acessórios', 15, 59.9],
    ['Mochila Urbana', 'Acessórios', 62, 169.9],
    ['Relógio Digital', 'Acessórios', 48, 129.9],
    ['Óculos de Sol', 'Acessórios', 25, 89.9],
    ['Garrafa Térmica 500ml', 'Casa', 21, 69.9],
    ['Caneca Personalizada', 'Casa', 9, 34.9],
    ['Fone Bluetooth', 'Eletrônicos', 58, 159.9],
    ['Carregador Turbo USB-C', 'Eletrônicos', 19, 59.9],
  ].map((p, i) => ({
    id: uid() + i, nome: p[0], sku: 'SKU-' + (1001 + i), categoria: p[1],
    custo: p[2], preco: p[3], estoque: 15 + Math.floor(rnd() * 60), minimo: 10,
  }));
  produtos[4].estoque = 4;
  produtos[10].estoque = 7;

  const nomes = ['Ana Souza', 'Bruno Lima', 'Carla Mendes', 'Diego Rocha', 'Eduarda Alves', 'Felipe Castro',
    'Gabriela Nunes', 'Henrique Dias', 'Isabela Freitas', 'João Pereira', 'Karina Lopes', 'Lucas Martins',
    'Mariana Costa', 'Nicolas Ribeiro', 'Paula Teixeira', 'Rafael Gomes'];
  const cidades = ['São Paulo/SP', 'Rio de Janeiro/RJ', 'Belo Horizonte/MG', 'Curitiba/PR', 'Porto Alegre/RS',
    'Salvador/BA', 'Recife/PE', 'Fortaleza/CE', 'Goiânia/GO', 'Campinas/SP'];
  const clientes = nomes.map((n, i) => ({
    id: uid() + 'c' + i, nome: n,
    email: n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(' ', '.') + '@email.com',
    telefone: `(11) 9${8000 + Math.floor(rnd() * 1999)}-${1000 + Math.floor(rnd() * 8999)}`,
    cidade: pick(cidades), obs: '',
  }));

  const h = hoje();
  const vendas = [];
  for (let k = 0; k < 170; k++) {
    const dias = Math.floor(Math.pow(rnd(), 1.15) * 120);
    const data = addDays(h, -dias);
    const qtdItens = 1 + Math.floor(rnd() * rnd() * 3.5);
    const itens = [];
    for (let j = 0; j < qtdItens; j++) {
      const p = pick(produtos);
      if (itens.some(i => i.produtoId === p.id)) continue;
      itens.push({ produtoId: p.id, nome: p.nome, qtd: 1 + Math.floor(rnd() * rnd() * 3), preco: p.preco, custo: p.custo });
    }
    let status;
    if (dias > 10) status = rnd() < 0.06 ? 'Cancelado' : 'Entregue';
    else if (dias > 4) status = pick(['Enviado', 'Entregue', 'Entregue', 'Pago']);
    else status = pick(['Pendente', 'Pago', 'Pago', 'Enviado']);
    vendas.push({
      id: uid() + 'v' + k, numero: 0, data,
      clienteId: rnd() < 0.18 ? '' : pick(clientes).id,
      itens, desconto: rnd() < 0.2 ? 10 : 0, frete: rnd() < 0.6 ? pick([0, 15.9, 19.9, 24.9]) : 0,
      pagamento: pick(PAGAMENTOS.concat(['Pix', 'Pix', 'Cartão de crédito'])),
      canal: pick(CANAIS.concat(['Site', 'Instagram', 'Site'])),
      status, obs: '',
    });
  }
  vendas.sort((a, b) => a.data.localeCompare(b.data));
  vendas.forEach((v, i) => { v.numero = 1001 + i; });

  return {
    config: { loja: 'Minha Loja Online', meta: 15000, tema: '' },
    produtos, clientes, vendas, seq: 1001 + vendas.length,
  };
}

/* ================= Cálculos ================= */
const subtotal = v => sum(v.itens, i => i.qtd * i.preco);
const totalVenda = v => Math.max(0, subtotal(v) - (+v.desconto || 0) + (+v.frete || 0));
const custoVenda = v => sum(v.itens, i => i.qtd * (i.custo || 0));
const lucroVenda = v => totalVenda(v) - (+v.frete || 0) - custoVenda(v);
const qtdItens = v => sum(v.itens, i => i.qtd);
const validas = (de, ate) => db.vendas.filter(v => v.status !== 'Cancelado' && v.data >= de && v.data <= ate);
const ordenarVendas = vs => vs.slice().sort((a, b) => b.data.localeCompare(a.data) || b.numero - a.numero);
const nomeCliente = id => (!id ? 'Consumidor final' : (byId(db.clientes, id)?.nome || 'Cliente removido'));

function resumo(vs) {
  const fat = sum(vs, totalVenda);
  const lucro = sum(vs, lucroVenda);
  return { fat, lucro, pedidos: vs.length, ticket: vs.length ? fat / vs.length : 0, itens: sum(vs, qtdItens), margem: fat ? lucro / fat : NaN };
}

function agrupar(vs, chaveFn, valorFn = totalVenda) {
  const m = new Map();
  vs.forEach(v => { const k = chaveFn(v); m.set(k, (m.get(k) || 0) + valorFn(v)); });
  return [...m].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function porProduto(vs) {
  const m = new Map();
  vs.forEach(v => v.itens.forEach(i => {
    const r = m.get(i.produtoId) || { nome: i.nome, qtd: 0, receita: 0, lucro: 0 };
    r.qtd += i.qtd; r.receita += i.qtd * i.preco; r.lucro += i.qtd * (i.preco - (i.custo || 0));
    m.set(i.produtoId, r);
  }));
  return [...m.values()].sort((a, b) => b.receita - a.receita);
}

function porCategoria(vs) {
  const m = new Map();
  vs.forEach(v => v.itens.forEach(i => {
    const cat = byId(db.produtos, i.produtoId)?.categoria || 'Sem categoria';
    m.set(cat, (m.get(cat) || 0) + i.qtd * i.preco);
  }));
  return [...m].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function serieDiaria(de, ate) {
  const vs = validas(de, ate);
  const m = new Map();
  vs.forEach(v => m.set(v.data, (m.get(v.data) || 0) + totalVenda(v)));
  const out = [];
  for (let d = de; d <= ate; d = addDays(d, 1)) {
    const value = m.get(d) || 0;
    const dt = parseYmd(d);
    out.push({ label: `${z(dt.getDate())}/${z(dt.getMonth() + 1)}`, value, tip: `<b>${fmtData(d)}</b><br>${brl(value)}` });
  }
  return out;
}

function serieMensal(de, ate) {
  const vs = validas(de, ate);
  const m = new Map();
  vs.forEach(v => { const k = v.data.slice(0, 7); m.set(k, (m.get(k) || 0) + totalVenda(v)); });
  const out = [];
  const d = parseYmd(de.slice(0, 8) + '01');
  while (ymd(d) <= ate) {
    const k = ymd(d).slice(0, 7);
    const nomeMes = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    const value = m.get(k) || 0;
    out.push({ label: `${nomeMes}/${String(d.getFullYear()).slice(2)}`, value, tip: `<b>${d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</b><br>${brl(value)}` });
    d.setMonth(d.getMonth() + 1);
  }
  return out;
}

function estatisticasClientes() {
  const m = new Map();
  db.vendas.forEach(v => {
    if (v.status === 'Cancelado' || !v.clienteId) return;
    const r = m.get(v.clienteId) || { pedidos: 0, total: 0, ultima: '' };
    r.pedidos++; r.total += totalVenda(v); if (v.data > r.ultima) r.ultima = v.data;
    m.set(v.clienteId, r);
  });
  return m;
}

/* ================= Estoque ================= */
function aplicarEstoque(v, sinal) {
  if (v.status === 'Cancelado') return;
  v.itens.forEach(i => { const p = byId(db.produtos, i.produtoId); if (p) p.estoque -= sinal * i.qtd; });
}

function faltaEstoque(v) {
  if (v.status === 'Cancelado') return null;
  const m = new Map();
  v.itens.forEach(i => m.set(i.produtoId, (m.get(i.produtoId) || 0) + i.qtd));
  for (const [pid, qtd] of m) {
    const p = byId(db.produtos, pid);
    if (p && qtd > p.estoque) return `Estoque insuficiente de "${p.nome}" (disponível: ${p.estoque}).`;
  }
  return null;
}

/** Substitui uma venda (ou cria, se antiga for null) mantendo o estoque consistente. */
function gravarVenda(antiga, nova) {
  if (antiga) aplicarEstoque(antiga, -1);
  const falta = faltaEstoque(nova);
  if (falta) {
    if (antiga) aplicarEstoque(antiga, +1);
    toast(falta, 'erro');
    return false;
  }
  aplicarEstoque(nova, +1);
  if (antiga) db.vendas[db.vendas.findIndex(v => v.id === antiga.id)] = nova;
  else db.vendas.push(nova);
  salvar();
  return true;
}

/* ================= Gráficos ================= */
function niceMax(m) {
  const p = 10 ** Math.floor(Math.log10(m));
  const n = m / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

function barChart(data, altura = 230) {
  if (!data.length) return '<p class="empty">Sem dados no período.</p>';
  const W = 760, H = altura, pl = 64, pr = 8, pt = 10, pb = 26;
  const max = niceMax(Math.max(...data.map(d => d.value), 100));
  const ih = H - pt - pb;
  const cw = (W - pl - pr) / data.length;
  const bw = Math.max(2, Math.min(42, cw * 0.66));
  let svg = '';
  for (let t = 0; t <= 4; t++) {
    const y = pt + ih * (1 - t / 4);
    svg += `<line class="grid-line" x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}"/>`;
    svg += `<text class="axis" x="${pl - 8}" y="${y + 4}" text-anchor="end">${compact(max * t / 4)}</text>`;
  }
  const passo = Math.ceil(data.length / 12);
  data.forEach((d, i) => {
    const bh = ih * d.value / max;
    const x = pl + i * cw;
    svg += `<g class="bar" data-tip="${esc(d.tip || d.label + '<br>' + brl(d.value))}">
      <rect class="hit" x="${x}" y="${pt}" width="${cw}" height="${ih}" rx="4"/>
      <rect class="fill" x="${x + (cw - bw) / 2}" y="${H - pb - bh}" width="${bw}" height="${Math.max(bh, d.value ? 2 : 0)}" rx="3"/>
    </g>`;
    if (i % passo === 0) svg += `<text class="axis" x="${x + cw / 2}" y="${H - 8}" text-anchor="middle">${esc(d.label)}</text>`;
  });
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img">${svg}</svg></div>`;
}

function hbars(rows, fmt = brl, total) {
  if (!rows.length) return '<p class="empty">Sem dados no período.</p>';
  const max = Math.max(...rows.map(r => r.value), 1);
  return `<div class="hbars">${rows.map(r => `
    <div>
      <div class="hbar-top"><span>${esc(r.label)}${total ? `<em>${pct(r.value / total)}</em>` : ''}</span><strong>${fmt(r.value)}</strong></div>
      <div class="hbar-track"><div class="hbar-fill" style="width:${(r.value / max * 100).toFixed(1)}%"></div></div>
    </div>`).join('')}</div>`;
}

/* ================= Componentes ================= */
function cabecalho(titulo, sub, acoes = '') {
  return `<div class="page-head"><div><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div><div class="page-actions">${acoes}</div></div>`;
}

function kpi(label, valor, extra = '') {
  return `<div class="card kpi"><span class="kpi-label">${label}</span><strong>${valor}</strong>${extra}</div>`;
}

function delta(atual, anterior) {
  if (!anterior) return '<small>sem base de comparação</small>';
  const d = (atual - anterior) / anterior;
  return `<small><span class="delta ${d >= 0 ? 'up' : 'down'}">${d >= 0 ? '▲' : '▼'} ${pct(Math.abs(d))}</span> vs. mesmo período do mês anterior</small>`;
}

const badgeStatus = s => `<span class="badge st-${s}">${s}</span>`;

function selectStatus(v) {
  return `<select class="status-select st-${v.status}" data-id="${v.id}" aria-label="Status do pedido #${v.numero}">${opts(STATUS, v.status)}</select>`;
}

/* ================= Páginas ================= */
const PAGINAS = [
  { id: 'painel', nome: 'Painel', render: renderPainel },
  { id: 'vendas', nome: 'Vendas', render: renderVendas },
  { id: 'produtos', nome: 'Produtos', render: renderProdutos },
  { id: 'clientes', nome: 'Clientes', render: renderClientes },
  { id: 'relatorios', nome: 'Relatórios', render: renderRelatorios },
  { id: 'config', nome: 'Configurações', render: renderConfig },
];

function rota() {
  const id = location.hash.slice(1) || 'painel';
  const pag = PAGINAS.find(p => p.id === id) || PAGINAS[0];
  const abertos = db.vendas.filter(v => v.status === 'Pendente' || v.status === 'Pago').length;
  $('#nav').innerHTML = PAGINAS.map(p => `
    <a href="#${p.id}" class="${p.id === pag.id ? 'active' : ''}">${icon(p.id)}<span class="label">${p.nome}</span>
      ${p.id === 'vendas' && abertos ? `<span class="count" title="Pedidos a processar">${abertos}</span>` : ''}</a>`).join('');
  $('#lojaNome').textContent = db.config.loja || 'Minha Loja';
  $('#lojaInicial').textContent = (db.config.loja || 'L').trim().charAt(0).toUpperCase();
  document.title = `${pag.nome} · ${db.config.loja || 'Gestão de Vendas'}`;
  pag.render();
}

function rerender() { const y = window.scrollY; rota(); window.scrollTo(0, y); }

/* ---------- Painel ---------- */
function renderPainel() {
  const h = hoje();
  const d = parseYmd(h);
  const ini = h.slice(0, 8) + '01';
  const pIni = ymd(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const pAte = ymd(new Date(d.getFullYear(), d.getMonth() - 1, Math.min(d.getDate(), diasNoMes(d.getFullYear(), d.getMonth() - 1))));
  const atual = resumo(validas(ini, h));
  const ant = resumo(validas(pIni, pAte));
  const meta = +db.config.meta || 0;
  const prog = meta ? atual.fat / meta : 0;
  const diasRest = diasNoMes(d.getFullYear(), d.getMonth()) - d.getDate();

  const baixo = db.produtos.filter(p => p.estoque <= p.minimo).sort((a, b) => a.estoque - b.estoque);
  const abertos = ordenarVendas(db.vendas.filter(v => v.status === 'Pendente' || v.status === 'Pago'));
  const recentes = ordenarVendas(db.vendas).slice(0, 7);
  const top = porProduto(validas(ini, h)).slice(0, 5);
  const mesNome = d.toLocaleDateString('pt-BR', { month: 'long' });

  $('#view').innerHTML = cabecalho('Painel', `Resumo de ${mesNome} de ${d.getFullYear()}`,
    `<button class="btn primary" data-action="nova-venda">${icon('plus')} Nova venda</button>`) + `
    <div class="grid kpis">
      ${kpi('Faturamento do mês', brl(atual.fat), delta(atual.fat, ant.fat))}
      ${kpi('Pedidos', num(atual.pedidos), delta(atual.pedidos, ant.pedidos))}
      ${kpi('Ticket médio', brl(atual.ticket), delta(atual.ticket, ant.ticket))}
      ${kpi('Lucro bruto', brl(atual.lucro), `<small>Margem de ${pct(atual.margem)}</small>`)}
    </div>

    <div class="grid cols-2-1">
      <div class="card">
        <h3>Faturamento diário <small>últimos 30 dias</small></h3>
        ${barChart(serieDiaria(addDays(h, -29), h))}
      </div>
      <div class="card">
        <h3>Meta do mês <a href="#config" style="font-size:12px;font-weight:500">editar</a></h3>
        ${meta ? `
          <div class="kpi"><strong>${pct(prog)}</strong></div>
          <div class="meta-bar"><div style="width:${Math.min(100, prog * 100).toFixed(1)}%"></div></div>
          <div class="meta-row"><span>${brl(atual.fat)}</span><span>de ${brl(meta)}</span></div>
          <p class="hint" style="margin-top:12px">${prog >= 1 ? 'Meta batida! 🎉'
            : `Faltam ${brl(meta - atual.fat)} em ${diasRest} dia${diasRest === 1 ? '' : 's'}${diasRest ? ` (≈ ${brl((meta - atual.fat) / diasRest)}/dia)` : ''}.`}</p>`
          : '<p class="hint">Defina uma meta mensal em Configurações para acompanhar o progresso.</p>'}
        <h3 style="margin-top:22px">Mais vendidos no mês</h3>
        ${top.length ? `<div class="list">${top.map(p => `
          <div class="list-item"><div><div class="t">${esc(p.nome)}</div><span class="sub">${num(p.qtd)} un.</span></div><strong>${brl(p.receita)}</strong></div>`).join('')}</div>`
          : '<p class="hint">Nenhuma venda neste mês ainda.</p>'}
      </div>
    </div>

    <div class="grid cols-3">
      <div class="card">
        <h3>A processar <small>${abertos.length} pedido${abertos.length === 1 ? '' : 's'}</small></h3>
        ${abertos.length ? `<div class="list">${abertos.slice(0, 6).map(v => `
          <div class="list-item">
            <div><a href="#" class="t" data-action="ver-venda" data-id="${v.id}">#${v.numero} · ${esc(nomeCliente(v.clienteId))}</a><span class="sub">${fmtData(v.data)} · ${brl(totalVenda(v))}</span></div>
            ${badgeStatus(v.status)}
          </div>`).join('')}</div>` : '<p class="hint">Tudo em dia! Nenhum pedido pendente.</p>'}
        ${abertos.length > 6 ? `<p class="hint" style="margin-top:8px"><a href="#vendas" data-action="filtrar-abertos">Ver todos</a></p>` : ''}
      </div>
      <div class="card">
        <h3>Estoque baixo <small>${baixo.length} produto${baixo.length === 1 ? '' : 's'}</small></h3>
        ${baixo.length ? `<div class="list">${baixo.slice(0, 6).map(p => `
          <div class="list-item">
            <div><div class="t">${esc(p.nome)}</div><span class="sub">${p.estoque} un. · mínimo ${p.minimo}</span></div>
            <button class="btn sm" data-action="repor" data-id="${p.id}">Repor</button>
          </div>`).join('')}</div>` : '<p class="hint">Todos os produtos estão com estoque saudável.</p>'}
      </div>
      <div class="card">
        <h3>Últimas vendas <a href="#vendas" style="font-size:12px;font-weight:500">ver todas</a></h3>
        ${recentes.length ? `<div class="list">${recentes.map(v => `
          <div class="list-item">
            <div><a href="#" class="t" data-action="ver-venda" data-id="${v.id}">#${v.numero} · ${esc(nomeCliente(v.clienteId))}</a><span class="sub">${fmtData(v.data)} · ${esc(v.canal)}</span></div>
            <strong>${brl(totalVenda(v))}</strong>
          </div>`).join('')}</div>` : '<p class="hint">Nenhuma venda registrada.</p>'}
      </div>
    </div>`;
}

/* ---------- Vendas ---------- */
function renderVendas() {
  const f = ui.vendas;
  $('#view').innerHTML = cabecalho('Vendas', 'Registre e acompanhe os pedidos da loja',
    `<button class="btn" data-action="csv-vendas">${icon('download')} Exportar CSV</button>
     <button class="btn primary" data-action="nova-venda">${icon('plus')} Nova venda</button>`) + `
    <div class="card">
      <div class="toolbar">
        <input type="search" id="fq" placeholder="Buscar por nº, cliente ou produto…" value="${esc(f.q)}">
        <select id="fstatus"><option value="">Todos os status</option>${opts(STATUS, f.status)}</select>
        <select id="fcanal"><option value="">Todos os canais</option>${opts(CANAIS, f.canal)}</select>
        <label class="inline">De <input type="date" id="fde" value="${f.de}"></label>
        <label class="inline">Até <input type="date" id="fate" value="${f.ate}"></label>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Pedido</th><th>Data</th><th>Cliente</th><th>Canal</th><th>Pagamento</th><th class="num">Total</th><th>Status</th><th></th></tr></thead>
          <tbody id="tbVendas"></tbody>
        </table>
      </div>
      <div class="table-foot" id="footVendas"></div>
    </div>`;

  const ligar = (id, campo) => $('#' + id).addEventListener('input', e => { f[campo] = e.target.value; f.limite = 50; tabelaVendas(); });
  ligar('fq', 'q'); ligar('fstatus', 'status'); ligar('fcanal', 'canal'); ligar('fde', 'de'); ligar('fate', 'ate');
  tabelaVendas();
}

function vendasFiltradas() {
  const f = ui.vendas;
  const q = f.q.trim().toLowerCase();
  return ordenarVendas(db.vendas.filter(v =>
    (!f.status || v.status === f.status) &&
    (!f.canal || v.canal === f.canal) &&
    (!f.de || v.data >= f.de) &&
    (!f.ate || v.data <= f.ate) &&
    (!q || String(v.numero).includes(q.replace('#', '')) ||
      nomeCliente(v.clienteId).toLowerCase().includes(q) ||
      v.itens.some(i => i.nome.toLowerCase().includes(q)))));
}

function tabelaVendas() {
  const lista = vendasFiltradas();
  const vis = lista.slice(0, ui.vendas.limite);
  $('#tbVendas').innerHTML = vis.length ? vis.map(v => `
    <tr>
      <td><a href="#" class="strong" data-action="ver-venda" data-id="${v.id}">#${v.numero}</a><span class="sub">${qtdItens(v)} ${qtdItens(v) === 1 ? 'item' : 'itens'}</span></td>
      <td>${fmtData(v.data)}</td>
      <td>${esc(nomeCliente(v.clienteId))}</td>
      <td>${esc(v.canal)}</td>
      <td>${esc(v.pagamento)}</td>
      <td class="num strong">${brl(totalVenda(v))}</td>
      <td>${selectStatus(v)}</td>
      <td class="actions">
        <button class="icon-btn" data-action="editar-venda" data-id="${v.id}" title="Editar">${icon('edit')}</button>
        <button class="icon-btn danger" data-action="excluir-venda" data-id="${v.id}" title="Excluir">${icon('trash')}</button>
      </td>
    </tr>`).join('') : `<tr><td colspan="8" class="empty">Nenhuma venda encontrada.</td></tr>`;
  const val = lista.filter(v => v.status !== 'Cancelado');
  $('#footVendas').innerHTML = `
    <span>${num(lista.length)} pedido${lista.length === 1 ? '' : 's'} · faturamento ${brl(sum(val, totalVenda))} (sem cancelados)</span>
    ${lista.length > vis.length ? `<button class="btn sm" data-action="mais-vendas">Mostrar mais (${lista.length - vis.length})</button>` : ''}`;
}

function formVenda(orig) {
  const v = orig || {
    data: hoje(), clienteId: '', itens: [], desconto: 0, frete: 0,
    pagamento: 'Pix', canal: 'Site', status: 'Pago', obs: '',
  };
  if (!db.produtos.length) { toast('Cadastre um produto antes de registrar vendas.', 'erro'); location.hash = 'produtos'; return; }

  const clientesOpts = db.clientes.slice().sort(byNome)
    .map(c => `<option value="${c.id}" ${c.id === v.clienteId ? 'selected' : ''}>${esc(c.nome)}</option>`).join('');

  openModal(orig ? `Editar venda #${v.numero}` : 'Nova venda', `
    <div class="form-grid three">
      <label class="span-2">Cliente
        <select name="clienteId"><option value="">Consumidor final</option>${clientesOpts}</select>
      </label>
      <label>Data<input type="date" name="data" value="${v.data}" required></label>
      <label>Canal<select name="canal">${opts(CANAIS, v.canal)}</select></label>
      <label>Pagamento<select name="pagamento">${opts(PAGAMENTOS, v.pagamento)}</select></label>
      <label>Status<select name="status">${opts(STATUS, v.status)}</select></label>
    </div>
    <div class="itens-head"><strong>Itens</strong><button type="button" class="btn sm" id="addItem">${icon('plus')} Adicionar item</button></div>
    <div class="item-labels"><span>Produto</span><span>Qtd.</span><span>Preço unit.</span><span>Subtotal</span><span></span></div>
    <div id="itens"></div>
    <div class="form-grid three" style="margin-top:14px">
      <label>Desconto (R$)<input type="number" name="desconto" min="0" step="0.01" value="${v.desconto || 0}"></label>
      <label>Frete (R$)<input type="number" name="frete" min="0" step="0.01" value="${v.frete || 0}"></label>
      <div class="total-box"><span>Total do pedido</span><strong id="vTotal">R$ 0,00</strong></div>
    </div>
    <label>Observações<textarea name="obs" rows="2" placeholder="Ex.: código de rastreio, endereço, etc.">${esc(v.obs || '')}</textarea></label>`,
  {
    wide: true,
    submitLabel: orig ? 'Salvar alterações' : 'Registrar venda',
    onSubmit: form => {
      const fd = new FormData(form);
      const itens = $$('.item-row', form).map(row => {
        const pid = $('select', row).value;
        const p = byId(db.produtos, pid);
        const antigo = v.itens.find(i => i.produtoId === pid);
        return {
          produtoId: pid,
          nome: p?.nome || antigo?.nome || 'Produto',
          qtd: Math.max(1, parseInt($('[name=qtd]', row).value, 10) || 1),
          preco: Math.max(0, parseFloat($('[name=preco]', row).value) || 0),
          custo: p ? p.custo : (antigo?.custo || 0),
        };
      }).filter(i => i.produtoId);
      if (!itens.length) { toast('Adicione pelo menos um item.', 'erro'); return false; }
      const nova = {
        ...v,
        id: orig ? orig.id : uid(),
        numero: orig ? orig.numero : db.seq,
        data: fd.get('data'), clienteId: fd.get('clienteId'),
        canal: fd.get('canal'), pagamento: fd.get('pagamento'), status: fd.get('status'),
        desconto: parseFloat(fd.get('desconto')) || 0, frete: parseFloat(fd.get('frete')) || 0,
        obs: fd.get('obs').trim(), itens,
      };
      if (!gravarVenda(orig, nova)) return false;
      if (!orig) db.seq++;
      salvar();
      toast(orig ? `Venda #${nova.numero} atualizada.` : `Venda #${nova.numero} registrada!`);
      rerender();
    },
  });

  const box = $('#itens');
  const produtosOrd = db.produtos.slice().sort(byNome);
  const calcular = () => {
    let st = 0;
    $$('.item-row', box).forEach(row => {
      const s = (parseInt($('[name=qtd]', row).value, 10) || 0) * (parseFloat($('[name=preco]', row).value) || 0);
      $('.sub-total', row).textContent = brl(s);
      st += s;
    });
    const f = $('#modalForm');
    const tot = st - (parseFloat(f.desconto.value) || 0) + (parseFloat(f.frete.value) || 0);
    $('#vTotal').textContent = brl(Math.max(0, tot));
  };
  const addRow = item => {
    const row = document.createElement('div');
    row.className = 'item-row';
    const orfao = item && !byId(db.produtos, item.produtoId);
    row.innerHTML = `
      <select aria-label="Produto" required>
        <option value="">Selecione um produto…</option>
        ${orfao ? `<option value="${item.produtoId}" selected>${esc(item.nome)} (removido)</option>` : ''}
        ${produtosOrd.map(p => `<option value="${p.id}" ${item?.produtoId === p.id ? 'selected' : ''}>${esc(p.nome)} — ${p.estoque} em estoque</option>`).join('')}
      </select>
      <input type="number" name="qtd" min="1" step="1" value="${item?.qtd || 1}" aria-label="Quantidade" required>
      <input type="number" name="preco" min="0" step="0.01" value="${item ? item.preco : ''}" aria-label="Preço unitário" required>
      <span class="sub-total">R$ 0,00</span>
      <button type="button" class="icon-btn danger" title="Remover item">${icon('x')}</button>`;
    $('select', row).addEventListener('change', e => {
      const p = byId(db.produtos, e.target.value);
      if (p) $('[name=preco]', row).value = p.preco;
      calcular();
    });
    $('button', row).addEventListener('click', () => {
      if ($$('.item-row', box).length > 1) row.remove(); else { $('select', row).value = ''; $('[name=preco]', row).value = ''; }
      calcular();
    });
    box.appendChild(row);
  };
  (v.itens.length ? v.itens : [null]).forEach(addRow);
  $('#addItem').addEventListener('click', () => { addRow(null); calcular(); $$('.item-row select', box).pop().focus(); });
  $('#modalForm').addEventListener('input', calcular);
  calcular();
}

function verVenda(id) {
  const v = byId(db.vendas, id);
  if (!v) return;
  const c = byId(db.clientes, v.clienteId);
  openModal(`Pedido #${v.numero}`, `
    <div class="detail-grid">
      <div><span>Data</span>${fmtData(v.data)}</div>
      <div><span>Status</span>${badgeStatus(v.status)}</div>
      <div><span>Canal</span>${esc(v.canal)}</div>
      <div><span>Cliente</span>${esc(nomeCliente(v.clienteId))}${c?.telefone ? `<span>${esc(c.telefone)}</span>` : ''}</div>
      <div><span>Pagamento</span>${esc(v.pagamento)}</div>
      <div><span>Lucro bruto</span>${brl(lucroVenda(v))}</div>
    </div>
    <div class="table-wrap"><table class="table">
      <thead><tr><th>Produto</th><th class="num">Qtd.</th><th class="num">Preço</th><th class="num">Subtotal</th></tr></thead>
      <tbody>${v.itens.map(i => `<tr><td>${esc(i.nome)}</td><td class="num">${i.qtd}</td><td class="num">${brl(i.preco)}</td><td class="num">${brl(i.qtd * i.preco)}</td></tr>`).join('')}</tbody>
    </table></div>
    <div class="totals">
      <div><span>Subtotal</span><span>${brl(subtotal(v))}</span></div>
      ${v.desconto ? `<div><span>Desconto</span><span>− ${brl(v.desconto)}</span></div>` : ''}
      ${v.frete ? `<div><span>Frete</span><span>${brl(v.frete)}</span></div>` : ''}
      <div class="big"><span>Total</span><span>${brl(totalVenda(v))}</span></div>
    </div>
    ${v.obs ? `<p class="hint" style="margin-top:14px"><b>Obs.:</b> ${esc(v.obs)}</p>` : ''}`,
  {
    wide: true,
    footer: `
      <button type="button" class="btn danger" data-action="excluir-venda" data-id="${v.id}">${icon('trash')} Excluir</button>
      <span style="flex:1"></span>
      <button type="button" class="btn" data-action="recibo" data-id="${v.id}">${icon('print')} Imprimir recibo</button>
      <button type="button" class="btn primary" data-action="editar-venda" data-id="${v.id}">${icon('edit')} Editar</button>`,
  });
}

function excluirVenda(id) {
  const v = byId(db.vendas, id);
  if (!v || !confirm(`Excluir a venda #${v.numero}? O estoque dos itens será devolvido.`)) return;
  aplicarEstoque(v, -1);
  db.vendas = db.vendas.filter(x => x.id !== id);
  salvar();
  closeModal();
  toast(`Venda #${v.numero} excluída.`);
  rerender();
}

function mudarStatus(id, status) {
  const v = byId(db.vendas, id);
  if (!v || v.status === status) return;
  if (gravarVenda(v, { ...v, status })) toast(`Pedido #${v.numero}: ${status}.`);
  rerender();
}

function imprimirRecibo(id) {
  const v = byId(db.vendas, id);
  if (!v) return;
  const c = byId(db.clientes, v.clienteId);
  $('#print-area').innerHTML = `
    <h2 style="margin:0">${esc(db.config.loja)}</h2>
    <p>Recibo do pedido <b>#${v.numero}</b> — ${fmtData(v.data)}</p>
    <p>Cliente: <b>${esc(nomeCliente(v.clienteId))}</b>${c?.email ? ' · ' + esc(c.email) : ''}${c?.telefone ? ' · ' + esc(c.telefone) : ''}<br>
       Pagamento: ${esc(v.pagamento)} · Canal: ${esc(v.canal)} · Status: ${esc(v.status)}</p>
    <table><thead><tr><th>Produto</th><th class="r">Qtd.</th><th class="r">Preço</th><th class="r">Subtotal</th></tr></thead>
    <tbody>${v.itens.map(i => `<tr><td>${esc(i.nome)}</td><td class="r">${i.qtd}</td><td class="r">${brl(i.preco)}</td><td class="r">${brl(i.qtd * i.preco)}</td></tr>`).join('')}</tbody></table>
    <p class="r" style="text-align:right">Subtotal: ${brl(subtotal(v))}<br>
      ${v.desconto ? `Desconto: − ${brl(v.desconto)}<br>` : ''}${v.frete ? `Frete: ${brl(v.frete)}<br>` : ''}
      <b style="font-size:18px">Total: ${brl(totalVenda(v))}</b></p>
    ${v.obs ? `<p>Obs.: ${esc(v.obs)}</p>` : ''}
    <p style="margin-top:30px;color:#666">Obrigado pela preferência!</p>`;
  closeModal();
  setTimeout(() => window.print(), 50);
}

function exportarVendasCSV(lista, nome) {
  const linhas = [['Pedido', 'Data', 'Cliente', 'Canal', 'Pagamento', 'Status', 'Itens', 'Subtotal', 'Desconto', 'Frete', 'Total', 'Lucro bruto']];
  lista.forEach(v => linhas.push([
    '#' + v.numero, fmtData(v.data), nomeCliente(v.clienteId), v.canal, v.pagamento, v.status,
    v.itens.map(i => `${i.qtd}x ${i.nome}`).join(' | '),
    subtotal(v), +v.desconto || 0, +v.frete || 0, totalVenda(v), lucroVenda(v),
  ]));
  baixar(nome, csv(linhas), 'text/csv;charset=utf-8');
}

/* ---------- Produtos ---------- */
function renderProdutos() {
  const f = ui.produtos;
  const cats = [...new Set(db.produtos.map(p => p.categoria).filter(Boolean))].sort();
  const valorEstoque = sum(db.produtos, p => p.estoque * p.custo);
  const baixo = db.produtos.filter(p => p.estoque <= p.minimo).length;
  $('#view').innerHTML = cabecalho('Produtos', 'Catálogo, preços e controle de estoque',
    `<button class="btn" data-action="csv-produtos">${icon('download')} Exportar CSV</button>
     <button class="btn primary" data-action="novo-produto">${icon('plus')} Novo produto</button>`) + `
    <div class="grid kpis">
      ${kpi('Produtos cadastrados', num(db.produtos.length))}
      ${kpi('Unidades em estoque', num(sum(db.produtos, p => p.estoque)))}
      ${kpi('Valor do estoque (custo)', brl(valorEstoque))}
      ${kpi('Com estoque baixo', num(baixo), baixo ? '<small class="delta down">precisam de reposição</small>' : '<small>tudo certo</small>')}
    </div>
    <div class="card">
      <div class="toolbar">
        <input type="search" id="pq" placeholder="Buscar por nome ou SKU…" value="${esc(f.q)}">
        <select id="pcat"><option value="">Todas as categorias</option>${opts(cats, f.cat)}</select>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Produto</th><th>Categoria</th><th class="num">Custo</th><th class="num">Preço</th><th class="num">Margem</th><th class="num">Estoque</th><th class="num">Vendidos</th><th></th></tr></thead>
          <tbody id="tbProdutos"></tbody>
        </table>
      </div>
    </div>`;
  $('#pq').addEventListener('input', e => { f.q = e.target.value; tabelaProdutos(); });
  $('#pcat').addEventListener('input', e => { f.cat = e.target.value; tabelaProdutos(); });
  tabelaProdutos();
}

function tabelaProdutos() {
  const f = ui.produtos;
  const q = f.q.trim().toLowerCase();
  const vendidos = new Map();
  db.vendas.forEach(v => { if (v.status !== 'Cancelado') v.itens.forEach(i => vendidos.set(i.produtoId, (vendidos.get(i.produtoId) || 0) + i.qtd)); });
  const lista = db.produtos.filter(p =>
    (!f.cat || p.categoria === f.cat) &&
    (!q || p.nome.toLowerCase().includes(q) || (p.sku || '').toLowerCase().includes(q))).sort(byNome);
  $('#tbProdutos').innerHTML = lista.length ? lista.map(p => `
    <tr>
      <td><span class="strong">${esc(p.nome)}</span><span class="sub">${esc(p.sku || '—')}</span></td>
      <td>${esc(p.categoria || '—')}</td>
      <td class="num">${brl(p.custo)}</td>
      <td class="num strong">${brl(p.preco)}</td>
      <td class="num">${p.preco ? pct((p.preco - p.custo) / p.preco) : '—'}</td>
      <td class="num"><span class="badge ${p.estoque <= p.minimo ? 'b-low' : 'b-ok'}" title="Mínimo: ${p.minimo}">${num(p.estoque)}</span></td>
      <td class="num">${num(vendidos.get(p.id) || 0)}</td>
      <td class="actions">
        <button class="btn sm" data-action="repor" data-id="${p.id}">Repor</button>
        <button class="icon-btn" data-action="editar-produto" data-id="${p.id}" title="Editar">${icon('edit')}</button>
        <button class="icon-btn danger" data-action="excluir-produto" data-id="${p.id}" title="Excluir">${icon('trash')}</button>
      </td>
    </tr>`).join('') : `<tr><td colspan="8" class="empty">Nenhum produto encontrado.</td></tr>`;
}

function formProduto(orig) {
  const p = orig || { nome: '', sku: '', categoria: '', custo: '', preco: '', estoque: 0, minimo: 5 };
  const cats = [...new Set(db.produtos.map(x => x.categoria).filter(Boolean))].sort();
  openModal(orig ? 'Editar produto' : 'Novo produto', `
    <div class="form-grid">
      <label class="span-2">Nome do produto<input name="nome" value="${esc(p.nome)}" required maxlength="120"></label>
      <label>SKU / código<input name="sku" value="${esc(p.sku)}" placeholder="Opcional"></label>
      <label>Categoria<input name="categoria" value="${esc(p.categoria)}" list="listaCats" placeholder="Ex.: Roupas"></label>
      <datalist id="listaCats">${cats.map(c => `<option value="${esc(c)}">`).join('')}</datalist>
      <label>Preço de custo (R$)<input type="number" name="custo" min="0" step="0.01" value="${p.custo}" required></label>
      <label>Preço de venda (R$)<input type="number" name="preco" min="0" step="0.01" value="${p.preco}" required></label>
      <label>Estoque atual<input type="number" name="estoque" step="1" value="${p.estoque}" required></label>
      <label>Estoque mínimo (alerta)<input type="number" name="minimo" min="0" step="1" value="${p.minimo}" required></label>
    </div>
    <p class="hint" id="margemHint"></p>`, {
    onSubmit: form => {
      const fd = new FormData(form);
      const dados = {
        nome: fd.get('nome').trim(), sku: fd.get('sku').trim(), categoria: fd.get('categoria').trim(),
        custo: parseFloat(fd.get('custo')) || 0, preco: parseFloat(fd.get('preco')) || 0,
        estoque: parseInt(fd.get('estoque'), 10) || 0, minimo: parseInt(fd.get('minimo'), 10) || 0,
      };
      if (orig) Object.assign(orig, dados); else db.produtos.push({ id: uid(), ...dados });
      salvar();
      toast(orig ? 'Produto atualizado.' : 'Produto cadastrado!');
      rerender();
    },
  });
  const form = $('#modalForm');
  const hint = () => {
    const c = parseFloat(form.custo.value) || 0, v = parseFloat(form.preco.value) || 0;
    $('#margemHint').textContent = v ? `Lucro por unidade: ${brl(v - c)} · margem de ${pct((v - c) / v)}` : '';
  };
  form.addEventListener('input', hint);
  hint();
}

function formRepor(id) {
  const p = byId(db.produtos, id);
  if (!p) return;
  openModal('Entrada de estoque', `
    <p style="margin-top:0"><b>${esc(p.nome)}</b><br><span class="muted">Estoque atual: ${p.estoque} un. · mínimo ${p.minimo}</span></p>
    <label>Quantidade recebida<input type="number" name="qtd" min="1" step="1" value="${Math.max(1, p.minimo * 2 - p.estoque)}" required autofocus></label>`, {
    submitLabel: 'Adicionar ao estoque',
    onSubmit: form => {
      const q = parseInt(form.qtd.value, 10) || 0;
      p.estoque += q;
      salvar();
      toast(`+${q} un. de ${p.nome}. Estoque: ${p.estoque}.`);
      rerender();
    },
  });
}

function excluirProduto(id) {
  const p = byId(db.produtos, id);
  if (!p || !confirm(`Excluir o produto "${p.nome}"? As vendas antigas continuam registradas.`)) return;
  db.produtos = db.produtos.filter(x => x.id !== id);
  salvar();
  toast('Produto excluído.');
  rerender();
}

/* ---------- Clientes ---------- */
function renderClientes() {
  const stats = estatisticasClientes();
  const ativos = [...stats.values()].filter(s => s.ultima >= addDays(hoje(), -90)).length;
  const recorrentes = [...stats.values()].filter(s => s.pedidos > 1).length;
  $('#view').innerHTML = cabecalho('Clientes', 'Sua base de compradores',
    `<button class="btn" data-action="csv-clientes">${icon('download')} Exportar CSV</button>
     <button class="btn primary" data-action="novo-cliente">${icon('plus')} Novo cliente</button>`) + `
    <div class="grid kpis">
      ${kpi('Clientes cadastrados', num(db.clientes.length))}
      ${kpi('Ativos (90 dias)', num(ativos))}
      ${kpi('Compraram mais de uma vez', num(recorrentes), `<small>${pct(db.clientes.length ? recorrentes / db.clientes.length : NaN)} da base</small>`)}
      ${kpi('Gasto médio por cliente', brl(stats.size ? sum([...stats.values()], s => s.total) / stats.size : 0))}
    </div>
    <div class="card">
      <div class="toolbar"><input type="search" id="cq" placeholder="Buscar por nome, e-mail, telefone ou cidade…" value="${esc(ui.clientes.q)}"></div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Cliente</th><th>Telefone</th><th>Cidade</th><th class="num">Pedidos</th><th class="num">Total gasto</th><th>Última compra</th><th></th></tr></thead>
          <tbody id="tbClientes"></tbody>
        </table>
      </div>
    </div>`;
  $('#cq').addEventListener('input', e => { ui.clientes.q = e.target.value; tabelaClientes(stats); });
  tabelaClientes(stats);
}

function tabelaClientes(stats) {
  const q = ui.clientes.q.trim().toLowerCase();
  const lista = db.clientes.filter(c => !q ||
    [c.nome, c.email, c.telefone, c.cidade].some(x => (x || '').toLowerCase().includes(q)))
    .sort((a, b) => (stats.get(b.id)?.total || 0) - (stats.get(a.id)?.total || 0));
  $('#tbClientes').innerHTML = lista.length ? lista.map(c => {
    const s = stats.get(c.id) || { pedidos: 0, total: 0, ultima: '' };
    return `<tr>
      <td><a href="#" class="strong" data-action="ver-cliente" data-id="${c.id}">${esc(c.nome)}</a><span class="sub">${esc(c.email || '—')}</span></td>
      <td>${esc(c.telefone || '—')}</td>
      <td>${esc(c.cidade || '—')}</td>
      <td class="num">${s.pedidos}</td>
      <td class="num strong">${brl(s.total)}</td>
      <td>${fmtData(s.ultima)}</td>
      <td class="actions">
        <button class="icon-btn" data-action="editar-cliente" data-id="${c.id}" title="Editar">${icon('edit')}</button>
        <button class="icon-btn danger" data-action="excluir-cliente" data-id="${c.id}" title="Excluir">${icon('trash')}</button>
      </td>
    </tr>`;
  }).join('') : `<tr><td colspan="7" class="empty">Nenhum cliente encontrado.</td></tr>`;
}

function formCliente(orig) {
  const c = orig || { nome: '', email: '', telefone: '', cidade: '', obs: '' };
  openModal(orig ? 'Editar cliente' : 'Novo cliente', `
    <div class="form-grid">
      <label class="span-2">Nome completo<input name="nome" value="${esc(c.nome)}" required maxlength="120"></label>
      <label>E-mail<input type="email" name="email" value="${esc(c.email)}"></label>
      <label>Telefone / WhatsApp<input name="telefone" value="${esc(c.telefone)}" placeholder="(00) 00000-0000"></label>
      <label class="span-2">Cidade/UF<input name="cidade" value="${esc(c.cidade)}" placeholder="Ex.: São Paulo/SP"></label>
      <label class="span-2">Observações<textarea name="obs" rows="2">${esc(c.obs || '')}</textarea></label>
    </div>`, {
    onSubmit: form => {
      const fd = new FormData(form);
      const dados = { nome: fd.get('nome').trim(), email: fd.get('email').trim(), telefone: fd.get('telefone').trim(), cidade: fd.get('cidade').trim(), obs: fd.get('obs').trim() };
      if (orig) Object.assign(orig, dados); else db.clientes.push({ id: uid(), ...dados });
      salvar();
      toast(orig ? 'Cliente atualizado.' : 'Cliente cadastrado!');
      rerender();
    },
  });
}

function verCliente(id) {
  const c = byId(db.clientes, id);
  if (!c) return;
  const vs = ordenarVendas(db.vendas.filter(v => v.clienteId === id));
  const r = resumo(vs.filter(v => v.status !== 'Cancelado'));
  openModal(esc(c.nome), `
    <div class="detail-grid">
      <div><span>E-mail</span>${esc(c.email || '—')}</div>
      <div><span>Telefone</span>${esc(c.telefone || '—')}</div>
      <div><span>Cidade</span>${esc(c.cidade || '—')}</div>
      <div><span>Pedidos</span>${r.pedidos}</div>
      <div><span>Total gasto</span>${brl(r.fat)}</div>
      <div><span>Ticket médio</span>${brl(r.ticket)}</div>
    </div>
    ${c.obs ? `<p class="hint"><b>Obs.:</b> ${esc(c.obs)}</p>` : ''}
    <p class="section-title">Histórico de pedidos</p>
    ${vs.length ? `<div class="table-wrap"><table class="table"><tbody>${vs.map(v => `
      <tr><td><a href="#" data-action="ver-venda" data-id="${v.id}">#${v.numero}</a></td><td>${fmtData(v.data)}</td>
      <td class="muted">${v.itens.map(i => esc(i.nome)).join(', ')}</td><td class="num">${brl(totalVenda(v))}</td><td>${badgeStatus(v.status)}</td></tr>`).join('')}
    </tbody></table></div>` : '<p class="hint">Nenhum pedido ainda.</p>'}`,
  { wide: true, footer: `<button type="button" class="btn" data-action="editar-cliente" data-id="${c.id}">${icon('edit')} Editar</button><button type="button" class="btn primary" data-close>Fechar</button>` });
}

function excluirCliente(id) {
  const c = byId(db.clientes, id);
  if (!c || !confirm(`Excluir o cliente "${c.nome}"? Os pedidos dele continuam registrados.`)) return;
  db.clientes = db.clientes.filter(x => x.id !== id);
  salvar();
  toast('Cliente excluído.');
  rerender();
}

/* ---------- Relatórios ---------- */
function intervaloRel() {
  const r = ui.rel, h = hoje(), d = parseYmd(h);
  switch (r.periodo) {
    case '7': return [addDays(h, -6), h];
    case '30': return [addDays(h, -29), h];
    case '90': return [addDays(h, -89), h];
    case 'mes': return [h.slice(0, 8) + '01', h];
    case 'mesant': {
      const ini = new Date(d.getFullYear(), d.getMonth() - 1, 1);
      return [ymd(ini), ymd(new Date(d.getFullYear(), d.getMonth(), 0))];
    }
    case 'ano': return [h.slice(0, 4) + '-01-01', h];
    default: return [r.de || h, r.ate || h];
  }
}

function renderRelatorios() {
  const r = ui.rel;
  const [de, ate] = intervaloRel();
  const vs = validas(de, ate);
  const res = resumo(vs);
  const cancel = db.vendas.filter(v => v.status === 'Cancelado' && v.data >= de && v.data <= ate);
  const dias = Math.round((parseYmd(ate) - parseYmd(de)) / 864e5) + 1;
  const serie = dias <= 62 ? serieDiaria(de, ate) : serieMensal(de, ate);
  const produtos = porProduto(vs).slice(0, 10);
  const stats = new Map();
  vs.filter(v => v.clienteId).forEach(v => {
    const s = stats.get(v.clienteId) || { id: v.clienteId, pedidos: 0, total: 0 };
    s.pedidos++; s.total += totalVenda(v); stats.set(v.clienteId, s);
  });
  const topClientes = [...stats.values()].sort((a, b) => b.total - a.total).slice(0, 8);
  const periodos = [['7', 'Últimos 7 dias'], ['30', 'Últimos 30 dias'], ['90', 'Últimos 90 dias'], ['mes', 'Este mês'], ['mesant', 'Mês passado'], ['ano', 'Este ano'], ['custom', 'Personalizado']];

  $('#view').innerHTML = cabecalho('Relatórios', `${fmtData(de)} a ${fmtData(ate)} · ${dias} dia${dias === 1 ? '' : 's'}`,
    `<select id="rper" style="width:auto">${periodos.map(([k, n]) => `<option value="${k}" ${k === r.periodo ? 'selected' : ''}>${n}</option>`).join('')}</select>
     ${r.periodo === 'custom' ? `<input type="date" id="rde" value="${de}" style="width:auto"><input type="date" id="rate" value="${ate}" style="width:auto">` : ''}
     <button class="btn" data-action="csv-relatorio">${icon('download')} Exportar CSV</button>`) + `
    <div class="grid kpis">
      ${kpi('Faturamento', brl(res.fat), `<small>${num(res.pedidos)} pedidos · ${num(res.itens)} itens</small>`)}
      ${kpi('Lucro bruto', brl(res.lucro), `<small>Margem de ${pct(res.margem)}</small>`)}
      ${kpi('Ticket médio', brl(res.ticket), `<small>${brl(res.fat / dias)} por dia em média</small>`)}
      ${kpi('Cancelamentos', num(cancel.length), `<small>${brl(sum(cancel, totalVenda))} perdidos</small>`)}
    </div>
    <div class="card" style="margin-bottom:16px">
      <h3>Faturamento <small>${dias <= 62 ? 'por dia' : 'por mês'}</small></h3>
      ${barChart(serie, 250)}
    </div>
    <div class="grid cols-3">
      <div class="card"><h3>Por categoria</h3>${hbars(porCategoria(vs), brl, sum(porCategoria(vs), x => x.value))}</div>
      <div class="card"><h3>Por canal de venda</h3>${hbars(agrupar(vs, v => v.canal), brl, res.fat)}</div>
      <div class="card"><h3>Por forma de pagamento</h3>${hbars(agrupar(vs, v => v.pagamento), brl, res.fat)}</div>
    </div>
    <div class="grid cols-2">
      <div class="card">
        <h3>Produtos mais vendidos</h3>
        ${produtos.length ? `<div class="table-wrap"><table class="table">
          <thead><tr><th>Produto</th><th class="num">Qtd.</th><th class="num">Receita</th><th class="num">Lucro</th></tr></thead>
          <tbody>${produtos.map(p => `<tr><td>${esc(p.nome)}</td><td class="num">${num(p.qtd)}</td><td class="num strong">${brl(p.receita)}</td><td class="num">${brl(p.lucro)}</td></tr>`).join('')}</tbody>
        </table></div>` : '<p class="empty">Sem vendas no período.</p>'}
      </div>
      <div class="card">
        <h3>Melhores clientes</h3>
        ${topClientes.length ? `<div class="table-wrap"><table class="table">
          <thead><tr><th>Cliente</th><th class="num">Pedidos</th><th class="num">Total</th></tr></thead>
          <tbody>${topClientes.map(s => `<tr><td><a href="#" data-action="ver-cliente" data-id="${s.id}">${esc(nomeCliente(s.id))}</a></td><td class="num">${s.pedidos}</td><td class="num strong">${brl(s.total)}</td></tr>`).join('')}</tbody>
        </table></div>` : '<p class="empty">Sem clientes identificados no período.</p>'}
      </div>
    </div>`;

  $('#rper').addEventListener('change', e => {
    if (e.target.value === 'custom') { const [a, b] = intervaloRel(); r.de = a; r.ate = b; }
    r.periodo = e.target.value; renderRelatorios();
  });
  if (r.periodo === 'custom') {
    $('#rde').addEventListener('change', e => { r.de = e.target.value; renderRelatorios(); });
    $('#rate').addEventListener('change', e => { r.ate = e.target.value; renderRelatorios(); });
  }
}

/* ---------- Configurações ---------- */
function renderConfig() {
  const c = db.config;
  $('#view').innerHTML = cabecalho('Configurações', 'Dados da loja e backup') + `
    <div class="grid cols-2">
      <form class="card" id="formConfig">
        <h3>Dados da loja</h3>
        <div class="form-grid">
          <label class="span-2">Nome da loja<input name="loja" value="${esc(c.loja)}" required maxlength="60"></label>
          <label>Meta de faturamento mensal (R$)<input type="number" name="meta" min="0" step="100" value="${c.meta || 0}"></label>
          <label>Tema<select name="tema">
            <option value="" ${!c.tema ? 'selected' : ''}>Automático (sistema)</option>
            <option value="claro" ${c.tema === 'claro' ? 'selected' : ''}>Claro</option>
            <option value="escuro" ${c.tema === 'escuro' ? 'selected' : ''}>Escuro</option>
          </select></label>
        </div>
        <button class="btn primary" type="submit">Salvar configurações</button>
      </form>
      <div class="card">
        <h3>Backup dos dados</h3>
        <p class="hint" style="margin-bottom:14px">Os dados ficam salvos neste navegador. Faça backups com frequência e use o arquivo para restaurar ou levar para outro computador.</p>
        <div class="page-actions">
          <button class="btn" data-action="backup">${icon('download')} Baixar backup (.json)</button>
          <label class="btn" style="flex-direction:row;color:var(--text)">${icon('upload')} Restaurar backup<input type="file" id="fileImport" accept=".json,application/json" hidden></label>
        </div>
        <p class="hint" style="margin-top:14px">${num(db.produtos.length)} produtos · ${num(db.clientes.length)} clientes · ${num(db.vendas.length)} vendas</p>
      </div>
    </div>
    <div class="card danger-zone">
      <h3>Zona de cuidado</h3>
      <p class="hint" style="margin-bottom:14px">Estas ações substituem todos os dados atuais. Baixe um backup antes.</p>
      <div class="page-actions">
        <button class="btn" data-action="exemplo">Carregar dados de exemplo</button>
        <button class="btn danger" data-action="zerar">${icon('trash')} Apagar tudo e começar do zero</button>
      </div>
    </div>`;

  $('#formConfig').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    db.config.loja = fd.get('loja').trim();
    db.config.meta = parseFloat(fd.get('meta')) || 0;
    db.config.tema = fd.get('tema');
    salvar(); aplicarTema();
    toast('Configurações salvas.');
    rerender();
  });
  $('#fileImport').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.produtos) || !Array.isArray(data.clientes) || !Array.isArray(data.vendas)) throw new Error();
        if (!confirm('Restaurar este backup? Os dados atuais serão substituídos.')) return;
        data.config = { loja: 'Minha Loja', meta: 0, tema: '', ...data.config };
        data.seq = data.seq || Math.max(1000, ...data.vendas.map(v => v.numero || 0)) + 1;
        db = data; salvar(); aplicarTema();
        toast('Backup restaurado!');
        rerender();
      } catch (err) { toast('Arquivo inválido. Escolha um backup gerado por este sistema.', 'erro'); }
    };
    reader.readAsText(file);
  });
}

/* ================= Modal ================= */
function openModal(titulo, corpo, { onSubmit, wide, submitLabel = 'Salvar', footer } = {}) {
  const dlg = $('#modal');
  dlg.className = wide ? 'wide' : '';
  dlg.innerHTML = `
    <form id="modalForm">
      <header class="modal-head"><h2>${titulo}</h2><button type="button" class="icon-btn" data-close title="Fechar">${icon('x')}</button></header>
      <div class="modal-body">${corpo}</div>
      <footer class="modal-foot">${footer ?? `<button type="button" class="btn" data-close>Cancelar</button><button type="submit" class="btn primary">${submitLabel}</button>`}</footer>
    </form>`;
  const form = $('#modalForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!onSubmit || onSubmit(form) !== false) closeModal();
  });
  $$('[data-close]', dlg).forEach(b => b.addEventListener('click', closeModal));
  if (!dlg.open) dlg.showModal();
  const first = $('.modal-body [autofocus], .modal-body input, .modal-body select', dlg);
  if (first) first.focus();
}

function closeModal() { const d = $('#modal'); if (d.open) d.close(); }

/* ================= Diversos ================= */
function toast(msg, tipo = '') {
  const el = document.createElement('div');
  el.className = 'toast ' + tipo;
  el.textContent = msg;
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function csv(linhas) {
  return '﻿' + linhas.map(l => l.map(c => {
    const s = typeof c === 'number' ? c.toFixed(2).replace('.', ',') : String(c ?? '');
    return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }).join(';')).join('\r\n');
}

function baixar(nome, conteudo, tipo) {
  const url = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
  const a = document.createElement('a');
  a.href = url; a.download = nome;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function aplicarTema() {
  const t = db.config.tema;
  const escuro = t === 'escuro' || (!t && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = escuro ? 'dark' : 'light';
  $('#btnTema').innerHTML = escuro ? `${icon('sun')}<span class="label">Tema claro</span>` : `${icon('moon')}<span class="label">Tema escuro</span>`;
}

/* ================= Eventos globais ================= */
const ACOES = {
  'nova-venda': () => formVenda(),
  'editar-venda': id => formVenda(byId(db.vendas, id)),
  'ver-venda': id => verVenda(id),
  'excluir-venda': id => excluirVenda(id),
  'recibo': id => imprimirRecibo(id),
  'mais-vendas': () => { ui.vendas.limite += 50; tabelaVendas(); },
  'filtrar-abertos': () => { Object.assign(ui.vendas, { q: '', status: 'Pendente', canal: '', de: '', ate: '' }); location.hash = 'vendas'; rota(); },
  'csv-vendas': () => exportarVendasCSV(vendasFiltradas(), `vendas-${hoje()}.csv`),
  'csv-relatorio': () => { const [de, ate] = intervaloRel(); exportarVendasCSV(ordenarVendas(db.vendas.filter(v => v.data >= de && v.data <= ate)), `relatorio-${de}-a-${ate}.csv`); },
  'novo-produto': () => formProduto(),
  'editar-produto': id => formProduto(byId(db.produtos, id)),
  'excluir-produto': id => excluirProduto(id),
  'repor': id => formRepor(id),
  'csv-produtos': () => baixar(`produtos-${hoje()}.csv`, csv([['Produto', 'SKU', 'Categoria', 'Custo', 'Preço', 'Estoque', 'Mínimo'],
    ...db.produtos.slice().sort(byNome).map(p => [p.nome, p.sku, p.categoria, +p.custo, +p.preco, String(p.estoque), String(p.minimo)])]), 'text/csv;charset=utf-8'),
  'novo-cliente': () => formCliente(),
  'editar-cliente': id => formCliente(byId(db.clientes, id)),
  'ver-cliente': id => verCliente(id),
  'excluir-cliente': id => excluirCliente(id),
  'csv-clientes': () => {
    const st = estatisticasClientes();
    baixar(`clientes-${hoje()}.csv`, csv([['Nome', 'E-mail', 'Telefone', 'Cidade', 'Pedidos', 'Total gasto', 'Última compra'],
      ...db.clientes.slice().sort(byNome).map(c => { const s = st.get(c.id) || { pedidos: 0, total: 0, ultima: '' }; return [c.nome, c.email, c.telefone, c.cidade, String(s.pedidos), s.total, fmtData(s.ultima)]; })]), 'text/csv;charset=utf-8');
  },
  'backup': () => baixar(`backup-gestao-vendas-${hoje()}.json`, JSON.stringify(db, null, 2), 'application/json'),
  'exemplo': () => { if (confirm('Substituir todos os dados atuais pelos dados de exemplo?')) { const tema = db.config.tema; db = dadosExemplo(); db.config.tema = tema; salvar(); toast('Dados de exemplo carregados.'); rerender(); } },
  'zerar': () => {
    if (!confirm('Apagar TODOS os produtos, clientes e vendas? Essa ação não pode ser desfeita.')) return;
    db = { config: { ...db.config }, produtos: [], clientes: [], vendas: [], seq: 1001 };
    salvar(); toast('Todos os dados foram apagados.'); rerender();
  },
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el || !ACOES[el.dataset.action]) return;
  e.preventDefault();
  ACOES[el.dataset.action](el.dataset.id);
});

document.addEventListener('change', e => {
  if (e.target.matches('select.status-select')) mudarStatus(e.target.dataset.id, e.target.value);
});

$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });

$('#btnTema').addEventListener('click', () => {
  db.config.tema = document.documentElement.dataset.theme === 'dark' ? 'claro' : 'escuro';
  salvar(); aplicarTema();
});

// Tooltip dos gráficos
const tip = $('#tooltip');
document.addEventListener('mousemove', e => {
  const t = e.target.closest?.('[data-tip]');
  if (!t) { tip.hidden = true; return; }
  tip.innerHTML = t.dataset.tip;
  tip.hidden = false;
  const r = tip.getBoundingClientRect();
  tip.style.left = Math.min(window.innerWidth - r.width - 8, e.clientX + 12) + 'px';
  tip.style.top = Math.max(8, e.clientY - r.height - 12) + 'px';
});

// Atalho: tecla N abre nova venda
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey && !$('#modal').open && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) {
    e.preventDefault(); formVenda();
  }
});

window.addEventListener('hashchange', () => { closeModal(); rota(); window.scrollTo(0, 0); });
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', aplicarTema);

aplicarTema();
salvar();
rota();
