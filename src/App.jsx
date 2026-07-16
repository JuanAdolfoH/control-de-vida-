import React, { useState, useEffect } from 'react';

// Constantes globales
const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const SUGERENCIAS_MENU = [
  { desayuno: "Claras con espinacas y avena", comida: "Pechuga de pollo con quinoa y brócoli", cena: "Ensalada de atún con aguacate" },
  { desayuno: "Licuado de proteína con plátano", comida: "Filete de pescado con arroz integral", cena: "Tacos de lechuga con pavo molido" },
  { desayuno: "Huevos revueltos con champiñones", comida: "Salmón a la plancha con espárragos", cena: "Queso cottage con almendras y fresas" }
];

const FRASES_MOTIVACIONALES = [
  "El único modo de hacer un gran trabajo es amar lo que haces.",
  "La disciplina tarde o temprano vencerá a la inteligencia.",
  "No te detengas cuando estés cansado, detente cuando hayas terminado.",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día."
];

// Estilos tácticos estilo "Cyberpunk/Nord" oscuros
const styles = {
  container: {
    backgroundColor: '#02040a',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    minHeight: '100vh',
    padding: '20px',
    position: 'relative',
    overflowX: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '20px',
  },
  clockText: {
    fontSize: '11px',
    color: '#64748b',
    letterSpacing: '1.5px',
    marginBottom: '8px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    margin: '0 0 6px 0',
    background: 'linear-gradient(to right, #00b4d8, #00f5d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    margin: 0,
    fontSize: '12px',
    color: '#00b4d8',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  quoteCard: {
    backgroundColor: '#090d16bc',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '15px',
    textAlign: 'center',
    marginBottom: '25px',
  },
  quoteText: {
    margin: 0,
    fontStyle: 'italic',
    fontSize: '12px',
    color: '#94a3b8',
  },
  dashRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '25px',
  },
  dashCard: {
    backgroundColor: '#060b19bc',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
  },
  dashLabel: {
    fontSize: '10px',
    color: '#64748b',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '4px',
  },
  dashVal: {
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '8px',
    marginBottom: '25px',
  },
  button: {
    flex: 1,
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    color: '#94a3b8',
    padding: '12px 6px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  activeButton: {
    flex: 1,
    backgroundColor: '#00b4d815',
    border: '1px solid #00b4d8',
    color: '#00b4d8',
    padding: '12px 6px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
  },
  main: {
    maxWidth: '650px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#060b19bc',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
    backdropFilter: 'blur(8px)',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#f8fafc',
    marginBottom: '20px',
    borderLeft: '3px solid #00b4d8',
    paddingLeft: '10px',
  },
  resetBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  progressBlock: {
    marginBottom: '18px',
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginBottom: '6px',
  },
  progressBarBg: {
    backgroundColor: '#1e293b',
    height: '8px',
    borderRadius: '999px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressBarFill: {
    backgroundColor: '#00b4d8',
    height: '100%',
    borderRadius: '999px',
    transition: 'width 0.4s ease-out',
  },
  actionBtn: {
    backgroundColor: '#00b4d812',
    border: '1px solid #00b4d833',
    color: '#00b4d8',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    backgroundColor: '#090d16',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '10px',
    color: '#fff',
    fontSize: '13px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    backgroundColor: '#090d16',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '10px',
    color: '#fff',
    fontSize: '13px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#00b4d8',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    color: '#02040a',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '13px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    marginBottom: '8px',
    backgroundColor: '#02040a',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
  },
  weekRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  weekDayBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px',
    borderRadius: '6px',
  },
  weekDayName: {
    fontSize: '9px',
    color: '#64748b',
    marginBottom: '4px',
  },
  weekDayCircle: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  calcGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '10px',
  },
  calcOutput: {
    backgroundColor: '#02040a',
    border: '1px solid #00f5d440',
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
    marginTop: '15px',
  },
  badgeGasto: {
    backgroundColor: '#ef444415',
    color: '#ef4444',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  badgeIngreso: {
    backgroundColor: '#4ade8015',
    color: '#4ade80',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  pomoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0',
  },
  pomoTime: {
    fontSize: '48px',
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    marginBottom: '15px',
  },
  pomoBtnGroup: {
    display: 'flex',
    gap: '10px',
  },
  fileLabel: {
    display: 'block',
    backgroundColor: '#00b4d80d',
    border: '1px dashed #00b4d844',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '11px',
    color: '#00b4d8',
    marginBottom: '10px',
  },
  openPdfBtn: {
    backgroundColor: '#00b4d820',
    border: '1px solid #00b4d850',
    color: '#00b4d8',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  bookItem: {
    border: '1px solid #1e293b',
    borderRadius: '10px',
    padding: '14px',
    marginBottom: '10px',
    backgroundColor: '#02040a',
  },
  chartBarGroup: {
    marginBottom: '14px',
  },
  chartLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    marginBottom: '4px',
    color: '#94a3b8',
  },
  victoriasGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
  },
  victoriaInput: {
    width: '100%',
    backgroundColor: '#02040a',
    border: 'none',
    borderBottom: '1px solid #1e293b',
    padding: '8px',
    color: '#00f5d4',
    fontSize: '12px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    height: '100px',
    backgroundColor: '#02040a',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '10px',
    color: '#fff',
    fontSize: '12px',
    resize: 'none',
    boxSizing: 'border-box',
  },
  menuBox: {
    backgroundColor: '#02040a',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '12px',
    lineHeight: '1.6',
  },
  menuItem: {
    marginBottom: '8px',
    color: '#e2e8f0',
  },
  menuTag: {
    color: '#00b4d8',
    fontWeight: '700',
    marginRight: '6px',
  }
};

