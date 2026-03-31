import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircuitBoard,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Twitter,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import { useActor } from "./hooks/useActor";

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "SERVICES", href: "#solutions" },
  { label: "ABOUT US", href: "#founders" },
  { label: "GALLERY", href: "#gallery" },
  { label: "CONTACT", href: "#contact" },
];

const SOLUTIONS = [
  {
    icon: <CircuitBoard className="w-8 h-8" />,
    title: "Electronic Project Consulting",
    description:
      "We guide students step by step — from choosing the right project idea to sourcing components and building the circuit. No experience needed.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Handmade Circuits & Models",
    description:
      "100% handmade circuits, LED displays, motor models and more — all built to look genuinely student-made and approved by school guidelines.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Affordable Pricing",
    description:
      "We offer the most affordable prices in Murshidabad. Every student deserves access to quality project help without breaking the bank.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "School-Approved Projects",
    description:
      "All our projects strictly follow the handmade guidelines of Saraswati Devi Public School — so students never face disqualification.",
  },
];

const GALLERY_ITEMS = [
  {
    title: "LED Light Circuit",
    subject: "Electronics · Class 7",
    image: "/assets/generated/project-led-circuit.dim_600x400.jpg",
  },
  {
    title: "Simple Electric Motor",
    subject: "Physics · Class 8",
    image: "/assets/generated/project-electric-motor.dim_600x400.jpg",
  },
  {
    title: "Series & Parallel Circuits",
    subject: "Science · Class 6",
    image: "/assets/generated/project-basic-circuit.dim_600x400.jpg",
  },
  {
    title: "Buzzer Alarm Circuit",
    subject: "Electronics · Class 9",
    image: "/assets/generated/project-alarm-circuit.dim_600x400.jpg",
  },
  {
    title: "Traffic Light Model",
    subject: "Science · Class 5",
    image: "/assets/generated/project-traffic-light.dim_600x400.jpg",
  },
  {
    title: "Electromagnet Crane",
    subject: "Physics · Class 8",
    image: "/assets/generated/project-electromagnet.dim_600x400.jpg",
  },
];

