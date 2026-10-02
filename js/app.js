/* ===================================================================
   HERENCIA · comportamiento de la página
   1) Idioma (ES / EN)   2) Efectos de scroll   3) Formulario → WhatsApp
   Sin librerías: es una página estática, fácil de publicar y de mantener.
   =================================================================== */

/* Número de WhatsApp del negocio (formato internacional, sin + ni espacios).
   Sale de la biografía de Instagram; PENDIENTE: confirmar con la clienta. */
const WHATSAPP = '573134141831'

// Variante de color de las secciones de contraste: ?tema=claro (rosa palo). Sin parámetro: vino rosado.
if (new URLSearchParams(location.search).get('tema') === 'claro') document.body.classList.add('tema-claro')

/* ---------------------------------------------------------------
   1) IDIOMA
   El español está escrito en el HTML. Aquí vive el inglés y los textos
   que se arman por código (frase animada, mensaje de WhatsApp, avisos).
   --------------------------------------------------------------- */
const EN = {
  'nav.historia': 'Story', 'nav.coleccion': 'Collection', 'nav.proceso': 'Process', 'nav.pedir': 'Order',
  'hero.sobre': '100% Colombian footwear · Made in Bogotá',
  'hero.h1': 'Tradition<br>that <em>walks</em><br>with you',
  'hero.lead': 'Leather shoes with exclusive designs. Made only to order, so your pair is yours alone.',
  'hero.cta': 'Pre-order yours', 'hero.ver': 'See designs →', 'hero.sello': 'Exclusive design · Bogotá ·',
  'cinta.1': 'Exclusive designs', 'cinta.2': '100% Colombian', 'cinta.3': 'Made to order', 'cinta.4': 'Shipping to Colombia & the USA',
  'historia.sobre': 'Our heritage',
  'col.sobre': 'The collection', 'col.h2': 'Designs that<br>never repeat', 'col.desliza': 'Scroll to see more',
  'col.pedir': 'Order this design', 'col.quiero': 'I want mine', 'col.idea': 'Tell us<br>your idea',
  'd.champan': 'Champagne', 'd.champan.t': 'Brogue · leather',
  'd.jardin': 'Garden', 'd.jardin.t': 'Floral embroidery',
  'd.rosa': 'Blush pink', 'd.rosa.t': 'Classic · leather',
  'd.marino': 'Navy', 'd.marino.t': 'Three tones',
  'd.propio': 'Yours', 'd.propio.t': 'Custom design',
  'pr.sobre': 'How it works', 'pr.h2': 'From order<br>to your feet',
  'pr.1.t': 'You choose', 'pr.1.p': 'Pick one of the designs or tell us your idea.',
  'pr.2.t': 'We confirm', 'pr.2.p': 'We talk about your size, colors and delivery date.',
  'pr.3.t': 'We craft', 'pr.3.p': 'We start making your pair: only yours, no one else will have the same.',
  'pr.4.t': 'It arrives', 'pr.4.p': 'We ship anywhere in Colombia and to the United States.',
  'pe.sobre': 'Pre-order', 'pe.h2': 'Tell us<br>which one you want',
  'pe.lead': 'Fill this in and WhatsApp opens with your message ready. We’ll reply to confirm size, colors and date.',
  'pe.diseno': 'Design', 'pe.propio': 'My own design',
  'pe.nombre': 'Your name', 'pe.nombre.ph': 'e.g. Maria',
  'pe.talla': 'Size', 'pe.talla.ph': 'e.g. US 7 / EU 37',
  'pe.nota': 'Colors or idea (optional)', 'pe.nota.ph': 'e.g. In blue with gold, for a December wedding',
  'pe.enviar': 'Send via WhatsApp',
  'pie.lema': 'Tradition that walks with you', 'pie.datos': 'Made in Bogotá · Shipping to Colombia & the USA',
  'pie.copia': '100% Colombian footwear.',
  'alt.cafe': 'Feet in blush pink leather oxford shoes next to a cup of coffee',
  'alt.jardin': 'Cream oxford with floral embroidery',
  'alt.champan': 'Cream oxford with champagne and pink details',
  'alt.rosa': 'Blush pink oxfords on white fabric with flowers',
  'alt.marino': 'Navy, light blue and white oxford',
  'alt.pedir': 'Blush pink oxfords with cream laces',
}

