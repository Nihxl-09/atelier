
import { useEffect, useRef, useState } from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "Casa Nera",
    category: "Residential",
    location: "Goa, India",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "02",
    title: "House on the Ridge",
    category: "Residential",
    location: "Karnataka, India",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "03",
    title: "Stillwater Retreat",
    category: "Hospitality",
    location: "Kerala, India",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "04",
    title: "Courtyard 17",
    category: "Residential",
    location: "Bengaluru, India",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
  },
];

const journal = [
  {
    date: "12.06.26",
    title: "The Quiet Power of Natural Materials",
    category: "Materials",
  },
  {
    date: "28.05.26",
    title: "Designing Around Courtyards",
    category: "Architecture",
  },
  {
    date: "09.04.26",
    title: "Why Light Changes Architecture",
    category: "Perspective",
  },
];

function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
    visible: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: true,
      });
    };

    const handlePointerLeave = () => {
      setCursor((current) => ({
        ...current,
        visible: false,
      }));
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="site">
      <div
        className={`custom-cursor ${cursor.visible ? "cursor-visible" : ""}`}
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
        }}
      />

      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <button
          className="brand"
          onClick={() => scrollToSection("top")}
          aria-label="Atelier home"
        >
          ATELIER
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
          <button onClick={() => scrollToSection("studio")}>Studio</button>
          <button onClick={() => scrollToSection("approach")}>Approach</button>
          <button onClick={() => scrollToSection("journal")}>Journal</button>
        </nav>

        <button className="contact-link" onClick={() => scrollToSection("contact")}>
          Contact
        </button>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <Reveal className="hero-intro">
            <div className="hero-kicker">
              <span className="eyebrow">Independent architecture studio</span>
            </div>

            <div>
              <h1>
                Spaces shaped
                <br />
                by <em>light,</em>
                <br />
                material and place.
              </h1>

              <div className="hero-bottom">
                <p>
                  Atelier is an independent architecture and interior studio
                  creating considered spaces for living, gathering and retreat.
                </p>

                <button
                  className="text-button"
                  onClick={() => scrollToSection("projects")}
                >
                  Explore selected work
                  <span>↘</span>
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal className="hero-image-reveal">
            <div className="hero-image-wrap">
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
                alt="Contemporary architectural interior"
              />

              <div className="hero-image-caption">
                <span>Casa Nera</span>
                <span>01 / 04</span>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="projects section" id="projects">
          <Reveal className="section-heading">
            <div>
              <span className="section-number">01</span>
              <span className="section-label">Selected work</span>
            </div>

            <p>
              A selection of residential and hospitality projects shaped by
              context, material and the everyday rituals of living.
            </p>
          </Reveal>

          <div className="project-list">
            {projects.map((project, index) => (
              <Reveal
                key={project.title}
                className={`project-item project-${index + 1}`}
              >
                <div
                  onMouseEnter={() => setActiveProject(project.number)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <div className="project-meta">
                    <span>{project.number}</span>

                    <div>
                      <span>{project.category}</span>
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>

                  <div className="project-title">
                    <h2>{project.title}</h2>
                    <span>{project.year}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="statement section" id="studio">
          <Reveal className="statement-label">
            <span className="section-number">02</span>
            <span className="section-label">The studio</span>
          </Reveal>

          <Reveal className="statement-content">
            <h2>
              We design places that become part of how people <em>live.</em>
            </h2>

            <div className="statement-details">
              <p>
                Our work begins with observation. We look closely at climate,
                light, landscape, materials and the habits of the people who
                will inhabit a space.
              </p>

              <p>
                From the first sketch to the final detail, we believe good
                architecture comes from doing less, but doing it with greater
                intention.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="approach section" id="approach">
          <Reveal className="section-heading">
            <div>
              <span className="section-number">03</span>
              <span className="section-label">Our approach</span>
            </div>

            <p>
              Four stages guide every project, from the first observation to
              the final refinement.
            </p>
          </Reveal>

          <div className="approach-grid">
            {[
              [
                "01",
                "Observe",
                "Understanding the character of a place before deciding what belongs there.",
              ],
              [
                "02",
                "Frame",
                "Establishing a clear architectural language from context, proportion and light.",
              ],
              [
                "03",
                "Shape",
                "Developing spaces and materials until form and function become inseparable.",
              ],
              [
                "04",
                "Refine",
                "Removing what is unnecessary and giving every remaining detail a reason to exist.",
              ],
            ].map(([number, title, text], index) => (
              <Reveal key={title} className="approach-reveal">
                <article style={{ "--delay": `${index * 80}ms` }}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="feature-project section">
          <Reveal className="feature-top">
            <div>
              <span className="section-number">04</span>
              <span className="section-label">Featured project</span>
            </div>

            <span className="feature-index">02 / 04</span>
          </Reveal>

          <Reveal className="feature-image-reveal">
            <div className="feature-image">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=90"
                alt="House on the Ridge"
              />

              <div className="feature-caption">
                <span>House on the Ridge</span>
                <span>Karnataka, India</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="feature-info">
            <div>
              <h2>House on the Ridge</h2>
              <p>
                A private residence positioned carefully within its natural
                landscape, using courtyards and controlled openings to bring
                the outside inward.
              </p>
            </div>

            <div className="project-facts">
              <div>
                <span>Location</span>
                <strong>Karnataka, India</strong>
              </div>

              <div>
                <span>Area</span>
                <strong>4,800 sq ft</strong>
              </div>

              <div>
                <span>Year</span>
                <strong>2025</strong>
              </div>

              <div>
                <span>Type</span>
                <strong>Private residence</strong>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="journal section" id="journal">
          <Reveal className="section-heading">
            <div>
              <span className="section-number">05</span>
              <span className="section-label">Journal</span>
            </div>

            <p>
              Notes on architecture, materials and the details that shape
              everyday spaces.
            </p>
          </Reveal>

          <div className="journal-list">
            {journal.map((article) => (
              <Reveal key={article.title}>
                <article className="journal-item">
                  <span>{article.date}</span>

                  <div>
                    <span className="journal-category">{article.category}</span>
                    <h3>{article.title}</h3>
                  </div>

                  <span className="journal-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <Reveal className="contact-number">06</Reveal>

          <Reveal className="contact-content">
            <span className="eyebrow">Start a conversation</span>

            <h2>
              Have a place
              <br />
              <em>in mind?</em>
            </h2>

            <a href="mailto:hello@atelier-studio.example">hello@atelier-studio.example</a>
          </Reveal>

          <div className="contact-footer">
            <span>Atelier Studio</span>
            <span>India · Worldwide</span>
            <span>© 2026</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
