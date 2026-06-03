import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "crm.db");

const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

console.log("Seeding database...");

// Get pipeline stages
const stages = sqlite
  .prepare('SELECT id, name FROM pipeline_stages ORDER BY "order"')
  .all() as Array<{ id: string; name: string }>;

if (stages.length === 0) {
  console.error(
    "No pipeline stages found. Run the app first to create default stages."
  );
  process.exit(1);
}

const stageMap = new Map(stages.map((s) => [s.name, s.id]));
const now = Math.floor(Date.now() / 1000);
const day = 86400;

// Helper para obtener el id de etapa con fallback
const s = (name: string, fallback: number) =>
  stageMap.get(name) || stages[fallback]?.id || stages[0].id;

// ─── Contactos ───────────────────────────────────────────────────────────────
const contacts = [
  // Leads calientes (hot)
  {
    id: crypto.randomUUID(),
    name: "Laura Hernandez",
    email: "laura@agenciacreativa.mx",
    phone: "+52 33 4444 5555",
    company: "Agencia Creativa MX",
    source: "evento",
    temperature: "hot",
    score: 92,
    notes: "Conocida en evento de networking. Pidió demo inmediata. Presupuesto aprobado.",
    created_at: now - 3 * day,
    updated_at: now,
  },
  {
    id: crypto.randomUUID(),
    name: "Maria Garcia",
    email: "maria@techstartup.mx",
    phone: "+52 55 1234 5678",
    company: "TechStartup MX",
    source: "website",
    temperature: "hot",
    score: 85,
    notes: "Interesada en plan empresarial. Equipo de 15 personas. Evaluando 3 opciones.",
    created_at: now - 5 * day,
    updated_at: now - 1 * day,
  },
  {
    id: crypto.randomUUID(),
    name: "Pedro Alvarado",
    email: "pedro@clinicadentalplus.com",
    phone: "+52 55 9988 7766",
    company: "Clínica Dental Plus",
    source: "facebook_lead",
    temperature: "hot",
    score: 78,
    notes: "Lead de Facebook Instant Form. Quiere CRM para gestionar pacientes y citas.",
    created_at: now - 1 * day,
    updated_at: now,
  },
  // Leads tibios (warm)
  {
    id: crypto.randomUUID(),
    name: "Carlos Rodriguez",
    email: "carlos@inmobiliaria.com",
    phone: "+52 33 9876 5432",
    company: "Inmobiliaria Rodríguez",
    source: "referido",
    temperature: "warm",
    score: 62,
    notes: "Referido por Juan Pérez. Busca automatizar seguimiento de clientes inmobiliarios.",
    created_at: now - 10 * day,
    updated_at: now - 3 * day,
  },
  {
    id: crypto.randomUUID(),
    name: "Ana Martinez",
    email: "ana@consultoria.mx",
    phone: "+52 81 5555 1234",
    company: "Martínez Consultores",
    source: "redes_sociales",
    temperature: "warm",
    score: 55,
    notes: "Nos contactó por LinkedIn. Consultoría de RRHH con 8 consultores.",
    created_at: now - 7 * day,
    updated_at: now - 2 * day,
  },
  {
    id: crypto.randomUUID(),
    name: "Sofia Reyes",
    email: "sofia@ecommerceropa.com",
    phone: "+52 55 3322 1100",
    company: "Moda Online SA",
    source: "facebook_lead",
    temperature: "warm",
    score: 48,
    notes: "Lead de Facebook. Tienda de ropa en línea. Quiere gestionar proveedores y clientes.",
    created_at: now - 4 * day,
    updated_at: now - 1 * day,
  },
  {
    id: crypto.randomUUID(),
    name: "Miguel Torres",
    email: "miguel@constructora.mx",
    phone: "+52 33 6655 4433",
    company: "Constructora Torres",
    source: "referido",
    temperature: "warm",
    score: 58,
    notes: "Referido por Laura Hernandez. Constructor. Interesado en seguimiento de proyectos.",
    created_at: now - 6 * day,
    updated_at: now - 2 * day,
  },
  // Leads fríos (cold)
  {
    id: crypto.randomUUID(),
    name: "Roberto Sanchez",
    email: "roberto@tiendaropa.com",
    phone: "+52 55 7777 8888",
    company: "Tienda en Línea SA",
    source: "formulario",
    temperature: "cold",
    score: 22,
    notes: "Llenó formulario web. No ha respondido emails. Programar seguimiento en 30 días.",
    created_at: now - 20 * day,
    updated_at: now - 20 * day,
  },
  {
    id: crypto.randomUUID(),
    name: "Diana Flores",
    email: "diana@spa-belleza.com",
    phone: "+52 81 2233 4455",
    company: "Spa Belleza Total",
    source: "facebook_lead",
    temperature: "cold",
    score: 18,
    notes: "Lead de Facebook. Solo dejó teléfono. Pendiente de primer contacto.",
    created_at: now - 12 * day,
    updated_at: now - 12 * day,
  },
  {
    id: crypto.randomUUID(),
    name: "Jorge Mendoza",
    email: "jorge@restauranteelmeson.com",
    phone: "+52 33 8877 6655",
    company: "Restaurante El Mesón",
    source: "evento",
    temperature: "cold",
    score: 30,
    notes: "Conocido en expo de negocios. Le mandamos info pero no ha respondido.",
    created_at: now - 25 * day,
    updated_at: now - 25 * day,
  },
  // Clientes ganados
  {
    id: crypto.randomUUID(),
    name: "Valeria Luna",
    email: "valeria@marketingvl.com",
    phone: "+52 55 4455 6677",
    company: "Marketing VL",
    source: "redes_sociales",
    temperature: "hot",
    score: 95,
    notes: "Cliente ganado. Agencia de marketing digital. 12 usuarios activos.",
    created_at: now - 45 * day,
    updated_at: now - 15 * day,
  },
  {
    id: crypto.randomUUID(),
    name: "Andres Vega",
    email: "andres@logisticavega.mx",
    phone: "+52 81 9900 1122",
    company: "Logística Vega",
    source: "referido",
    temperature: "hot",
    score: 88,
    notes: "Cliente ganado. Empresa de logística. Renovación anual en 60 días.",
    created_at: now - 60 * day,
    updated_at: now - 5 * day,
  },
];

