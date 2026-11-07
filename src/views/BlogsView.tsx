import React, { useState } from 'react';

export const BlogsView: React.FC = () => {
  const [showReceta, setShowReceta] = useState(false);

  if (showReceta) {
    return (
      <div className="my-4">
        <div className="mb-4">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setShowReceta(false)}
          >
            ← Volver a Blogs
          </button>
        </div>

        <section className="contenedor-articulo">
          <article className="articulo-completo">
            <div className="img-articulo">
              <img
                src="/receta_torta_maracuya.jpg"
                alt="Torta de Maracuyá"
              />
            </div>

            <div className="contenido-articulo">
              <span className="categoria-blog">Recetas</span>
              <h3>La mejor torta tropical que puede existir.</h3>
              <p className="autor">Mil Sabores</p>

              <p>
                Aprende paso a paso cómo lograr un bizcocho esponjoso y un relleno fenomenal con esta receta infalible, ideal para celebrar cualquier ocasión especial.
              </p>

              <div className="ingredientes-grid">
                <div className="ingredientes-columna">
                  <h4>Ingredientes bizcocho:</h4>
                  <ul>
                    <li>270 g de mantequilla sin sal a temperatura ambiente</li>
                    <li>75 g de aceite de canola o vegetal</li>
                    <li>740 g de azúcar blanca</li>
                    <li>6 huevos</li>
                    <li>210 ml de jugo de maracuyá</li>
                    <li>150 ml de leche de cualquier tipo</li>
                    <li>3 cdtas de sal</li>
                    <li>3 cdtas Polvos de Hornear Gourmet</li>
                    <li>600 g de harina sin polvos de hornear</li>
                  </ul>
                </div>

                <div className="ingredientes-columna">
                  <h4>Ingredientes relleno:</h4>
                  <ul>
                    <li>500g de pulpa de maracuyá</li>
                    <li>100 g de azúcar</li>
                  </ul>
                </div>
              </div>

              <div className="ingredientes-grid">
                <div className="ingredientes-columna">
                  <h4>Preparación bizcocho:</h4>
                  <p><strong>Paso 1:</strong> Batir la mantequilla con el azúcar y aceite hasta que se haya aclarado la mezcla.</p>
                  <p><strong>Paso 2:</strong> Agregar los huevos y batir nuevamente hasta incorporarlos bien y que se vea aireado.</p>
                  <p><strong>Paso 3:</strong> Agregar la leche y jugo de maracuyá y mezclar. Se puede ver como que estuviera cortado, pero con la harina regresa a la normalidad.</p>
                  <p><strong>Paso 4:</strong> Agregar la harina, Polvos de Hornear, sal y mezclar.</p>
                  <p><strong>Paso 5:</strong> Preparar 2 moldes de 25 cm de diámetro aceitando el molde y poniendo papel para hornear en la base, cortado al tamaño preciso.</p>
                  <p><strong>Paso 6:</strong> Poner 2/3 de la mezcla adentro de un molde y el resto en el otro.</p>
                  <p><strong>Paso 7:</strong> Hornear por separado en un horno precalentado a 180°C por 40 min-1 hora en el caso del molde con más masa y 30 min el de menos masa.</p>
                  <p><strong>Paso 8:</strong> Desmoldar una vez que se hayan enfriado por completo.</p>
                  <p><strong>Paso 9:</strong> Con un cuchillo de panadería grande, nivelar las tortas, retirando la cúpula.</p>
                  <p><strong>Paso 10:</strong> La torta grande se corta en 2, para tener en total 3 capas de torta.</p>
                </div>

                <div className="ingredientes-columna">
                  <h4>Preparación relleno:</h4>
                  <p><strong>Paso 1:</strong> Cocinar la pulpa y azúcar a fuego medio-alto hasta que solo quede la mitad del volumen original.</p>
                  <p><strong>Paso 2:</strong> Dejar que se enfríen por completo antes de usarla.</p>

                  <h4>Preparación frosting:</h4>
                  <p><strong>Paso 1:</strong> Batir la mantequilla usando una batidora eléctrica por 5 minutos.</p>
                  <p><strong>Paso 2:</strong> Agregar el queso crema y repetir el proceso.</p>
                  <p><strong>Paso 3:</strong> Agregar el azúcar usando un colador para cernirla y batir hasta que se haya incorporado.</p>
                  <p><strong>Paso 4:</strong> Poner la primera capa de torta sobre el plato donde se servirá.</p>
                  <p><strong>Paso 5:</strong> Poner un poco de buttercream encima y esparcirlo.</p>
                  <p><strong>Paso 6:</strong> Crear una pequeña forma de piscina en el centro y ahí esparcir ¼ de la salsa de maracuyá.</p>
                  <p><strong>Paso 7:</strong> Encima poner la siguiente capa de torta y repetir el proceso. Terminar con la tercera capa de torta.</p>
                  <p><strong>Paso 8:</strong> Esparcir buttercream con una espátula todo alrededor de la torta y en la parte superior. Con lo que sobre puedes hacer decoraciones adicionales.</p>
                  <p><strong>Paso 9:</strong> Poner lo que queda de salsa de maracuyá sobre la torta.</p>
                  <p><strong>Paso 10:</strong> Refrigerar un par de horas antes de cortarla para que no se desarme.</p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    );
  }

  return (
    <div className="my-5">
      <div className="titulo-destacados">
        <h2>Blog y Comunidad</h2>
        <p>Descubre noticias sobre repostería, recetas y los mejores consejos de gastronomía.</p>
      </div>

      <section className="grid-blogs">
        <article className="blog-card">
          <div className="img-blog">
            <img
              src="/porta_receta_maracuya.jpg"
              alt="Receta de repostería"
            />
          </div>
          <div className="contenido-blog">
            <span className="categoria-blog">Recetas</span>
            <h3>La mejor torta tropical: Maracuyá</h3>
            <p className="autor">Mil Sabores</p>
            <p>Aprende paso a paso cómo lograr un bizcocho esponjoso y un relleno brillante con esta receta infalible.</p>
            <button
              className="btn-leer border-0"
              onClick={() => setShowReceta(true)}
            >
              Leer artículo
            </button>
          </div>
        </article>

        <article className="blog-card">
          <div className="img-blog">
            <img
              src="https://www.duoc.cl/wp-content/uploads/2026/06/compressed-valpo-4.jpg"
              alt="Noticias de repostería"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div className="contenido-blog">
            <span className="categoria-blog">Noticias</span>
            <h3>ChefTalks! 2026 con Carolina Bazán</h3>
            <p className="autor">DuocUC</p>
            <p>Descubre los datelles del evento progatonizado por Duoc UC y Carolina Bazán.</p>
            <a
              href="https://www.duoc.cl/?noticia_post_type=carolina-bazan-inauguro-las-cheftalks-2026-en-duoc-uc"
              className="btn-leer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leer artículo
            </a>
          </div>
        </article>

        <article className="blog-card">
          <div className="img-blog">
            <img
              src="https://images.unsplash.com/photo-1761095596618-081ea3f043a5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0"
              alt="Consejos de repostería"
            />
          </div>
          <div className="contenido-blog">
            <span className="categoria-blog">Consejos</span>
            <h3>Descubre las mejores recetas Michelin Star</h3>
            <p className="autor">Great British Chef</p>
            <p>Directamente desde los mejores restarurantes del mundo a tu casa, sigue los consejos y recetas Michelin Star.</p>
            <a
              href="https://www.greatbritishchefs.com/collections/michelin-star-recipes"
              className="btn-leer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leer artículo
            </a>
          </div>
        </article>
      </section>
    </div>
  );
};