/* Textos que no están en el HTML. En la frase animada, lo que va entre *asteriscos* se resalta en dorado. */
const TEXTOS = {
  es: {
    palabras: 'Hay zapatos que se usan y zapatos que *se heredan*. Los nuestros nacen *por pedido*, con diseños *exclusivos*, para quedarse contigo.',
    titulo: 'Herencia · Calzado en cuero hecho en Bogotá',
    mensaje: (n, d, t, nota) => `Hola Herencia, quiero pre-ordenar un par.\nDiseño: ${d}\nTalla: ${t || 'por confirmar'}${nota ? `\nIdea/colores: ${nota}` : ''}\nMi nombre: ${n}`,
    faltaNombre: 'Escribe tu nombre para continuar.',
    abriendo: 'Abriendo WhatsApp…',
  },
  en: {
    palabras: 'Some shoes are worn, and some shoes are *handed down*. Ours are made *to order*, with *exclusive* designs, to stay with you.',
    titulo: 'Herencia · Exclusive leather shoes from Bogotá',
    mensaje: (n, d, t, nota) => `Hi Herencia, I'd like to pre-order a pair.\nDesign: ${d}\nSize: ${t || 'to be confirmed'}${nota ? `\nIdea/colors: ${nota}` : ''}\nMy name: ${n}`,
    faltaNombre: 'Please enter your name to continue.',
    abriendo: 'Opening WhatsApp…',
  },
}

/* El español original se guarda del propio HTML la primera vez, para poder volver a él. */
const ES = {}
document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-alt], [data-i18n-ph]').forEach((el) => {
  if (el.dataset.i18n) ES[el.dataset.i18n] = el.textContent
  if (el.dataset.i18nHtml) ES[el.dataset.i18nHtml] = el.innerHTML
  if (el.dataset.i18nAlt) ES[el.dataset.i18nAlt] = el.getAttribute('alt')
  if (el.dataset.i18nPh) ES[el.dataset.i18nPh] = el.getAttribute('placeholder')
})

let idioma = 'es'
const t = (clave) => (idioma === 'en' ? EN[clave] : ES[clave]) ?? ES[clave] ?? clave

function aplicarIdioma(l) {
  idioma = l
  document.documentElement.lang = l
  document.title = TEXTOS[l].titulo
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n) })
  document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml) })
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => el.setAttribute('alt', t(el.dataset.i18nAlt)))
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => el.setAttribute('placeholder', t(el.dataset.i18nPh)))
  document.querySelectorAll('.idioma [data-l]').forEach((s) => s.classList.toggle('activo', s.dataset.l === l))
  construirPalabras()
  try { localStorage.setItem('herencia-idioma', l) } catch { /* modo privado: no pasa nada */ }
}

/* Idioma inicial: el elegido antes, o el del navegador (inglés si empieza por "en"), o español. */
let inicial = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es'
try { const g = localStorage.getItem('herencia-idioma'); if (g === 'es' || g === 'en') inicial = g } catch { /* igual */ }

document.getElementById('idioma').addEventListener('click', () => aplicarIdioma(idioma === 'es' ? 'en' : 'es'))

/* ---------------------------------------------------------------
   2) EFECTOS DE SCROLL
   --------------------------------------------------------------- */
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches
const escritorio = () => innerWidth > 900 && !reducido
const clamp01 = (x) => Math.min(1, Math.max(0, x))

// Aparición suave de los bloques al entrar en pantalla
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('ok'); io.unobserve(e.target) } }), { threshold: 0.15 })
document.querySelectorAll('.rev').forEach((el) => io.observe(el))

// Frase de la historia: cada palabra se «enciende» a medida que se baja
const frase = document.getElementById('palabras')
let palabras = []
function construirPalabras() {
  frase.innerHTML = ''
  palabras = []
  let resaltar = false
  TEXTOS[idioma].palabras.split('*').forEach((trozo, i) => {
    resaltar = i % 2 === 1
    trozo.split(/(\s+)/).forEach((w) => {
      if (!w) return
      if (/^\s+$/.test(w)) { frase.append(' '); return }
      const s = document.createElement('span')
      s.textContent = w
      if (resaltar) s.className = 'oro'
      frase.append(s); palabras.push(s)
    })
  })
  actualizar()
}

const historia = document.getElementById('historia')
const pin = document.getElementById('pin')
const riel = document.getElementById('riel')
const barra = document.getElementById('barra')
const pasos = document.getElementById('pasos')
const cab = document.getElementById('cab')