const insertContact = sqlite.prepare(
  `INSERT OR IGNORE INTO contacts (id, name, email, phone, company, source, temperature, score, notes, created_at, updated_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

for (const c of contacts) {
  insertContact.run(
    c.id, c.name, c.email, c.phone, c.company,
    c.source, c.temperature, c.score, c.notes,
    c.created_at, c.updated_at
  );
}

console.log(`✓ ${contacts.length} contactos creados`);

// ─── Deals ───────────────────────────────────────────────────────────────────
const dealData = [
  {
    id: crypto.randomUUID(),
    title: "Servicio Premium - Agencia Creativa MX",
    value: 450000,
    stage_id: s("Negociacion", 3),
    contact_id: contacts[0].id,
    expected_close: now + 7 * day,
    probability: 85,
    notes: "Negociando precio final. Cliente quiere descuento del 10%. Muy probable cierre esta semana.",
    created_at: now - 2 * day,
    updated_at: now,
  },
  {
    id: crypto.randomUUID(),
    title: "Plan Empresarial - TechStartup MX",
    value: 250000,
    stage_id: s("Propuesta", 2),
    contact_id: contacts[1].id,
    expected_close: now + 15 * day,
    probability: 70,
    notes: "Propuesta enviada. Esperando respuesta del director de operaciones.",
    created_at: now - 4 * day,
    updated_at: now - 1 * day,
  },
  {
    id: crypto.randomUUID(),
    title: "CRM Clínica - Dental Plus",
    value: 120000,
    stage_id: s("Contactado", 1),
    contact_id: contacts[2].id,
    expected_close: now + 20 * day,
    probability: 55,
    notes: "Lead de Facebook Instant Form. Primera llamada agendada para mañana.",
    created_at: now - 1 * day,
    updated_at: now,
  },
  {
    id: crypto.randomUUID(),
    title: "CRM Inmobiliario - Rodríguez",
    value: 180000,
    stage_id: s("Contactado", 1),
    contact_id: contacts[3].id,
    expected_close: now + 30 * day,
    probability: 40,
    notes: "Demo agendada para la próxima semana. Muy interesado en pipeline visual.",
    created_at: now - 8 * day,
    updated_at: now - 3 * day,
  },
  {
    id: crypto.randomUUID(),
    title: "Plan Equipo - Martínez Consultores",
    value: 95000,
    stage_id: s("Propuesta", 2),
    contact_id: contacts[4].id,
    expected_close: now + 25 * day,
    probability: 45,
    notes: "Propuesta para 8 usuarios. Esperan aprobación de dirección.",
    created_at: now - 5 * day,
    updated_at: now - 2 * day,
  },
  {
    id: crypto.randomUUID(),
    title: "E-commerce CRM - Moda Online",
    value: 75000,
    stage_id: s("Nuevo", 0),
    contact_id: contacts[5].id,
    expected_close: now + 40 * day,
    probability: 30,
    notes: "Lead nuevo de Facebook. Agendar llamada de descubrimiento.",
    created_at: now - 4 * day,
    updated_at: now - 1 * day,
  },
  {
    id: crypto.randomUUID(),
    title: "Seguimiento Proyectos - Constructora Torres",
    value: 210000,
    stage_id: s("Contactado", 1),
    contact_id: contacts[6].id,
    expected_close: now + 35 * day,
    probability: 50,
    notes: "Interesado en módulo de proyectos. Pendiente demo técnica.",
    created_at: now - 6 * day,
    updated_at: now - 2 * day,
  },
  // Deal ganado
  {
    id: crypto.randomUUID(),
    title: "Plan Anual - Marketing VL",
    value: 360000,
    stage_id: s("Cerrado Ganado", 4),
    contact_id: contacts[10].id,
    expected_close: now - 15 * day,
    probability: 100,
    notes: "Contrato firmado. 12 usuarios. Onboarding completado.",
    created_at: now - 45 * day,
    updated_at: now - 15 * day,
  },
  {
    id: crypto.randomUUID(),
    title: "Plan Empresarial - Logística Vega",
    value: 290000,
    stage_id: s("Cerrado Ganado", 4),
    contact_id: contacts[11].id,
    expected_close: now - 30 * day,
    probability: 100,
    notes: "Cliente activo. Renovación en 60 días. Muy satisfecho.",
    created_at: now - 60 * day,
    updated_at: now - 5 * day,
  },
];

const insertDeal = sqlite.prepare(
  `INSERT OR IGNORE INTO deals (id, title, value, stage_id, contact_id, expected_close, probability, notes, created_at, updated_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

for (const d of dealData) {
  insertDeal.run(
    d.id, d.title, d.value, d.stage_id, d.contact_id,
    d.expected_close, d.probability, d.notes,
    d.created_at, d.updated_at
  );
}

console.log(`✓ ${dealData.length} deals creados`);

// ─── Actividades ─────────────────────────────────────────────────────────────
const activityData = [
  // Completadas
  {
    id: crypto.randomUUID(),
    type: "meeting",
    description: "Reunión presencial en Expo Negocios 2025. Demo del CRM en vivo. Muy buena recepción.",
    contact_id: contacts[0].id,
    deal_id: dealData[0].id,
    scheduled_at: null,
    completed_at: now - 3 * day,
    created_at: now - 3 * day,
  },
  {
    id: crypto.randomUUID(),
    type: "email",
    description: "Envío de propuesta comercial con pricing para plan empresarial de 15 usuarios.",
    contact_id: contacts[1].id,
    deal_id: dealData[1].id,
    scheduled_at: null,
    completed_at: now - 2 * day,
    created_at: now - 2 * day,
  },
  {
    id: crypto.randomUUID(),
    type: "note",
    description: "Lead recibido desde Facebook Instant Form. Formulario: 'Automatización para clínicas'.",
    contact_id: contacts[2].id,
    deal_id: dealData[2].id,
    scheduled_at: null,
    completed_at: now - 1 * day,
    created_at: now - 1 * day,
  },
  {
    id: crypto.randomUUID(),
    type: "call",
    description: "Llamada de introducción con Carlos. 30 min. Mostró interés en pipeline visual y reportes.",
    contact_id: contacts[3].id,
    deal_id: dealData[3].id,
    scheduled_at: null,
    completed_at: now - 5 * day,
    created_at: now - 5 * day,
  },
  {
    id: crypto.randomUUID(),
    type: "email",
    description: "Propuesta enviada a Ana para equipo de 8 consultores. Incluye onboarding y soporte.",
    contact_id: contacts[4].id,
    deal_id: dealData[4].id,
    scheduled_at: null,
    completed_at: now - 2 * day,
    created_at: now - 2 * day,
  },
  {
    id: crypto.randomUUID(),
    type: "note",
    description: "Lead de Facebook Instant Form - Formulario: 'CRM para negocios de moda'. Score inicial: 48.",
    contact_id: contacts[5].id,
    deal_id: dealData[5].id,
    scheduled_at: null,
    completed_at: now - 4 * day,
    created_at: now - 4 * day,
  },
  {
    id: crypto.randomUUID(),
    type: "call",
    description: "Llamada con Miguel. Le explicamos el módulo de proyectos. Quiere ver demo técnica.",
    contact_id: contacts[6].id,
    deal_id: dealData[6].id,
    scheduled_at: null,
    completed_at: now - 3 * day,
    created_at: now - 3 * day,
  },
  {
    id: crypto.randomUUID(),
    type: "note",
    description: "Roberto no ha respondido 2 emails. Mover a seguimiento de largo plazo. Retomar en 30 días.",
    contact_id: contacts[7].id,
    deal_id: null,
    scheduled_at: null,
    completed_at: now - 15 * day,
    created_at: now - 15 * day,
  },
  {
    id: crypto.randomUUID(),
    type: "meeting",
    description: "Onboarding completado para Valeria Luna. 12 usuarios dados de alta. Todo funcionando.",
    contact_id: contacts[10].id,
    deal_id: dealData[7].id,
    scheduled_at: null,
    completed_at: now - 15 * day,
    created_at: now - 15 * day,
  },
  // Pendientes (follow-ups futuros)
  {
    id: crypto.randomUUID(),
    type: "follow_up",
    description: "Llamar a Laura para cerrar negociación. Confirmar descuento del 10% con dirección.",
    contact_id: contacts[0].id,
    deal_id: dealData[0].id,
    scheduled_at: now + 1 * day,
    completed_at: null,
    created_at: now,
  },
  {
    id: crypto.randomUUID(),
    type: "follow_up",
    description: "Dar seguimiento a María sobre la propuesta. Preguntar si tiene dudas sobre pricing.",
    contact_id: contacts[1].id,
    deal_id: dealData[1].id,
    scheduled_at: now + 2 * day,
    completed_at: null,
    created_at: now,
  },
  {
    id: crypto.randomUUID(),
    type: "call",
    description: "Primera llamada con Pedro (Clínica Dental). Presentar demo del CRM para clínicas.",
    contact_id: contacts[2].id,
    deal_id: dealData[2].id,
    scheduled_at: now + 1 * day,
    completed_at: null,
    created_at: now,
  },
  {
    id: crypto.randomUUID(),
    type: "meeting",
    description: "Demo técnica con Carlos e Inmobiliaria Rodríguez. Mostrar módulo de pipeline.",
    contact_id: contacts[3].id,
    deal_id: dealData[3].id,
    scheduled_at: now + 5 * day,
    completed_at: null,
    created_at: now,
  },
  {
    id: crypto.randomUUID(),
    type: "follow_up",
    description: "Contactar a Sofia (Moda Online) para agendar llamada de descubrimiento.",
    contact_id: contacts[5].id,
    deal_id: dealData[5].id,
    scheduled_at: now + 3 * day,
    completed_at: null,
    created_at: now,
  },
  {
    id: crypto.randomUUID(),
    type: "meeting",
    description: "Demo técnica del módulo de proyectos para Constructora Torres.",
    contact_id: contacts[6].id,
    deal_id: dealData[6].id,
    scheduled_at: now + 7 * day,
    completed_at: null,
    created_at: now,
  },
  {
    id: crypto.randomUUID(),
    type: "follow_up",
    description: "Contactar a Logística Vega para iniciar proceso de renovación anual anticipada.",
    contact_id: contacts[11].id,
    deal_id: dealData[8].id,
    scheduled_at: now + 10 * day,
    completed_at: null,
    created_at: now,
  },
];

const insertActivity = sqlite.prepare(
  `INSERT OR IGNORE INTO activities (id, type, description, contact_id, deal_id, scheduled_at, completed_at, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
);

for (const a of activityData) {
  insertActivity.run(
    a.id, a.type, a.description, a.contact_id,
    a.deal_id, a.scheduled_at, a.completed_at, a.created_at
  );
}

console.log(`✓ ${activityData.length} actividades creadas`);
console.log("\n✅ Seed completo!");
console.log("   - 12 contactos (hot, warm, cold + clientes ganados)");
console.log("   - 9 deals en distintas etapas del pipeline");
console.log("   - 16 actividades (llamadas, emails, reuniones, follow-ups)");
console.log("   - Incluye leads de Facebook Instant Form");

sqlite.close();
