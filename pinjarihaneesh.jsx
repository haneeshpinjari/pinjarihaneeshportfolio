import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import VanillaTilt from 'vanilla-tilt';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const technologies = [
  { name: 'Python', icon: 'python-original' },
  { name: 'JavaScript', icon: 'javascript-original' },
  { name: 'React', icon: 'react-original' },
  { name: 'Node.js', icon: 'nodejs-original' },
  { name: 'MongoDB', icon: 'mongodb-original' },
  { name: 'Docker', icon: 'docker-original' }
];

const projects = [
  {
    title: 'Image Generation from Text',
    description: 'Deep learning model using GANs for generating images from text descriptions.',
    tags: ['Python', 'Deep Learning']
  },
  {
    title: 'Stock Price Prediction',
    description: 'ML model for predicting Google stock prices with 85% accuracy.',
    tags: ['Machine Learning', 'Data Analysis']
  },
  {
    title: 'Weather Application',
    description: 'Dynamic web app for real-time weather updates using public APIs.',
    tags: ['JavaScript', 'API Integration']
  }
];

export default function Portfolio() {
  const canvasRef = useRef(null);
  const techCardRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#3B82F6'
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    VanillaTilt.init(techCardRef.current, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="bg-gray-50">
      <div ref={canvasRef} className="fixed top-0 left-0 w-full h-screen z-[-1]" />

      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/widecanvas-d0dd4.appspot.com/o/logos%2Fhaneesh1-removebg-preview.jpg?alt=media&token=f4dce0de-7b90-420b-bc4f-1a8666fe8f83"
            alt="Logo" 
            className="h-12 w-12 rounded-full"
          />
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link text-gray-700 hover:text-blue-600">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen pt-20 flex items-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Pinjari Haneesh</h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 mb-6">Full Stack Developer & Data Analyst</h2>
            <p className="text-gray-600 mb-8">
              Aspiring developer with expertise in Python, JavaScript, React, and data visualization. Creating innovative solutions through code.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Button variant="default" className="bg-blue-600" asChild>
                <a href="mailto:pinjarihaneesh@outlook.com">Get in Touch</a>
              </Button>
              <Button variant="secondary" className="bg-gray-800 text-white" asChild>
                <a href="https://github.com/haneeshpinjari" target="_blank" rel="noopener noreferrer">
                  View GitHub
                </a>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 floating">
            <Card ref={techCardRef} className="tech-card bg-white p-8 rounded-2xl shadow-xl">
              <div className="grid grid-cols-3 gap-6">
                {technologies.map((tech) => (
                  <img 
                    key={tech.name}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}.svg`}
                    className="w-16 h-16"
                    alt={tech.name}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="project-card overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex space-x-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Get in Touch</h2>
          <Card className="max-w-4xl mx-auto p-8">
            <div className="flex flex-wrap justify-center space-x-8">
              {[
                { href: "mailto:pinjarihaneesh@outlook.com", icon: "envelope", text: "pinjarihaneesh@outlook.com" },
                { href: "tel:+917093070839", icon: "phone", text: "+91 70930 70839" },
                { href: "https://linkedin.com/in/haneeshpinjari", icon: "linkedin", text: "LinkedIn" }
              ].map((contact) => (
                <a
                  key={contact.text}
                  href={contact.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition duration-300"
                  target={contact.icon === "linkedin" ? "_blank" : undefined}
                  rel={contact.icon === "linkedin" ? "noopener noreferrer" : undefined}
                >
                  <i className={`bi bi-${contact.icon} text-2xl`} />
                  <span>{contact.text}</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #3B82F6, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}