/* Galería: el alto de las fotos se calcula con lo que REALMENTE ocupa lo demás (título, nombre, botón y barra),
   así todo cabe en el alto de la pantalla sin importar el ancho, el idioma ni la letra. */
const sticky = document.querySelector('.pin-sticky')
function ajustarAlto() {
  const cs = getComputedStyle(sticky)
  const gap = parseFloat(cs.rowGap) || 0
  const rest = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
  const cabH = sticky.querySelector('.col-cab').offsetHeight
  const p = riel.querySelector('.pieza')
  const textoH = p.querySelector('.leyenda').offsetHeight + p.querySelector('.elegir').offsetHeight + 10
  const barraH = barra.parentElement.offsetHeight
  const libre = innerHeight - rest - cabH - textoH - barraH - gap * 2 - 16
  sticky.style.setProperty('--alto', `${Math.round(Math.min(560, Math.max(170, libre)))}px`)
}

function actualizar() {
  const vh = innerHeight
  const y = scrollY

  // Encabezado: fondo al bajar; texto claro mientras está sobre la sección oscura
  cab.classList.toggle('fondo', y > 40)
  const rh = historia.getBoundingClientRect()
  const sobreOscuro = [...document.querySelectorAll('.historia, .pie')].some((s) => { const r = s.getBoundingClientRect(); return r.top < 50 && r.bottom > 50 })
  cab.classList.toggle('sobre-oscuro', sobreOscuro)

  // Parallax suave en las fotos marcadas con data-par
  if (!reducido) {
    document.querySelectorAll('[data-par]').forEach((img) => {
      const r = img.parentElement.getBoundingClientRect()
      if (r.bottom < -100 || r.top > vh + 100) return
      const centro = r.top + r.height / 2 - vh / 2
      img.style.transform = `translateY(${(-centro * parseFloat(img.dataset.par)).toFixed(1)}px)`
    })
  }

  // Palabras que se encienden
  const p = clamp01((vh * 0.85 - rh.top) / (rh.height * 0.62))
  const n = Math.round(p * palabras.length)
  palabras.forEach((s, i) => s.classList.toggle('on', i < n))

  // Galería horizontal: el scroll vertical la desplaza hacia el lado
  if (escritorio()) {
    ajustarAlto()
    const recorrido = riel.scrollWidth - innerWidth + parseFloat(getComputedStyle(riel).paddingRight)
    pin.style.height = `${recorrido + vh}px`
    const r = pin.getBoundingClientRect()
    const prog = clamp01(-r.top / (pin.offsetHeight - vh))
    riel.style.transform = `translateX(${(-prog * recorrido).toFixed(1)}px)`
    barra.style.transform = `scaleX(${prog.toFixed(3)})`
  } else {
    pin.style.height = ''
    riel.style.transform = ''
  }

}

let esperando = false
addEventListener('scroll', () => { if (!esperando) { esperando = true; requestAnimationFrame(() => { actualizar(); esperando = false }) } }, { passive: true })
addEventListener('resize', actualizar)

/* ---------------------------------------------------------------
   3) FORMULARIO → WHATSAPP
   --------------------------------------------------------------- */
const form = document.getElementById('form')
const aviso = document.getElementById('aviso')
const selDiseno = document.getElementById('f-diseno')

// «Pedir este diseño» en cada pieza: elige el diseño en el formulario y baja hasta él
document.querySelectorAll('.elegir').forEach((b) => b.addEventListener('click', () => {
  selDiseno.value = b.dataset.diseno
  document.getElementById('pedir').scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' })
  setTimeout(() => document.getElementById('f-nombre').focus({ preventScroll: true }), 700)
}))

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const nombre = document.getElementById('f-nombre').value.trim()
  if (!nombre) { aviso.textContent = TEXTOS[idioma].faltaNombre; document.getElementById('f-nombre').focus(); return }
  const diseno = selDiseno.options[selDiseno.selectedIndex].textContent
  const talla = document.getElementById('f-talla').value.trim()
  const nota = document.getElementById('f-nota').value.trim()
  const texto = TEXTOS[idioma].mensaje(nombre, diseno, talla, nota)
  aviso.textContent = TEXTOS[idioma].abriendo
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener')
})

/* ---------------------------------------------------------------
   Arranque
   --------------------------------------------------------------- */
document.getElementById('anio').textContent = new Date().getFullYear()
aplicarIdioma(inicial)
actualizar()
addEventListener('load', actualizar)
if (document.fonts) document.fonts.ready.then(actualizar)
