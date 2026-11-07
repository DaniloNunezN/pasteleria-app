import React, { useState } from 'react';

export const AboutView: React.FC = () => {
  const [modalImage, setModalImage] = useState<{ src: string; caption: string } | null>(null);

  const galleryItems = [
    {
      src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      caption: 'Nuestra cocina artesanal equipada con la mejor tecnología, donde cada mañana horneamos con ingredientes frescos y seleccionados.',
      title: 'Nuestra Cocina Artesanal',
    },
    {
      src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
      caption: 'Parte de nuestro apasionado equipo pastelero, enfocado en preparar las recetas tradicionales que nos caracterizan.',
      title: 'El Equipo Pastelero',
    },
    {
      src: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      caption: 'Inolvidable hito de 1995: el día en que elaboramos la torta más grande de la región y entramos al libro de Récord Guinness.',
      title: 'El Día del Récord Guinness (1995)',
    },
    {
      src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      caption: 'Cada detalle decorativo es realizado 100% a mano por nuestros maestros pasteleros antes de salir a tienda.',
      title: 'Detalles Hechos a Mano',
    },
  ];

  return (
    <div className="my-5">
      <div className="p-5 mb-5 rounded-4 text-center bg-light border shadow-sm">
        <h1 className="fw-bold mb-3" style={{ color: 'var(--color-chocolate, #4A2E18)', fontFamily: 'Pacifico, cursive, sans-serif' }}>
          Nuestra Historia &amp; Pasión
        </h1>
        <p className="lead text-muted mx-auto mb-0" style={{ maxWidth: '750px' }}>
          Más de 50 años de tradición. Conoce los ingredientes de calidad, los momentos dulces y el equipo que hace magia en nuestro horno cada día.
        </p>
      </div>

      <div className="card border-0 shadow-sm p-4 p-md-5 mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <h3 className="fw-bold mb-3" style={{ color: 'var(--color-chocolate, #4A2E18)' }}>
              Nuestra Historia
            </h3>
            <p className="text-muted">
              El origen de <strong>Mil Sabores</strong> se remonta 50 años atrás, cuando nuestra fundadora tomó recetas de repostería tradicionales de Chile y les dio un toque personal. Algo que empezó como un emprendimiento familiar creció de manera imprevista y no fue hasta 1995, año en que batió un récord Guinness gracias a su colaboración en la torta más grande del mundo, que su reconocimiento traspasó las fronteras. Desde entonces, trabajamos con amor y dedicación al entregar la mejor calidad para acompañar con cariño cualquier ocasión.
            </p>
            <h5 className="fw-bold mt-4 mb-2">Adaptados a todos los paladares</h5>
            <p className="text-muted">
              Los tiempos cambian y la tradición debe adaptarse. En nuestra pastelería siempre habrá un sabor para cada persona; es por eso que hemos expandido nuestro catálogo para incluir opciones veganas, sin azúcar y sin gluten, entre otras. ¡Nuestra prioridad es que todos nuestros clientes tengan un dulce recuerdo!
            </p>
            <h5 className="fw-bold mt-4 mb-2">Sabores de ayer, hoy y mañana</h5>
            <p className="text-muted mb-0">
              Desde nuestra concepción, Mil Sabores se ha destacado por experimentar para dar un giro a sabores clásicos. En gustos no hay nada escrito y por ello en cada pedido puedes encontrar tradición e innovación. Es por esto que estamos orgullosos de trabajar con la comunidad y con <strong>Duoc UC</strong>, fomentando la carrera de futuros talentos gastronómicos que llevarán la alegría a nuevas generaciones.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <img
              src="/Logo_pasteleria_mil_sabores.png"
              alt="Pastelería Mil Sabores"
              className="img-fluid rounded-4 shadow-sm mb-3"
              style={{ maxHeight: '320px', objectFit: 'contain' }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 text-center">
            <div className="display-6 mb-3">🎯</div>
            <h4 className="fw-bold mb-3" style={{ color: 'var(--color-chocolate, #4A2E18)' }}>Misión</h4>
            <p className="text-muted mb-0">
              Crear momentos inolvidables a través de la repostería artesanal, combinando ingredientes de la más alta calidad con recetas tradicionales e innovadoras que deleiten a cada uno de nuestros clientes en Pastelería Mil Sabores.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 text-center">
            <div className="display-6 mb-3">🌟</div>
            <h4 className="fw-bold mb-3" style={{ color: 'var(--color-chocolate, #4A2E18)' }}>Visión</h4>
            <p className="text-muted mb-0">
              Ser reconocidos nacional e internacionalmente como la pastelería referente en innovación, calidad y tradición, llevando dulzura y sonrisas a cada hogar con responsabilidad, pasión y amor por el oficio repostero.
            </p>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-4 p-md-5 mb-5 text-white" style={{ backgroundColor: 'var(--color-chocolate, #4A2E18)' }}>
        <div className="d-flex align-items-center flex-column flex-md-row gap-4">
          <div className="display-2 text-warning">🏆</div>
          <div>
            <h3 className="fw-bold mb-2 text-warning">Orgullo de Récord Guinness (1995)</h3>
            <p className="mb-0 text-white-50">
              En el año <strong>1995</strong> marcamos un hito histórico al elaborar <strong>el pastel más grande de la región</strong>, logrando un Récord Guinness oficial. Este logro refleja la entrega, técnica y pasión de todo nuestro equipo, una tradición de excelencia que mantenemos viva hasta el día de hoy en cada uno de nuestros productos.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold" style={{ color: 'var(--color-chocolate, #4A2E18)' }}>Detrás de Cámara</h3>
          <p className="text-muted small">Un vistazo a nuestra cocina, eventos y momentos especiales de elaboración artesanal.</p>
        </div>

        <div className="row g-4">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-3">
              <div
                className="card h-100 border-0 shadow-sm overflow-hidden"
                style={{ cursor: 'pointer' }}
                onClick={() => setModalImage({ src: item.src, caption: item.caption })}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body p-3 text-center">
                  <h6 className="fw-bold mb-1 small">{item.title}</h6>
                  <span className="text-primary small" style={{ fontSize: '0.75rem' }}>Ampliar foto 🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalImage && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={() => setModalImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark text-white border-0 shadow-lg overflow-hidden">
              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                onClick={() => setModalImage(null)}
              ></button>
              <div className="modal-body p-0 text-center">
                <img
                  src={modalImage.src}
                  className="img-fluid w-100"
                  alt="Ampliación"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>
              <div className="modal-footer justify-content-center bg-dark border-0 p-3">
                <p className="m-0 text-center text-light small">{modalImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};