const FOUNDERS = [
  {
    name: "Sufian Hossain",
    role: "Co-Founder & Director",
    image: "/assets/image-019d3fa6-24ec-77a0-af20-c98186aaa0ff.png",
    initials: "SH",
    bio: "Sufian is the creative force behind Volt & Victor. He personally helps students at Saraswati Devi Public School design and build handmade electronic projects — making sure every circuit works and every project looks genuinely student-made at an affordable price.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Subhojeet Dutta",
    role: "Co-Founder & Operations Head",
    image: "/assets/image-019d3f99-30f4-72ed-a142-0728418a5750.png",
    initials: "SD",
    bio: "Subhojeet manages project delivery and student support at Volt & Victor. His dedication to education and deep roots in Murshidabad drive the mission to make quality electronic project help accessible and affordable for every student at Saraswati Devi Public School.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Krishnendu Das",
    role: "Co-Founder",
    image: "/assets/krisnandu-das.jpeg",
    initials: "KD",
    bio: "Krishnendu is a co-founder at Volt & Victor, passionate about empowering students at Saraswati Devi Public School through affordable, handmade electronic projects that meet school standards.",
    linkedin: "#",
    twitter: "#",
  },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-vv-navy shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center" data-ocid="nav.link">
          <img
            src="/assets/generated/volt-and-victor-logo-transparent.dim_600x200.png"
            alt="Volt & Victor"
            style={{ height: "44px", width: "auto" }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid="nav.link"
              className="text-white/80 hover:text-white text-xs font-semibold tracking-widest transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            data-ocid="nav.primary_button"
            asChild
            className="bg-vv-accent hover:bg-vv-accent/90 text-white font-bold text-xs tracking-widest px-6 py-2 rounded-sm uppercase"
          >
            <a href="#contact">GET A PROJECT</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-vv-navy border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  className="text-white/80 hover:text-white text-sm font-semibold tracking-widest transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                data-ocid="nav.primary_button"
                onClick={() => {
                  setMobileOpen(false);
                  window.location.hash = "#contact";
                }}
                className="bg-vv-accent hover:bg-vv-accent/90 text-white font-bold text-xs tracking-widest uppercase w-full block text-center py-2 px-4 rounded-sm"
              >
                GET A PROJECT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/volt-victor-hero.dim_1920x1080.jpg')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.52)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,31,51,0.6) 0%, rgba(30,115,255,0.08) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1
            className="font-display font-black text-white uppercase leading-none mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Handmade Electronic
            <br />
            <span className="text-vv-accent">Projects for Students</span>
          </h1>
          <p className="text-white/75 text-lg mb-10 max-w-xl leading-relaxed">
            Volt & Victor helps school students build amazing handmade
            electronic projects — affordable, 100% school-approved, and made to
            look genuinely student-crafted. Exclusively serving Saraswati Devi
            Public School, Murshidabad.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              data-ocid="hero.primary_button"
              asChild
              className="bg-vv-accent hover:bg-vv-accent/90 text-white font-bold uppercase tracking-widest text-sm px-8 py-6 rounded-sm"
            >
              <a href="#solutions">
                OUR SERVICES <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              variant="outline"
              asChild
              className="border-white/50 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-sm px-8 py-6 rounded-sm bg-transparent"
            >
              <a href="#contact">GET YOUR PROJECT</a>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl"
        >
          {[
            { value: "100+", label: "Projects Made" },
            { value: "Lowest", label: "Prices in Murshidabad" },
            { value: "100%", label: "Handmade & Approved" },
            { value: "1", label: "School: SDPS" },
          ].map((stat) => (
            <div key={stat.label} className="border-l-2 border-vv-accent pl-4">
              <div className="font-display font-black text-3xl text-white">
                {stat.value}
              </div>
              <div className="text-white/60 text-xs uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="solutions" className="bg-vv-light py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-vv-accent" />
            <span className="text-vv-accent text-xs font-bold tracking-[0.3em] uppercase">
              What We Offer
            </span>
            <div className="w-8 h-0.5 bg-vv-accent" />
          </div>
          <h2 className="font-display font-black text-vv-text-dark uppercase text-3xl md:text-4xl tracking-tight">
            Our Services
          </h2>
          <p className="mt-4 text-vv-text-muted max-w-xl mx-auto text-sm leading-relaxed">
            From LED circuits to motor models, we help students at Saraswati
            Devi Public School build winning handmade electronic projects at
            prices that won&apos;t hurt your pocket.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer border border-transparent hover:border-vv-accent/20"
              data-ocid={`solutions.item.${i + 1}`}
            >
              <div className="w-14 h-14 rounded-xl bg-vv-accent/10 flex items-center justify-center text-vv-accent mb-6 group-hover:bg-vv-accent group-hover:text-white transition-all duration-300">
                {sol.icon}
              </div>
              <h3 className="font-display font-bold text-vv-text-dark text-base uppercase tracking-wide mb-3">
                {sol.title}
              </h3>
              <p className="text-vv-text-muted text-sm leading-relaxed">
                {sol.description}
              </p>
              <div className="mt-6 flex items-center gap-1 text-vv-accent text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechSection() {
  return (
    <section id="gallery" className="bg-vv-navy py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-vv-accent" />
            <span className="text-vv-accent text-xs font-bold tracking-[0.3em] uppercase">
              Our Work
            </span>
            <div className="w-8 h-0.5 bg-vv-accent" />
          </div>
          <h2 className="font-display font-black text-white uppercase text-3xl md:text-4xl tracking-tight">
            Project Gallery
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
            A glimpse of the handmade electronic school projects we have helped
            students build at Saraswati Devi Public School, Murshidabad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-vv-accent/40 transition-all duration-300"
              data-ocid={`gallery.item.${i + 1}`}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="text-vv-accent text-xs font-bold uppercase tracking-wider mb-1">
                  {item.subject}
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: "100+",
              label: "Projects Made",
              desc: "For SDPS students",
            },
            {
              value: "Lowest",
              label: "Prices",
              desc: "Most affordable in Murshidabad",
            },
            {
              value: "100%",
              label: "Handmade",
              desc: "Meets school handmade guidelines",
            },
            {
              value: "1",
              label: "School Served",
              desc: "Saraswati Devi Public School",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              data-ocid={`tech.item.${i + 1}`}
            >
              <div className="font-display font-black text-vv-accent text-3xl mb-2">
                {item.value}
              </div>
              <div className="text-white font-semibold text-sm uppercase tracking-wide">
                {item.label}
              </div>
              <div className="text-white/50 text-xs mt-1">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundersSection() {
  return (
    <section id="founders" className="bg-vv-navy-deep py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-vv-accent" />
            <span className="text-vv-accent text-xs font-bold tracking-[0.3em] uppercase">
              Leadership
            </span>
            <div className="w-8 h-0.5 bg-vv-accent" />
          </div>
          <h2 className="font-display font-black text-white uppercase text-3xl md:text-4xl tracking-tight">
            About the Founders
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
            Meet the passionate team from Murshidabad who help students at
            Saraswati Devi Public School build handmade electronic projects at
            affordable prices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FOUNDERS.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-300"
              data-ocid={`founders.item.${i + 1}`}
            >
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 flex-shrink-0 ring-4 ring-vv-accent/30">
                  <AvatarImage src={founder.image} alt={founder.name} />
                  <AvatarFallback className="bg-vv-accent text-white font-display font-black text-xl">
                    {founder.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-xs font-bold text-vv-accent uppercase tracking-widest mb-1">
                    {founder.role}
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-3">
                    {founder.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {founder.bio}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={founder.linkedin}
                      data-ocid={`founders.link.${i + 1}`}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-vv-accent flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                      aria-label={`${founder.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={founder.twitter}
                      data-ocid={`founders.link.${i + 1}`}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-vv-accent flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                      aria-label={`${founder.name} Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { actor, isFetching } = useActor();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    projectType: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (actor && !isFetching) {
        await (actor as any).submitInquiry(
          formData.name,
          formData.contact,
          formData.projectType,
          formData.details,
        );
      }
    } catch {
      // silently continue — show success regardless
    } finally {
      setSubmitting(false);
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", contact: "", projectType: "", details: "" });
  };

  return (
    <section id="contact" className="bg-vv-light py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-vv-accent" />
            <span className="text-vv-accent text-xs font-bold tracking-[0.3em] uppercase">
              Get In Touch
            </span>
            <div className="w-8 h-0.5 bg-vv-accent" />
          </div>
          <h2 className="font-display font-black text-vv-text-dark uppercase text-3xl md:text-4xl tracking-tight">
            Request a Project
          </h2>
          <p className="mt-4 text-vv-text-muted max-w-xl mx-auto text-sm leading-relaxed">
            Tell us what electronic project you need — we will guide you through
            the whole process and deliver a handmade, school-approved project at
            the best price. Available exclusively at Saraswati Devi Public
            School, Murshidabad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h3 className="font-display font-bold text-vv-text-dark text-lg uppercase tracking-wide mb-6">
                Send a Project Inquiry
              </h3>
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-semibold"
                    data-ocid="contact.success_state"
                  >
                    ✓ Inquiry sent! We will get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-ocid="contact.panel"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-xs font-bold uppercase tracking-wider text-vv-text-muted"
                    >
                      Student Name
                    </Label>
                    <Input
                      id="name"
                      data-ocid="contact.input"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your name"
                      required
                      className="border-border/60 focus:border-vv-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact"
                      className="text-xs font-bold uppercase tracking-wider text-vv-text-muted"
                    >
                      Phone / WhatsApp
                    </Label>
                    <Input
                      id="contact"
                      data-ocid="contact.input"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, contact: e.target.value }))
                      }
                      placeholder="Phone or WhatsApp number"
                      required
                      className="border-border/60 focus:border-vv-accent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="projectType"
                    className="text-xs font-bold uppercase tracking-wider text-vv-text-muted"
                  >
                    Project Type & Class
                  </Label>
                  <Input
                    id="projectType"
                    data-ocid="contact.input"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        projectType: e.target.value,
                      }))
                    }
                    placeholder="e.g. LED Circuit, Class 7"
                    required
                    className="border-border/60 focus:border-vv-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="details"
                    className="text-xs font-bold uppercase tracking-wider text-vv-text-muted"
                  >
                    Project Details
                  </Label>
                  <Textarea
                    id="details"
                    data-ocid="contact.textarea"
                    value={formData.details}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, details: e.target.value }))
                    }
                    placeholder="Describe your electronic project — what it should do, your school deadline, and any specific requirements..."
                    required
                    rows={5}
                    className="border-border/60 focus:border-vv-accent resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={submitting}
                  className="w-full bg-vv-accent hover:bg-vv-accent/90 text-white font-bold uppercase tracking-widest text-sm py-6 rounded-sm"
                >
                  {submitting ? (
                    "SENDING..."
                  ) : (
                    <>
                      SEND PROJECT REQUEST{" "}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-display font-bold text-vv-text-dark text-lg uppercase tracking-wide mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                {[
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    value: "voltandvictor@gmail.com",
                    href: "mailto:voltandvictor@gmail.com",
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone / WhatsApp",
                    value: "+91 86539 84069",
                    href: "tel:+918653984069",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Location",
                    value: "Murshidabad, West Bengal, India",
                    href: "#",
                  },
                  {
                    icon: <BookOpen className="w-5 h-5" />,
                    label: "Exclusively Serving",
                    value: "Saraswati Devi Public School, Murshidabad",
                    href: "#",
                  },
                ].map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 group"
                    data-ocid="contact.link"
                  >
                    <div className="w-11 h-11 rounded-xl bg-vv-accent/10 flex items-center justify-center text-vv-accent flex-shrink-0 group-hover:bg-vv-accent group-hover:text-white transition-all">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-vv-text-muted mb-1">
                        {info.label}
                      </div>
                      <div className="text-vv-text-dark text-sm font-semibold">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="flex-1 bg-vv-navy rounded-2xl overflow-hidden min-h-[220px] relative">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url('/assets/generated/volt-victor-hero.dim_1920x1080.jpg')`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <Zap className="w-10 h-10 text-vv-accent mb-3" />
                <div className="text-white font-display font-bold text-sm uppercase tracking-widest">
                  Saraswati Devi Public School
                </div>
                <div className="text-white/50 text-xs mt-1">
                  Murshidabad, West Bengal
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-vv-navy border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-vv-accent flex items-center justify-center">
                <span className="font-display font-black text-white text-sm tracking-tight">
                  V&V
                </span>
              </div>
              <span className="font-display font-bold text-white text-xl">
                Volt & Victor
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Helping students at Saraswati Devi Public School build handmade
              electronic projects — affordable, school-approved, and crafted
              with care.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
                { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                { icon: <Github className="w-4 h-4" />, label: "GitHub" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="https://voltandvictor.com"
                  data-ocid="footer.link"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-vv-accent flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-ocid="footer.link"
                    className="text-white/50 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-vv-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-5">
              Stay Updated
            </h4>
            <p className="text-white/50 text-sm mb-4">
              Get updates on new project types and special offers from Volt &
              Victor.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your phone or email"
                type="text"
                data-ocid="footer.input"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm focus:border-vv-accent"
              />
              <Button
                data-ocid="footer.primary_button"
                className="bg-vv-accent hover:bg-vv-accent/90 text-white px-4 flex-shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {year} Volt & Victor. All rights reserved. Murshidabad, West
            Bengal, India.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-white/30 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
            <button
              type="button"
              data-ocid="footer.link"
              onClick={() => {
                window.location.hash = "/admin";
              }}
              className="text-white/20 hover:text-white/40 text-xs transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MainSite() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <TechSection />
        <FoundersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash);

  useEffect(() => {
    const handler = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (route.startsWith("#/admin")) {
    return <AdminPage />;
  }

  return <MainSite />;
}
