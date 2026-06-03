import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad - Auto-CRM",
  description:
    "Política de privacidad y tratamiento de datos de Auto-CRM, incluyendo la integración con Facebook Lead Ads de Meta.",
};

const ULTIMA_ACTUALIZACION = "3 de junio de 2026";
const EMPRESA = "Auto-CRM";
const EMAIL_CONTACTO = "mandaloyaonline1314@gmail.com";

export default function PoliticaPrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-[15px] leading-relaxed text-slate-800">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">
        Política de Privacidad
      </h1>
      <p className="mb-8 text-sm text-slate-500">
        Última actualización: {ULTIMA_ACTUALIZACION}
      </p>

      <Section title="1. Introducción">
        <p>
          Esta Política de Privacidad describe cómo {EMPRESA} (&quot;nosotros&quot;,
          &quot;nuestro&quot; o &quot;el Sistema&quot;) recopila, utiliza, almacena y
          protege la información personal de los clientes potenciales (leads) que
          se generan a través de nuestros formularios y de la integración con
          Facebook Lead Ads de Meta Platforms, Inc.
        </p>
        <p className="mt-3">
          Al utilizar nuestro sistema o enviar tus datos a través de nuestros
          formularios de anuncios, aceptas las prácticas descritas en esta
          política.
        </p>
      </Section>

      <Section title="2. Información que Recopilamos">
        <p>
          Recopilamos únicamente la información que tú nos proporcionas
          voluntariamente al completar un formulario instantáneo (Instant Form)
          de Facebook/Instagram o un formulario en nuestro sitio. Esta
          información puede incluir:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>Nombre completo</li>
          <li>Dirección de correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Nombre de empresa u organización</li>
          <li>
            Mensajes o respuestas que incluyas voluntariamente en el formulario
          </li>
        </ul>
        <p className="mt-3">
          No recopilamos información sensible como datos financieros,
          identificaciones oficiales, datos de salud ni contraseñas a través de
          estos formularios.
        </p>
      </Section>

      <Section title="3. Cómo Obtenemos tus Datos de Facebook">
        <p>
          Cuando completas un formulario de Lead Ads en Facebook o Instagram,
          Meta nos notifica de tu registro. Nuestro sistema utiliza la API
          oficial de Meta (Graph API) y el permiso{" "}
          <code className="rounded bg-slate-100 px-1">leads_retrieval</code> para
          obtener de forma segura los datos que enviaste en ese formulario. Este
          proceso se realiza con tu consentimiento otorgado al momento de enviar
          el formulario en la plataforma de Meta.
        </p>
      </Section>

      <Section title="4. Cómo Usamos tu Información">
        <p>Utilizamos la información recopilada para:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>
            Contactarte para dar seguimiento a tu interés en nuestros productos o
            servicios.
          </li>
          <li>
            Responder a tus solicitudes, preguntas o cotizaciones.
          </li>
          <li>
            Gestionar la relación comercial dentro de nuestro sistema de CRM.
          </li>
          <li>
            Enviarte información relevante sobre los servicios que solicitaste.
          </li>
        </ul>
        <p className="mt-3">
          No vendemos, alquilamos ni comercializamos tu información personal con
          terceros para fines publicitarios.
        </p>
      </Section>

      <Section title="5. Almacenamiento y Seguridad de los Datos">
        <p>
          Tus datos se almacenan en una base de datos privada bajo nuestro
          control, alojada en infraestructura segura. Aplicamos medidas técnicas
          y organizativas razonables para proteger tu información contra accesos
          no autorizados, pérdida o alteración. El acceso al sistema está
          restringido al personal autorizado.
        </p>
      </Section>

      <Section title="6. Compartir Información con Terceros">
        <p>
          No compartimos tu información personal con terceros, salvo en los
          siguientes casos:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>
            Proveedores de infraestructura que nos ayudan a operar el sistema
            (por ejemplo, servicios de alojamiento), sujetos a obligaciones de
            confidencialidad.
          </li>
          <li>Cuando la ley lo requiera o lo exija una autoridad competente.</li>
        </ul>
      </Section>

      <Section title="7. Retención de Datos">
        <p>
          Conservamos tu información únicamente durante el tiempo necesario para
          cumplir con los fines descritos en esta política, o hasta que solicites
          su eliminación. Una vez que los datos dejan de ser necesarios, son
          eliminados de forma segura.
        </p>
      </Section>

      <Section title="8. Tus Derechos">
        <p>Tienes derecho a:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>Acceder a los datos personales que tenemos sobre ti.</li>
          <li>Solicitar la corrección de datos inexactos.</li>
          <li>Solicitar la eliminación de tus datos.</li>
          <li>Retirar tu consentimiento en cualquier momento.</li>
        </ul>
        <p className="mt-3">
          Para ejercer cualquiera de estos derechos, escríbenos a{" "}
          <a
            href={`mailto:${EMAIL_CONTACTO}`}
            className="font-medium text-blue-600 underline"
          >
            {EMAIL_CONTACTO}
          </a>
          .
        </p>
      </Section>

      <Section title="9. Eliminación de Datos (Data Deletion)">
        <p>
          Si deseas que eliminemos toda la información personal que tenemos sobre
          ti, envía un correo a{" "}
          <a
            href={`mailto:${EMAIL_CONTACTO}`}
            className="font-medium text-blue-600 underline"
          >
            {EMAIL_CONTACTO}
          </a>{" "}
          con el asunto <strong>&quot;Eliminación de datos&quot;</strong> e incluye
          el correo o teléfono con el que te registraste. Procesaremos tu
          solicitud y eliminaremos tus datos en un plazo máximo de 30 días,
          confirmándote por correo una vez completado.
        </p>
      </Section>

      <Section title="10. Uso de Datos de Plataformas de Meta">
        <p>
          Nuestro uso de la información recibida a través de las APIs de Meta
          cumple con la Política de la Plataforma de Meta, incluyendo los
          requisitos de uso limitado. Solo utilizamos los datos para los fines
          autorizados por el usuario al enviar el formulario y no los usamos para
          tomar decisiones automatizadas que produzcan efectos legales sin
          intervención humana.
        </p>
      </Section>

      <Section title="11. Cambios a esta Política">
        <p>
          Podemos actualizar esta Política de Privacidad ocasionalmente. La
          versión vigente siempre estará publicada en esta página con su fecha de
          última actualización.
        </p>
      </Section>

      <Section title="12. Contacto">
        <p>
          Si tienes preguntas sobre esta Política de Privacidad o sobre el
          tratamiento de tus datos, contáctanos en:
        </p>
        <p className="mt-3">
          <strong>Correo:</strong>{" "}
          <a
            href={`mailto:${EMAIL_CONTACTO}`}
            className="font-medium text-blue-600 underline"
          >
            {EMAIL_CONTACTO}
          </a>
        </p>
      </Section>

      <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-400">
        © {new Date().getFullYear()} {EMPRESA}. Todos los derechos reservados.
      </footer>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xl font-semibold text-slate-900">{title}</h2>
      <div className="space-y-1 text-slate-700">{children}</div>
    </section>
  );
}