function App() {
  // Inicialización de estado local con persistencia automática en LocalStorage
  const [appData, setAppData] = useState(() => {
    const saved = localStorage.getItem('comandoTacticoAppData');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      fitness: {
        aguaVasos: 0,
        caminataMinutos: 0,
        comidaLimpia: false,
        rachaDias: 0,
        ultimaRachaFecha: '',
        registrosSemanales: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
        historialAgua: [0, 0, 0, 0, 0, 0, 0],
        historialCaminata: [0, 0, 0, 0, 0, 0, 0],
        historialPeso: [],
        pesoActual: ''
      },
      victoriasDia: ['', '', ''],
      finanzas: {
        gastos: [],
        ingresos: [],
        limitePresupuesto: 5000
      },
      filamentos: [],
      ahorroInversion: { meta: 2000, actual: 0, concepto: 'Comprar Extrusor Directo', pctRetencion: 15 },
      colaImpresion: [],
      mantenimiento3D: { horasUsoAcumuladas: 0, ejesXyLubricado: 0, tornillosCamaAjustados: 0, boquillaLimpia: 0 },
      crecimiento: { cursos: [], lecturas: [] },
      notasRapidas: ''
    };
  });

  // Efecto para sincronizar el estado completo con el almacenamiento del navegador
  useEffect(() => {
    localStorage.setItem('comandoTacticoAppData', JSON.stringify(appData));
  }, [appData]);

  // Estados del Pomodoro e interfaz básica
  const [tab, setTab] = useState('fitness');
  const [tiempoActual, setTiempoActual] = useState(new Date());
  const [fraseDia] = useState(() => FRASES_MOTIVACIONALES[Math.floor(Math.random() * FRASES_MOTIVACIONALES.length)]);
  const [sugerenciaDia, setSugerenciaDia] = useState(() => SUGERENCIAS_MENU[0]);
  const [inputPeso, setInputPeso] = useState('');
  const [limiteInput, setLimiteInput] = useState('');
  
  // Pomodoro
  const [pomoSegundos, setPomoSegundos] = useState(1500); // 25 min
  const [pomoActivo, setPomoActivo] = useState(false);

  // Formulario Finanzas
  const [finanzasForm, setFinanzasForm] = useState({ concepto: '', monto: '', tipo: 'gasto', categoria: 'Otros', rolloAsociadoId: '' });
  const [ahorroForm, setAhorroForm] = useState({ concepto: '', meta: '', pctRetencion: '' });
  const [nuevoFilamento, setNuevoFilamento] = useState({ nombre: '', color: 'Negro', gramos: '1000', precio: '400' });

  // Calculadora 3D
  const [calc3D, setCalc3D] = useState({ nombrePieza: '', rolloSeleccionadoId: '', precioRollo: '400', gramosRollo: '1000', gramosPieza: '50', horasImpresion: '5', costoHoraLuz: '1.5', porcentajeGanancia: '150' });

  // Cola Impresión 3D
  const [nuevoTrabajo, setNuevoTrabajo] = useState({ pieza: '', prioridad: 'Media', horasEstimadas: '4', fechaLimite: '' });

  // Crecimiento
  const [crecimientoForm, setCrecimientoForm] = useState({ nombre: '', tipo: 'curso', paginasTotales: '10' });
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrlMap, setPdfUrlMap] = useState({});

  // Reloj de tiempo real
  useEffect(() => {
    const timer = setInterval(() => setTiempoActual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Timer Pomodoro
  useEffect(() => {
    let interval = null;
    if (pomoActivo && pomoSegundos > 0) {
      interval = setInterval(() => {
        setPomoSegundos(prev => prev - 1);
      }, 1000);
    } else if (pomoSegundos === 0) {
      setPomoActivo(false);
      alert("🎯 ¡Pomodoro Terminado! Tómate un respiro, Comandante.");
    }
    return () => clearInterval(interval);
  }, [pomoActivo, pomoSegundos]);

  const formatoPomo = () => {
    const mins = Math.floor(pomoSegundos / 60);
    const secs = pomoSegundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const obtenerSaludo = () => {
    const hrs = tiempoActual.getHours();
    if (hrs < 12) return 'Buenos Días, Comandante';
    if (hrs < 18) return 'Buenas Tardes, Comandante';
    return 'Buenas Noches, Comandante';
  };

  const generarMenuSano = () => {
    const rdn = SUGERENCIAS_MENU[Math.floor(Math.random() * SUGERENCIAS_MENU.length)];
    setSugerenciaDia(rdn);
  };

  // Lógica Física / Hábitos
  const agregarAgua = () => {
    setAppData(prev => {
      const actual = (prev.fitness?.aguaVasos || 0) + 1;
      const hist = [...(prev.fitness?.historialAgua || [0,0,0,0,0,0,0])];
      const hoyIndex = new Date().getDay();
      hist[hoyIndex] = parseFloat((actual * 0.3).toFixed(1));
      return { ...prev, fitness: { ...prev.fitness, aguaVasos: actual, historialAgua: hist } };
    });
  };

  const agregarCaminata = () => {
    setAppData(prev => {
      const actual = (prev.fitness?.caminataMinutos || 0) + 15;
      const hist = [...(prev.fitness?.historialCaminata || [0,0,0,0,0,0,0])];
      const hoyIndex = new Date().getDay();
      hist[hoyIndex] = actual;
      return { ...prev, fitness: { ...prev.fitness, caminataMinutos: actual, historialCaminata: hist } };
    });
  };

  const toggleComida = () => {
    setAppData(prev => {
      const nuevaComidaLimpia = !prev.fitness?.comidaLimpia;
      let rachaActual = prev.fitness?.rachaDias || 0;
      const hoyStr = new Date().toLocaleDateString();
      let ultimaFecha = prev.fitness?.ultimaRachaFecha || '';
      const hoyIndex = new Date().getDay(); 
      const registrosActuales = prev.fitness?.registrosSemanales || {0:false,1:false,2:false,3:false,4:false,5:false,6:false};

      if (nuevaComidaLimpia && (prev.fitness?.aguaVasos >= 10) && (prev.fitness?.caminataMinutos >= 45) && ultimaFecha !== hoyStr) {
        rachaActual += 1;
        ultimaFecha = hoyStr;
        registrosActuales[hoyIndex] = true;
      } else if (!nuevaComidaLimpia) {
        registrosActuales[hoyIndex] = false;
      }

      return { ...prev, fitness: { ...prev.fitness, comidaLimpia: nuevaComidaLimpia, rachaDias: rachaActual, ultimaRachaFecha: ultimaFecha, registrosSemanales: registrosActuales } };
    });
  };

  const reiniciarHabitos = () => setAppData(prev => ({ ...prev, fitness: { ...prev.fitness, aguaVasos: 0, caminataMinutos: 0, comidaLimpia: false } }));
  
  const agregarPeso = (e) => {
    e.preventDefault(); if (!inputPeso) return;
    const nuevo = { fecha: new Date().toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }), peso: parseFloat(inputPeso) };
    setAppData(prev => ({ ...prev, fitness: { ...prev.fitness, pesoActual: inputPeso, historialPeso: [nuevo, ...(prev.fitness?.historialPeso || [])].slice(0, 3) } }));
    setInputPeso('');
  };

  const manejarCambioVictoria = (index, valor) => {
    setAppData(prev => {
      const copiaVictorias = [...(prev.victoriasDia || ['', '', ''])];
      copiaVictorias[index] = valor;
      return { ...prev, victoriasDia: copiaVictorias };
    });
  };

  // Finanzas, Resta de filamento y Ahorro
  const agregarTransaccion = (e) => {
    if (e) e.preventDefault(); 
    if (!finanzasForm.concepto || !finanzasForm.monto) return;
    const montoNum = parseFloat(finanzasForm.monto);
    
    let montoAhorrado = 0;
    if (finanzasForm.tipo === 'ingreso' && finanzasForm.concepto.includes('Impresión 3D')) {
      const pct = (appData.ahorroInversion?.pctRetencion || 15) / 100;
      montoAhorrado = Math.round(montoNum * pct);
    }

    const nueva = { 
      id: Date.now(), 
      concepto: finanzasForm.concepto, 
      monto: montoNum, 
      categoria: finanzasForm.categoria, 
      fecha: new Date().toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }) 
    };

    setAppData(prev => {
      let filamentosModificados = [...(prev.filamentos || [])];
      if (finanzasForm.rolloAsociadoId) {
        filamentosModificados = filamentosModificados.map(f => {
          if (f.id.toString() === finanzasForm.rolloAsociadoId.toString()) {
            const nuevosGramos = Math.max(f.gramosActuales - (parseFloat(calc3D.gramosPieza) || 0), 0);
            if (nuevosGramos < 100) {
              alert(`⚠️ Alerta: Al rollo "${f.nombre}" le quedan solo ${nuevosGramos.toFixed(0)}g.`);
            }
            return { ...f, gramosActuales: nuevosGramos };
          }
          return f;
        });
      }

      const ahorroActualizado = {
        ...(prev.ahorroInversion || { meta: 2000, actual: 0, concepto: 'Comprar Extrusor Directo', pctRetencion: 15 }),
        actual: Math.min((prev.ahorroInversion?.actual || 0) + montoAhorrado, prev.ahorroInversion?.meta || 2000)
      };

      return {
        ...prev,
        filamentos: filamentosModificados,
        ahorroInversion: ahorroActualizado,
        finanzas: {
          ...prev.finanzas,
          gastos: finanzasForm.tipo === 'gasto' ? [nueva, ...(prev.finanzas?.gastos || [])] : (prev.finanzas?.gastos || []),
          ingresos: finanzasForm.tipo === 'ingreso' ? [nueva, ...(prev.finanzas?.ingresos || [])] : (prev.finanzas?.ingresos || [])
        }
      };
    });

    setFinanzasForm({ concepto: '', monto: '', tipo: 'gasto', categoria: 'Otros', rolloAsociadoId: '' });
  };

  // Cálculo Sugerido 3D
  let costoFilamentoUsado = 0;
  if (calc3D.rolloSeleccionadoId) {
    const rollo = (appData.filamentos || []).find(f => f.id.toString() === calc3D.rolloSeleccionadoId.toString());
    if (rollo) {
      costoFilamentoUsado = (rollo.precio / rollo.gramosOriginales) * parseFloat(calc3D.gramosPieza || 0);
    }
  } else {
    costoFilamentoUsado = (parseFloat(calc3D.precioRollo || 400) / parseFloat(calc3D.gramosRollo || 1000)) * parseFloat(calc3D.gramosPieza || 0);
  }
  const costoLuzUsado = parseFloat(calc3D.horasImpresion || 0) * parseFloat(calc3D.costoHoraLuz || 1.5);
  const costoTotalBase = costoFilamentoUsado + costoLuzUsado;
  const precioSugerido3D = Math.round(costoTotalBase * (1 + (parseFloat(calc3D.porcentajeGanancia || 150) / 100)));

  const inyectarCotizacionAIngreso = () => {
    const nombre = calc3D.nombrePieza.trim() || 'Pieza';
    setFinanzasForm({
      concepto: `Venta Impresión 3D: ${nombre}`,
      monto: precioSugerido3D,
      tipo: 'ingreso',
      categoria: 'Otros',
      rolloAsociadoId: calc3D.rolloSeleccionadoId
    });
    window.scrollTo({ top: 750, behavior: 'smooth' });
  };

  const actualizarLimite = (e) => {
    e.preventDefault();
    setAppData(prev => ({ ...prev, finanzas: { ...prev.finanzas, limitePresupuesto: parseFloat(limiteInput) || 0 } }));
  };

  const eliminarTransaccion = (id, tipo) => {
    setAppData(prev => ({ ...prev, finanzas: { ...prev.finanzas, [tipo]: (prev.finanzas?.[tipo] || []).filter(item => item.id !== id) } }));
  };

  // Gestión de Filamentos
  const registrarFilamento = (e) => {
    e.preventDefault();
    if (!nuevoFilamento.nombre) return;
    const nuevo = {
      id: Date.now(),
      nombre: nuevoFilamento.nombre,
      color: nuevoFilamento.color,
      gramosOriginales: parseFloat(nuevoFilamento.gramos),
      gramosActuales: parseFloat(nuevoFilamento.gramos),
      precio: parseFloat(nuevoFilamento.precio)
    };
    setAppData(prev => ({ ...prev, filamentos: [nuevo, ...(prev.filamentos || [])] }));
    setNuevoFilamento({ nombre: '', color: 'Negro', gramos: '1000', precio: '400' });
  };

  const eliminarFilamento = (id) => {
    setAppData(prev => ({ ...prev, filamentos: (prev.filamentos || []).filter(f => f.id !== id) }));
  };

  // Gestión de la Cola de Impresión & Mantenimiento Sincronizado
  const agregarTrabajoCola = (e) => {
    e.preventDefault();
    if (!nuevoTrabajo.pieza) return;
    const nuevo = {
      id: Date.now(),
      pieza: nuevoTrabajo.pieza,
      prioridad: nuevoTrabajo.prioridad,
      horasEstimadas: parseFloat(nuevoTrabajo.horasEstimadas) || 4,
      fechaLimite: nuevoTrabajo.fechaLimite || '',
      estado: 'Pendiente'
    };
    setAppData(prev => ({ ...prev, colaImpresion: [...(prev.colaImpresion || []), nuevo] }));
    setNuevoTrabajo({ pieza: '', prioridad: 'Media', horasEstimadas: '4', fechaLimite: '' });
  };

  const actualizarEstadoTrabajo = (id, nuevoEstado) => {
    setAppData(prev => {
      const colaModificada = (prev.colaImpresion || []).map(t => {
        if (t.id === id) {
          return { ...t, estado: nuevoEstado };
        }
        return t;
      });

      // Si el trabajo se marca como Terminado, sumar sus horas al mantenimiento
      let mantenimientoModificado = { ...(prev.mantenimiento3D || { horasUsoAcumuladas: 0, ejesXyLubricado: 0, tornillosCamaAjustados: 0, boquillaLimpia: 0 }) };
      const trabajoOriginal = (prev.colaImpresion || []).find(t => t.id === id);

      if (nuevoEstado === 'Terminado' && trabajoOriginal && trabajoOriginal.estado !== 'Terminado') {
        const hrs = trabajoOriginal.horasEstimadas || 4;
        mantenimientoModificado.horasUsoAcumuladas += hrs;
        mantenimientoModificado.ejesXyLubricado += hrs;
        mantenimientoModificado.tornillosCamaAjustados += hrs;
        mantenimientoModificado.boquillaLimpia += hrs;
      }

      return {
        ...prev,
        colaImpresion: colaModificada,
        mantenimiento3D: mantenimientoModificado
      };
    });
  };

  const reiniciarMantenimiento = (tipo) => {
    setAppData(prev => {
      const mantenimientoModificado = { ...(prev.mantenimiento3D || { horasUsoAcumuladas: 0, ejesXyLubricado: 0, tornillosCamaAjustados: 0, boquillaLimpia: 0 }) };
      if (tipo === 'lubricado') mantenimientoModificado.ejesXyLubricado = 0;
      if (tipo === 'ajustado') mantenimientoModificado.tornillosCamaAjustados = 0;
      if (tipo === 'limpia') mantenimientoModificado.boquillaLimpia = 0;
      return { ...prev, mantenimiento3D: mantenimientoModificado };
    });
  };

  const eliminarTrabajoCola = (id) => {
    setAppData(prev => ({ ...prev, colaImpresion: (prev.colaImpresion || []).filter(t => t.id !== id) }));
  };

  // Configurar Fondo de Ahorro
  const actualizarAhorroConfig = (e) => {
    e.preventDefault();
    setAppData(prev => ({
      ...prev,
      ahorroInversion: {
        ...(prev.ahorroInversion || { meta: 2000, actual: 0, concepto: 'Extrusor Directo', pctRetencion: 15 }),
        meta: parseFloat(ahorroForm.meta) || 2000,
        concepto: ahorroForm.concepto || 'Nueva Herramienta',
        pctRetencion: parseFloat(ahorroForm.pctRetencion) || 15
      }
    }));
    alert("🎯 Configuración de ahorro guardada con éxito.");
  };

  // Proyección Financiera Inteligente
  const calcularProyeccion = () => {
    const faltante = Math.max((appData.ahorroInversion?.meta || 2000) - (appData.ahorroInversion?.actual || 0), 0);
    if (faltante === 0) return "¡Meta alcanzada! Listos para ordenar.";
    
    // Obtener promedio de ingresos de impresión 3D
    const ingresos3D = (appData.finanzas?.ingresos || []).filter(i => i.concepto.includes("Impresión 3D"));
    const totalVentas3D = ingresos3D.reduce((acc, curr) => acc + curr.monto, 0);
    
    if (ingresos3D.length === 0) {
      return `Te faltan $${faltante} para tu meta. Registra tu primer pedido para proyectar tu ritmo de trabajo.`;
    }

    const promedioVenta = totalVentas3D / ingresos3D.length;
    const pctAhorroPorProyecto = promedioVenta * ((appData.ahorroInversion?.pctRetencion || 15) / 100);
    const proyectosFaltantes = Math.ceil(faltante / pctAhorroPorProyecto);

    return `Te faltan $${faltante} MXN. Con tu promedio de venta actual ($${Math.round(promedioVenta)}), necesitas entregar aprox. ${proyectosFaltantes} proyectos para financiar tu meta.`;
  };

  // Crecimiento y Universidad
  const manejarCambioNotas = (e) => {
    const texto = e.target.value;
    setAppData(prev => ({ ...prev, notasRapidas: texto }));
  };

  const manejarCargaPdf = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.type === "application/pdf") {
      setPdfFile(archivo);
      setCrecimientoForm(prev => ({ ...prev, nombre: archivo.name.replace(".pdf", "") }));
    }
  };

  const agregarCrecimiento = (e) => {
    e.preventDefault(); 
    if (!crecimientoForm.nombre) return;
    
    const idUnico = Date.now();
    if (pdfFile) {
      const blobUrl = URL.createObjectURL(pdfFile);
      setPdfUrlMap(prev => ({ ...prev, [idUnico]: blobUrl }));
    }

    // Si es curso tomamos el input de paginasTotales como las clases. Si está vacío ponemos 10 por defecto.
    const clasesTotales = crecimientoForm.tipo === 'curso' 
      ? (parseInt(crecimientoForm.paginasTotales) || 10) 
      : (parseInt(crecimientoForm.paginasTotales) || 100);

    const nuevoItem = { 
      id: idUnico, 
      nombre: crecimientoForm.nombre, 
      completado: false, 
      paginaActual: 0, 
      paginasTotales: clasesTotales, 
      tieneArchivo: !!pdfFile 
    };

    setAppData(prev => {
      const crec = prev.crecimiento || { cursos: [], lecturas: [] };
      return { 
        ...prev, 
        crecimiento: { 
          ...crec, 
          cursos: crecimientoForm.tipo === 'curso' ? [...(crec.cursos || []), nuevoItem] : (crec.cursos || []), 
          lecturas: crecimientoForm.tipo === 'libro' ? [...(crec.lecturas || []), nuevoItem] : (crec.lecturas || []) 
        } 
      };
    });

    setCrecimientoForm({ nombre: '', tipo: 'curso', paginasTotales: '10' });
    setPdfFile(null);
  };

  const avanzarPaginas = (id, paginasASumar) => {
    setAppData(prev => {
      const lecturasActualizadas = (prev.crecimiento?.lecturas || []).map(libro => {
        if (libro.id === id) {
          const nuevaPag = Math.min(libro.paginaActual + paginasASumar, libro.paginasTotales);
          return { ...libro, paginaActual: nuevaPag, completado: nuevaPag === libro.paginasTotales };
        }
        return libro;
      });
      return { ...prev, crecimiento: { ...(prev.crecimiento || { cursos: [], lecturas: [] }), lecturas: lecturasActualizadas } };
    });
  };

  const avanzarLeccionCurso = (id, paso) => {
    setAppData(prev => {
      const cursosActualizados = (prev.crecimiento?.cursos || []).map(curso => {
        if (curso.id === id) {
          const actual = curso.paginaActual || 0;
          const total = curso.paginasTotales || 10;
          const nuevaClase = Math.max(0, Math.min(actual + paso, total));
          return { 
            ...curso, 
            paginaActual: nuevaClase, 
            completado: nuevaClase === total 
          };
        }
        return curso;
      });
      return { 
        ...prev, 
        crecimiento: { 
          ...(prev.crecimiento || { cursos: [], lecturas: [] }), 
          cursos: cursosActualizados 
        } 
      };
    });
  };

  const eliminarMenteItem = (id, tipo) => {
    const propiedad = tipo === 'curso' ? 'cursos' : 'lecturas';
    setAppData(prev => ({ ...prev, crecimiento: { ...prev.crecimiento, [propiedad]: (prev.crecimiento?.[propiedad] || []).filter(item => item.id !== id) } }));
  };

  // Balance y Totales
  const totalIngresos = (appData.finanzas?.ingresos || []).reduce((acc, curr) => acc + curr.monto, 0);
  const totalGastos = (appData.finanzas?.gastos || []).reduce((acc, curr) => acc + curr.monto, 0);
  const balance = totalIngresos - totalGastos;
  
  const totalLibrosPendientes = (appData.crecimiento?.lecturas || []).filter(l => !l.completado).length;
  const totalMateriasPendientes = (appData.crecimiento?.cursos || []).filter(c => !c.completado).length;
  
  const porcentajePresupuesto = Math.min((totalGastos / (appData.finanzas?.limitePresupuesto || 5000)) * 100, 100);
  const alertaPresupuesto = porcentajePresupuesto >= 80;

  const BlacklistCategorias = { Comida: 0, Estudios: 0, Transporte: 0, Ocio: 0, Otros: 0 };
  (appData.finanzas?.gastos || []).forEach(g => {
    const cat = g.categoria || 'Otros';
    if (BlacklistCategorias[cat] !== undefined) BlacklistCategorias[cat] += g.monto;
  });

  // Ordenamiento de la cola de impresión: Prioridad + Proximidad de Fecha Límite
  const colaOrdenada = [...(appData.colaImpresion || [])].sort((a, b) => {
    if (a.estado === 'Terminado' && b.estado !== 'Terminado') return 1;
    if (a.estado !== 'Terminado' && b.estado === 'Terminado') return -1;
    if (a.fechaLimite && !b.fechaLimite) return -1;
    if (!a.fechaLimite && b.fechaLimite) return 1;
    if (a.fechaLimite && b.fechaLimite) {
      return new Date(a.fechaLimite) - new Date(b.fechaLimite);
    }
    const prioridades = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
    return prioridades[b.prioridad] - prioridades[a.prioridad];
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.clockText}>
          {tiempoActual.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase()} | {tiempoActual.toLocaleTimeString()}
        </div>
        <h1 style={styles.title}>{obtenerSaludo()}</h1>
        <p style={styles.subtitle}>Ender-3 V3 SE Comando Táctico</p>
      </header>

      <div style={styles.quoteCard}>
        <p style={styles.quoteText}>{fraseDia}</p>
      </div>

      <div style={styles.dashRow}>
        <div style={styles.dashCard}>
          <span style={styles.dashLabel}>⚡ Racha Diaria</span>
          <p style={{ ...styles.dashVal, color: '#f59e0b' }}>🔥 {appData.fitness?.rachaDias || 0} Días</p>
        </div>
        <div style={styles.dashCard}>
          <span style={styles.dashLabel}>💳 Liquidez</span>
          <p style={{ ...styles.dashVal, color: balance < 0 ? '#ef4444' : '#4ade80' }}>${balance}</p>
        </div>
        <div style={styles.dashCard}>
          <span style={styles.dashLabel}>🧠 Enfoque</span>
          <p style={styles.dashVal}>{totalLibrosPendientes + totalMateriasPendientes} Obj</p>
        </div>
      </div>

      <nav style={styles.nav}>
        <button style={tab === 'fitness' ? styles.activeButton : styles.button} onClick={() => setTab('fitness')}>💪 Cuerpo</button>
        <button style={tab === 'finanzas' ? styles.activeButton : styles.button} onClick={() => setTab('finanzas')}>💳 Finanzas & 3D</button>
        <button style={tab === 'crecimiento' ? styles.activeButton : styles.button} onClick={() => setTab('crecimiento')}>🧠 Mente & Cola 3D</button>
      </nav>

      <main style={styles.main}>
        {tab === 'fitness' && (
          <div>
            <div style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Metas Diarias</h2>
                <button onClick={reiniciarHabitos} style={styles.resetBtn}>🔄 Reiniciar</button>
              </div>
              <div style={styles.progressBlock}>
                <div style={styles.progressLabel}><span>💧 Hidratación (Meta: 3L)</span><strong>{((appData.fitness?.aguaVasos || 0) * 0.3).toFixed(1)}L / 3.0L</strong></div>
                <div style={styles.progressBarBg}><div style={{ ...styles.progressBarFill, width: `${(appData.fitness?.aguaVasos || 0) * 10}%` }}></div></div>
                <div style={{ textAlign: 'right' }}><button onClick={agregarAgua} style={styles.actionBtn}>+1 Vaso (300ml)</button></div>
              </div>
              <div style={styles.progressBlock}>
                <div style={styles.progressLabel}><span>🥾 Caminata Mental (Meta: 45 min)</span><strong>{appData.fitness?.caminataMinutos || 0} min / 45 min</strong></div>
                <div style={styles.progressBarBg}><div style={{ ...styles.progressBarFill, width: `${((appData.fitness?.caminataMinutos || 0) / 45) * 100}%` }}></div></div>
                <div style={{ textAlign: 'right' }}><button onClick={agregarCaminata} style={styles.actionBtn}>+15 Minutos</button></div>
              </div>
              <div style={{ ...styles.listItem, cursor: 'pointer', marginTop: '25px', borderColor: appData.fitness?.comidaLimpia ? '#4ade80' : '#1e293b' }} onClick={toggleComida}>
                <div><span style={{ color: '#fff', fontWeight: '500' }}>🥦 Nutrición Limpia</span><p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>Porciones controladas, cero comida chatarra</p></div>
                <span style={{ color: appData.fitness?.comidaLimpia ? '#4ade80' : '#475569', fontWeight: 'bold', fontSize: '11px' }}>{appData.fitness?.comidaLimpia ? 'CUMPLIDO' : 'PENDIENTE'}</span>
              </div>
              <div style={styles.weekRow}>
                {DIAS_SEMANA.map((dia, idx) => {
                  const cumplido = appData.fitness?.registrosSemanales?.[idx] || false;
                  const esHoy = new Date().getDay() === idx;
                  return (
                    <div key={idx} style={{ ...styles.weekDayBox, backgroundColor: esHoy ? '#00b4d812' : 'transparent', border: esHoy ? '1px solid #00b4d844' : 'none' }}>
                      <span style={styles.weekDayName}>{dia}</span>
                      <span style={{ ...styles.weekDayCircle, backgroundColor: cumplido ? '#4ade80' : '#1e293b' }}></span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>📊 Rendimiento Físico Semanal</h2>
              <div style={{ marginBottom: '15px' }}>
                <span style={{ fontSize: '11px', color: '#00b4d8', fontWeight: '600' }}>Consumo de Agua (Últimos 7 días)</span>
                <div style={{ display: 'flex', gap: '8px', height: '60px', alignItems: 'flex-end', marginTop: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
                  {(appData.fitness?.historialAgua || []).map((agua, idx) => (
                    <div key={idx} style={{ flex: 1, backgroundColor: '#00b4d830', height: `${(agua / 3) * 100}%`, borderRadius: '4px 4px 0 0', textAlign: 'center', position: 'relative' }}>
                      <span style={{ fontSize: '8px', position: 'absolute', top: '-14px', width: '100%', left: 0, color: '#94a3b8' }}>{agua}L</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#00f5d4', fontWeight: '600' }}>Caminata Mental (Minutos)</span>
                <div style={{ display: 'flex', gap: '8px', height: '60px', alignItems: 'flex-end', marginTop: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
                  {(appData.fitness?.historialCaminata || []).map((min, idx) => (
                    <div key={idx} style={{ flex: 1, backgroundColor: '#00f5d430', height: `${(min / 45) * 100}%`, borderRadius: '4px 4px 0 0', textAlign: 'center', position: 'relative' }}>
                      <span style={{ fontSize: '8px', position: 'absolute', top: '-14px', width: '100%', left: 0, color: '#94a3b8' }}>{min}m</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Menú del Día Aleatorio</h2>
                <button onClick={generarMenuSano} style={styles.actionBtn}>🔄 Siguiente Idea</button>
              </div>
              <div style={styles.menuBox}>
                <div style={styles.menuItem}><span style={styles.menuTag}>🍳 Desayuno:</span>{sugerenciaDia.desayuno}</div>
                <div style={styles.menuItem}><span style={styles.menuTag}>🍲 Comida:</span>{sugerenciaDia.comida}</div>
                <div style={styles.menuItem}><span style={styles.menuTag}>🥗 Cena:</span>{sugerenciaDia.cena}</div>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Control de Peso</h2>
              <form onSubmit={agregarPeso} style={{ marginBottom: '20px' }}>
                <input type="number" step="0.1" placeholder="Registrar peso actual (Kg)" style={styles.input} value={inputPeso} onChange={(e) => setInputPeso(e.target.value)} />
                <button type="submit" style={styles.submitBtn}>Guardar Registro</button>
              </form>
              <ul style={styles.list}>
                {(appData.fitness?.historialPeso || []).map((p, i) => (
                  <li key={i} style={styles.listItem}><span style={{ color: '#64748b' }}>{p.fecha}</span><strong>{p.peso} Kg</strong></li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'finanzas' && (
          <div>
            <div style={{ ...styles.card, border: '1px solid #00f5d440' }}>
              <h2 style={{ ...styles.sectionTitle, borderLeft: '3px solid #00f5d4' }}>🖨️ Cotizador & Calculadora 3D</h2>
              
              <input type="text" placeholder="Nombre del proyecto / pieza" style={styles.input} value={calc3D.nombrePieza} onChange={(e) => setCalc3D({...calc3D, nombrePieza: e.target.value})} />
              
              <label style={{fontSize:'11px', color:'#94a3b8', display:'block', marginBottom:'6px'}}>Vincular con Inventario de Filamento:</label>
              <select style={styles.select} value={calc3D.rolloSeleccionadoId} onChange={(e) => setCalc3D({...calc3D, rolloSeleccionadoId: e.target.value})}>
                <option value="">-- Usar Valores Manuales de Abajo --</option>
                {(appData.filamentos || []).map(f => (
                  <option key={f.id} value={f.id}>{f.nombre} ({f.color}) - Quedan: {f.gramosActuales.toFixed(0)}g</option>
                ))}
              </select>

              {!calc3D.rolloSeleccionadoId && (
                <div style={styles.calcGrid}>
                  <div>
                    <label style={{fontSize:'11px', color:'#64748b', display:'block', marginBottom:'4px'}}>Precio Rollo ($)</label>
                    <input type="number" style={styles.input} value={calc3D.precioRollo} onChange={(e) => setCalc3D({...calc3D, precioRollo: e.target.value})} />
                  </div>
                  <div>
                    <label style={{fontSize:'11px', color:'#64748b', display:'block', marginBottom:'4px'}}>Gramos del Rollo</label>
                    <input type="number" style={styles.input} value={calc3D.gramosRollo} onChange={(e) => setCalc3D({...calc3D, gramosRollo: e.target.value})} />
                  </div>
                </div>
              )}

              <div style={styles.calcGrid}>
                <div>
                  <label style={{fontSize:'11px', color:'#00b4d8', display:'block', marginBottom:'4px'}}>Gramos de la Pieza</label>
                  <input type="number" style={styles.input} value={calc3D.gramosPieza} onChange={(e) => setCalc3D({...calc3D, gramosPieza: e.target.value})} />
                </div>
                <div>
                  <label style={{fontSize:'11px', color:'#00b4d8', display:'block', marginBottom:'4px'}}>Horas de Impresión</label>
                  <input type="number" style={styles.input} value={calc3D.horasImpresion} onChange={(e) => setCalc3D({...calc3D, horasImpresion: e.target.value})} />
                </div>
              </div>

              <div style={styles.calcGrid}>
                <div>
                  <label style={{fontSize:'11px', color:'#64748b', display:'block', marginBottom:'4px'}}>Costo Luz/Hora ($)</label>
                  <input type="number" style={styles.input} value={calc3D.costoHoraLuz} onChange={(e) => setCalc3D({...calc3D, costoHoraLuz: e.target.value})} />
                </div>
                <div>
                  <label style={{fontSize:'11px', color:'#00f5d4', display:'block', marginBottom:'4px'}}>% Margen de Ganancia</label>
                  <select style={styles.select} value={calc3D.porcentajeGanancia} onChange={(e) => setCalc3D({...calc3D, porcentajeGanancia: e.target.value})}>
                    <option value="50">50% (Bajo)</option>
                    <option value="100">100% (Duplicar costo)</option>
                    <option value="150">150% (Recomendado)</option>
                    <option value="200">200% (Triplicar costo)</option>
                    <option value="300">300% (Premium)</option>
                  </select>
                </div>
              </div>

              <div style={styles.calcOutput}>
                <span style={{fontSize:'11px', color:'#00f5d4', fontWeight:'600', letterSpacing:'1px'}}>PRECIO DE VENTA SUGERIDO</span>
                <p style={{fontSize:'26px', fontWeight:'700', color:'#ffffff', margin:'5px 0 10px 0'}}>${precioSugerido3D} MXN</p>
                <button type="button" onClick={inyectarCotizacionAIngreso} style={{...styles.submitBtn, backgroundColor:'#00f5d4', color:'#02040a', boxShadow:'0 4px 12px rgba(0, 245, 212, 0.2)'}}>
                  ⚡ Inyectar a Transacciones & Retención
                </button>
              </div>
            </div>

            <div style={{ ...styles.card, border: '1px solid #e11d4840' }}>
              <h2 style={{ ...styles.sectionTitle, borderLeft: '3px solid #e11d48' }}>🔧 Mantenimiento Ender-3 V3 SE</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ fontSize: '11px', color: '#fda4af' }}>Total Horas Acumuladas:</span>
                <strong style={{ color: '#fff', fontSize: '14px' }}>{(appData.mantenimiento3D?.horasUsoAcumuladas || 0).toFixed(1)} hrs</strong>
              </div>

              <div style={styles.progressBlock}>
                <div style={styles.progressLabel}>
                  <span>🧹 Limpiar y Lubricar Ejes X/Y (Límite: 50h)</span>
                  <strong>{(appData.mantenimiento3D?.ejesXyLubricado || 0).toFixed(1)}h / 50h</strong>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{ 
                    ...styles.progressBarFill, 
                    backgroundColor: (appData.mantenimiento3D?.ejesXyLubricado || 0) >= 45 ? '#ef4444' : '#e11d48',
                    width: `${Math.min(((appData.mantenimiento3D?.ejesXyLubricado || 0) / 50) * 100, 100)}%` 
                  }}></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button onClick={() => reiniciarMantenimiento('lubricado')} style={{ ...styles.actionBtn, backgroundColor: '#e11d4815', color: '#fda4af', borderColor: '#e11d4840' }}>✔️ Hecho</button>
                </div>
              </div>

              <div style={styles.progressBlock}>
                <div style={styles.progressLabel}>
                  <span>🔩 Ajustar Tornillería y Correas X/Y (Límite: 100h)</span>
                  <strong>{(appData.mantenimiento3D?.tornillosCamaAjustados || 0).toFixed(1)}h / 100h</strong>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{ 
                    ...styles.progressBarFill, 
                    backgroundColor: (appData.mantenimiento3D?.tornillosCamaAjustados || 0) >= 90 ? '#ef4444' : '#e11d48',
                    width: `${Math.min(((appData.mantenimiento3D?.tornillosCamaAjustados || 0) / 100) * 100, 100)}%` 
                  }}></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button onClick={() => reiniciarMantenimiento('ajustado')} style={{ ...styles.actionBtn, backgroundColor: '#e11d4815', color: '#fda4af', borderColor: '#e11d4840' }}>✔️ Hecho</button>
                </div>
              </div>

              <div style={styles.progressBlock}>
                <div style={styles.progressLabel}>
                  <span>🔥 Cambio/Limpieza de Boquilla (Límite: 150h)</span>
                  <strong>{(appData.mantenimiento3D?.boquillaLimpia || 0).toFixed(1)}h / 150h</strong>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{ 
                    ...styles.progressBarFill, 
                    backgroundColor: (appData.mantenimiento3D?.boquillaLimpia || 0) >= 135 ? '#ef4444' : '#e11d48',
                    width: `${Math.min(((appData.mantenimiento3D?.boquillaLimpia || 0) / 150) * 100, 100)}%` 
                  }}></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button onClick={() => reiniciarMantenimiento('limpia')} style={{ ...styles.actionBtn, backgroundColor: '#e11d4815', color: '#fda4af', borderColor: '#e11d4840' }}>✔️ Hecho</button>
                </div>
              </div>
            </div>

            <div style={{ ...styles.card, border: '1px solid #c084fc40', backgroundColor: '#130a2155' }}>
              <h2 style={{ ...styles.sectionTitle, borderLeft: '3px solid #c084fc' }}>🎯 Fondo de Reinversión & Upgrades</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: '#a78bfa', fontWeight: '600' }}>PROYECTO: {appData.ahorroInversion?.concepto}</span>
                  <p style={{ color: '#ffffff', fontSize: '20px', margin: '4px 0 0 0', fontWeight: '600' }}>${appData.ahorroInversion?.actual} / ${appData.ahorroInversion?.meta}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: '#a78bfa', fontWeight: '600' }}>DEDUCCIÓN AUTO</span>
                  <p style={{ color: '#c084fc', fontSize: '13px', margin: '4px 0 0 0', fontWeight: 'bold' }}>{appData.ahorroInversion?.pctRetencion}% de Venta 3D</p>
                </div>
              </div>
              <div style={{ ...styles.progressBarBg, height: '6px' }}>
                <div style={{ ...styles.progressBarFill, width: `${((appData.ahorroInversion?.actual || 0) / (appData.ahorroInversion?.meta || 1)) * 100}%`, backgroundColor: '#c084fc' }}></div>
              </div>

              <div style={{ padding: '10px', backgroundColor: '#02040a', border: '1px dashed #c084fc40', borderRadius: '8px', marginBottom: '15px', fontSize: '11px', color: '#e9d5ff', lineHeight: '1.4' }}>
                <strong>📈 Análisis Predictivo:</strong> {calcularProyeccion()}
              </div>

              <form onSubmit={actualizarAhorroConfig} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', marginTop: '15px' }}>
                <input type="text" placeholder="Meta (ej: Ender 3 V3)" style={{ ...styles.input, marginBottom: 0 }} value={ahorroForm.concepto} onChange={(e) => setAhorroForm({ ...ahorroForm, concepto: e.target.value })} />
                <input type="number" placeholder="Costo" style={{ ...styles.input, marginBottom: 0 }} value={ahorroForm.meta} onChange={(e) => setAhorroForm({ ...ahorroForm, meta: e.target.value })} />
                <input type="number" placeholder="% Ret." style={{ ...styles.input, marginBottom: 0 }} value={ahorroForm.pctRetencion} onChange={(e) => setAhorroForm({ ...ahorroForm, pctRetencion: e.target.value })} />
                <button type="submit" style={{ ...styles.submitBtn, gridColumn: 'span 3', padding: '8px', fontSize: '11px', backgroundColor: '#a78bfa', marginTop: '8px' }}>Fijar Meta de Ahorro</button>
              </form>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>📦 Inventario de Filamentos</h2>
              <form onSubmit={registrarFilamento} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px' }}>
                <input type="text" placeholder="Marca / Nombre" style={{ ...styles.input, marginBottom: 0 }} value={nuevoFilamento.nombre} onChange={(e) => setNuevoFilamento({ ...nuevoFilamento, nombre: e.target.value })} />
                <input type="text" placeholder="Color" style={{ ...styles.input, marginBottom: 0 }} value={nuevoFilamento.color} onChange={(e) => setNuevoFilamento({ ...nuevoFilamento, color: e.target.value })} />
                <input type="number" placeholder="Gramos" style={{ ...styles.input, marginBottom: 0 }} value={nuevoFilamento.gramos} onChange={(e) => setNuevoFilamento({ ...nuevoFilamento, gramos: e.target.value })} />
                <input type="number" placeholder="Precio ($)" style={{ ...styles.input, marginBottom: 0 }} value={nuevoFilamento.precio} onChange={(e) => setNuevoFilamento({ ...nuevoFilamento, precio: e.target.value })} />
                <button type="submit" style={{ ...styles.submitBtn, gridColumn: 'span 2', padding: '10px' }}>Agregar Rollo</button>
              </form>
              <ul style={styles.list}>
                {(appData.filamentos || []).map(f => {
                  const pctQuedante = Math.round((f.gramosActuales / f.gramosOriginales) * 100);
                  const esCritico = f.gramosActuales < 150;
                  return (
                    <li key={f.id} style={{ ...styles.listItem, flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ color: '#fff' }}>{f.nombre}</strong> <span style={{ color: '#64748b', fontSize: '11px' }}>({f.color})</span>
                        </div>
                        <button onClick={() => eliminarFilamento(f.id)} style={styles.deleteBtn}>🗑️</button>
                      </div>
                      <div style={{ ...styles.progressBarBg, height: '5px', marginBottom: '2px' }}>
                        <div style={{ ...styles.progressBarFill, width: `${pctQuedante}%`, backgroundColor: esCritico ? '#ef4444' : '#00f5d4' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                        <span>Resta: {f.gramosActuales.toFixed(0)}g / {f.gramosOriginales}g</span>
                        <strong style={{ color: esCritico ? '#ef4444' : '#00f5d4' }}>{pctQuedante}% disp.</strong>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ ...styles.card, border: alertaPresupuesto ? '1px solid #ef444455' : '1px solid #1e293b', backgroundColor: alertaPresupuesto ? '#2d151555' : '#060b19bc' }}>
              <h2 style={styles.sectionTitle}>Límites y Presupuesto</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '14px' }}>
                <div><span style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>GASTADO MENSUAL</span><p style={{ color: '#ffffff', fontSize: '20px', margin: '4px 0 0 0', fontWeight: '600' }}>${totalGastos} / ${appData.finanzas?.limitePresupuesto || 5000}</p></div>
                <div style={{ textAlign: 'right' }}><span style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>ESTADO</span><p style={{ color: alertaPresupuesto ? '#ef4444' : '#4ade80', fontSize: '13px', margin: '8px 0 0 0', fontWeight: 'bold' }}>{alertaPresupuesto ? '⚠️ CRÍTICO' : '✅ CONTROLADO'}</p></div>
              </div>
              <div style={{ ...styles.progressBarBg, height: '6px' }}><div style={{ ...styles.progressBarFill, width: `${porcentajePresupuesto}%`, backgroundColor: alertaPresupuesto ? '#ef4444' : '#00b4d8' }}></div></div>
              <form onSubmit={actualizarLimite} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <input type="number" placeholder="Cambiar tope mensual ($)" style={{ ...styles.input, marginBottom: 0 }} value={limiteInput} onChange={(e) => setLimiteInput(e.target.value)} />
                <button type="submit" style={{ ...styles.actionBtn, padding: '0 15px' }}>Fijar</button>
              </form>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>📊 Distribución de Gastos</h2>
              {Object.keys(BlacklistCategorias).map(cat => {
                const monto = BlacklistCategorias[cat];
                const pct = totalGastos > 0 ? Math.round((monto / totalGastos) * 100) : 0;
                return (
                  <div key={cat} style={styles.chartBarGroup}>
                    <div style={styles.chartLabelRow}>
                      <span>{cat === 'Comida' ? '🥑' : cat === 'Estudios' ? '📚' : cat === 'Transporte' ? '🚗' : cat === 'Ocio' ? '🍿' : '📦'} {cat}</span>
                      <strong>${monto} ({pct}%)</strong>
                    </div>
                    <div style={{ ...styles.progressBarBg, height: '6px', marginBottom: 0 }}>
                      <div style={{ ...styles.progressBarFill, width: `${pct}%`, backgroundColor: '#00b4d8' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Registrar Flujo de Caja</h2>
              <form onSubmit={agregarTransaccion}>
                <input type="text" placeholder="Concepto (ej. Supermercado, Uber)" style={styles.input} value={finanzasForm.concepto} onChange={(e) => setFinanzasForm({ ...finanzasForm, concepto: e.target.value })} />
                <input type="number" placeholder="Monto ($)" style={styles.input} value={finanzasForm.monto} onChange={(e) => setFinanzasForm({ ...finanzasForm, monto: e.target.value })} />
                <select style={styles.select} value={finanzasForm.categoria} onChange={(e) => setFinanzasForm({ ...finanzasForm, category: e.target.value })}>
                  <option value="Otros">📦 Ingresos / Ventas 3D</option>
                  <option value="Comida">🥑 Comida / Despensa</option>
                  <option value="Estudios">📚 Universidad / Libros</option>
                  <option value="Transporte">🚗 Transporte / Uber</option>
                  <option value="Ocio">🍿 Entretenimiento / Salidas</option>
                </select>
                <select style={styles.select} value={finanzasForm.tipo} onChange={(e) => setFinanzasForm({ ...finanzasForm, tipo: e.target.value })}>
                  <option value="ingreso">📈 Registrar como Ingreso</option>
                  <option value="gasto">📉 Registrar como Gasto</option>
                </select>
                <button type="submit" style={styles.submitBtn}>Guardar Transacción</button>
              </form>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Últimos Movimientos</h2>
              <ul style={styles.list}>
                {[...(appData.finanzas?.ingresos || []), ...(appData.finanzas?.gastos || [])].sort((a, b) => b.id - a.id).slice(0, 3).map((t) => {
                  const esGasto = (appData.finanzas?.gastos || []).some(g => g.id === t.id);
                  return (
                    <li key={t.id} style={styles.listItem}>
                      <div><span style={{ color: '#fff', fontWeight: '500' }}>{t.concepto}</span></div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={esGasto ? styles.badgeGasto : styles.badgeIngreso}>{esGasto ? '-' : '+'}${t.monto}</span>
                        <button onClick={() => eliminarTransaccion(t.id, esGasto ? 'gastos' : 'ingresos')} style={styles.deleteBtn}>🗑️</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {tab === 'crecimiento' && (
          <div>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>⏱️ Estación Pomodoro</h2>
              <div style={styles.pomoWrapper}>
                <div style={styles.pomoTime}>{formatoPomo()}</div>
                <div style={styles.pomoBtnGroup}>
                  <button onClick={() => setPomoActivo(!pomoActivo)} style={{ ...styles.actionBtn, backgroundColor: pomoActivo ? '#ef444420' : '#4ade8015', color: pomoActivo ? '#ef4444' : '#4ade80', borderColor: pomoActivo ? '#ef444433' : '#4ade8033' }}>
                    {pomoActivo ? 'Pausar' : 'Iniciar'}
                  </button>
                  <button onClick={() => { setPomoActivo(false); setPomoSegundos(1500); }} style={styles.actionBtn}>Reiniciar</button>
                </div>
              </div>
            </div>

            <div style={{ ...styles.card, border: '1px solid #00b4d840' }}>
              <h2 style={{ ...styles.sectionTitle, borderLeft: '3px solid #00b4d8' }}>⏳ Cola de Trabajos 3D (Cronograma)</h2>
              <form onSubmit={agregarTrabajoCola} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', marginBottom: '15px' }}>
                <input type="text" placeholder="Nombre de la pieza..." style={{ ...styles.input, gridColumn: 'span 2', marginBottom: 0 }} value={nuevoTrabajo.pieza} onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, pieza: e.target.value })} />
                <input type="number" placeholder="Hrs Estimadas" style={{ ...styles.input, marginBottom: 0 }} value={nuevoTrabajo.horasEstimadas} onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, horasEstimadas: e.target.value })} />
                
                <select style={{ ...styles.select, marginBottom: 0 }} value={nuevoTrabajo.prioridad} onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, prioridad: e.target.value })}>
                  <option value="Alta">🔴 Alta</option>
                  <option value="Media">🟡 Media</option>
                  <option value="Baja">🟢 Baja</option>
                </select>

                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10px', color: '#64748b' }}>Fecha límite de entrega:</label>
                  <input type="date" style={{ ...styles.input, marginBottom: 0 }} value={nuevoTrabajo.fechaLimite} onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, fechaLimite: e.target.value })} />
                </div>

                <button type="submit" style={{ ...styles.submitBtn, gridColumn: 'span 2', padding: '10px', marginTop: '5px' }}>+ Encolar Trabajo</button>
              </form>
              
              <ul style={styles.list}>
                {colaOrdenada.map(t => {
                  const esUrgente = t.fechaLimite && (new Date(t.fechaLimite) - new Date() < 172800000) && t.estado !== 'Terminado'; 
                  return (
                    <li key={t.id} style={{ ...styles.listItem, flexDirection: 'column', alignItems: 'stretch', gap: '8px', borderColor: esUrgente ? '#ef444450' : '#1e293b', backgroundColor: esUrgente ? '#ef444405' : '#02040a' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: t.estado === 'Terminado' ? '#475569' : '#fff', textDecoration: t.estado === 'Terminado' ? 'line-through' : 'none' }}>
                          {t.pieza} <span style={{ fontSize: '10px', color: t.prioridad === 'Alta' ? '#ef4444' : t.prioridad === 'Media' ? '#f59e0b' : '#10b981' }}>[{t.prioridad}]</span>
                        </span>
                        <button onClick={() => eliminarTrabajoCola(t.id)} style={styles.deleteBtn}>🗑️</button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748b' }}>
                        <span>Tiempo: <strong>{t.horasEstimadas} hrs</strong></span>
                        <span>Límite: <strong style={{ color: esUrgente ? '#ef4444' : '#94a3b8' }}>{t.fechaLimite || 'Sin asignar'}</strong></span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Estado: <strong style={{ color: t.estado === 'Terminado' ? '#10b981' : '#00b4d8' }}>{t.estado}</strong></span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => actualizarEstadoTrabajo(t.id, 'Imprimiendo...')} style={{ ...styles.actionBtn, padding: '4px 8px', fontSize: '9px' }}>⚙️ Imprimir</button>
                          <button onClick={() => actualizarEstadoTrabajo(t.id, 'Terminado')} style={{ ...styles.actionBtn, padding: '4px 8px', fontSize: '9px', backgroundColor: '#10b98120', color: '#10b981' }}>✔️ Terminar</button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Objetivos Académicos y Lectura</h2>
              <form onSubmit={agregarCrecimiento}>
                <select style={styles.select} value={crecimientoForm.tipo} onChange={(e) => setCrecimientoForm({ ...crecimientoForm, tipo: e.target.value, nombre: '', paginasTotales: e.target.value === 'curso' ? '10' : '200' })}>
                  <option value="curso">🏫 Materia / Curso Universidad</option>
                  <option value="libro">📖 Libro / Lectura Digital</option>
                </select>
                {crecimientoForm.tipo === 'libro' ? (
                  <>
                    <label style={styles.fileLabel}>
                      {pdfFile ? `📄 ${pdfFile.name}` : "📁 Adjuntar PDF del Libro (Opcional)"}
                      <input type="file" accept="application/pdf" style={{ display: 'none' }} onChange={manejarCargaPdf} />
                    </label>
                    <input type="text" placeholder="Título del libro" style={styles.input} value={crecimientoForm.nombre} onChange={(e) => setCrecimientoForm({ ...crecimientoForm, nombre: e.target.value })} />
                    <input type="number" placeholder="Total de páginas" style={styles.input} value={crecimientoForm.paginasTotales} onChange={(e) => setCrecimientoForm({ ...crecimientoForm, paginasTotales: e.target.value })} />
                  </>
                ) : (
                  <>
                    <input type="text" placeholder="Nombre de la materia o certificación" style={styles.input} value={crecimientoForm.nombre} onChange={(e) => setCrecimientoForm({ ...crecimientoForm, nombre: e.target.value })} />
                    <input type="number" placeholder="Total de clases o lecciones" style={styles.input} value={crecimientoForm.paginasTotales} onChange={(e) => setCrecimientoForm({ ...crecimientoForm, paginasTotales: e.target.value })} />
                  </>
                )}
                <button type="submit" style={styles.submitBtn}>Asignar a la Lista</button>
              </form>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Biblioteca Digital y Progreso</h2>
              {(appData.crecimiento?.lecturas || []).map(l => {
                const porcentaje = Math.round((l.paginaActual / l.paginasTotales) * 100) || 0;
                return (
                  <div key={l.id} style={styles.bookItem}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                      <span style={{ color: l.completado ? '#475569' : '#fff', fontWeight: '500' }}>{l.nombre}</span>
                      <button onClick={() => eliminarMenteItem(l.id, 'libro')} style={styles.deleteBtn}>🗑️</button>
                    </div>
                    <div style={styles.progressBarBg}><div style={{ ...styles.progressBarFill, width: `${porcentaje}%` }}></div></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Pág: {l.paginaActual} / {l.paginasTotales}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {l.tieneArchivo && pdfUrlMap[l.id] && <button onClick={() => window.open(pdfUrlMap[l.id], '_blank')} style={styles.openPdfBtn}>📖 PDF</button>}
                        {!l.completado && (
                          <>
                            <button onClick={() => avanzarPaginas(l.id, 5)} style={styles.actionBtn}>+5</button>
                            <button onClick={() => avanzarPaginas(l.id, 10)} style={styles.actionBtn}>+10</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>🏫 Progreso de Materias y Cursos</h2>
              {(appData.crecimiento?.cursos || []).map(c => {
                const actual = c.paginaActual || 0;
                const total = c.paginasTotales || 10;
                const porcentaje = Math.round((actual / total) * 100) || 0;

                return (
                  <div key={c.id} style={{ ...styles.bookItem, border: c.completado ? '1px solid #10b98140' : '1px solid #1e293b', marginBottom: '12px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ color: c.completado ? '#10b981' : '#fff', fontWeight: '600', fontSize: '13px' }}>
                        {c.completado ? '✅ ' : '⏳ '} {c.nombre}
                      </span>
                      <button onClick={() => eliminarMenteItem(c.id, 'curso')} style={styles.deleteBtn}>🗑️</button>
                    </div>

                    <div style={{ ...styles.progressBarBg, height: '5px', marginBottom: '8px' }}>
                      <div style={{ 
                        ...styles.progressBarFill, 
                        width: `${porcentaje}%`, 
                        backgroundColor: c.completado ? '#10b981' : '#00b4d8' 
                      }}></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        Clases: <strong>{actual} / {total}</strong> ({porcentaje}%)
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          type="button"
                          onClick={() => avanzarLeccionCurso(c.id, -1)} 
                          style={{ ...styles.actionBtn, padding: '3px 8px', fontSize: '10px' }}
                        >
                          -
                        </button>
                        <button 
                          type="button"
                          onClick={() => avanzarLeccionCurso(c.id, 1)} 
                          style={{ 
                            ...styles.actionBtn, 
                            padding: '3px 10px', 
                            fontSize: '10px', 
                            backgroundColor: c.completado ? '#10b98115' : '#00b4d815', 
                            color: c.completado ? '#10b981' : '#00b4d8',
                            borderColor: c.completado ? '#10b98140' : '#00b4d840'
                          }}
                        >
                          + Lección
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ ...styles.card, border: '1px dashed #00f5d450', backgroundColor: '#020e1766' }}>
          <h2 style={{ ...styles.sectionTitle, borderLeft: '3px solid #00f5d4' }}>🏆 Victorias de Hoy (Ritual de Cierre)</h2>
          <div style={styles.victoriasGrid}>
            <input 
              type="text" 
              placeholder="1ª Victoria del día..." 
              style={styles.victoriaInput} 
              value={appData.victoriasDia?.[0] || ''} 
              onChange={(e) => manejarCambioVictoria(0, e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="2ª Victoria del día..." 
              style={styles.victoriaInput} 
              value={appData.victoriasDia?.[1] || ''} 
              onChange={(e) => manejarCambioVictoria(1, e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="3ª Victoria del día..." 
              style={styles.victoriaInput} 
              value={appData.victoriasDia?.[2] || ''} 
              onChange={(e) => manejarCambioVictoria(2, e.target.value)} 
            />
          </div>
          <p style={{ margin: 0, fontSize: '10px', color: '#64748b', textAlign: 'center' }}>Registrar tus éxitos diarios entrena la mente para ganar constantemente.</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>📝 Bloc de Notas Rápidas</h2>
          <textarea 
            style={styles.textarea} 
            placeholder="Escribe aquí ideas espontáneas, tareas del momento..."
            value={appData.notasRapidas || ''}
            onChange={manejarCambioNotas}
          />
        </div>
      </main>
    </div>
  );
}

export default App;