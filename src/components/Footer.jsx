
export default function Footer() {
  return (
    <footer className="relative bg-studio-black border-t border-studio-white/10 pt-20 pb-10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-12 mb-20">

          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="font-serif text-3xl text-studio-white mb-6">Sanjay Studio</h3>
            <p className="text-studio-white/60 text-sm leading-relaxed max-w-sm">
              Capturing the raw, unscripted beauty of human connection. Based in Ranchi, available worldwide for weddings and editorial commissions.
            </p>
            <div className="mt-8 flex gap-6">
              <SocialLink href="#" label="Instagram" icon={<InstagramIcon />} />
              <SocialLink href="#" label="Facebook" icon={<FacebookIcon />} />
              <SocialLink href="#" label="YouTube" icon={<YouTubeIcon />} />
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-medium uppercase tracking-widest text-studio-accent mb-6">Explore</h4>
            <ul className="space-y-4">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/portfolio" label="Portfolio" />
              <FooterLink href="/services" label="Services" />
              <FooterLink href="/about" label="About Us" />
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-medium uppercase tracking-widest text-studio-accent mb-6">Inquiries</h4>
            <ul className="space-y-4 text-sm text-studio-white/60">
              <li><a href="mailto:hello@sanjaystudio.com" className="hover:text-studio-white transition-colors">hello@sanjaystudio.com</a></li>
              <li>+91 987 654 3210</li>
              <li className="pt-4">
                Ratu Kathitand,<br />Ranchi, Jharkhand – 835222
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-studio-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-studio-white/30 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Sanjay Studio. All rights reserved.</p>
          <p>Designed with Intent.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }) {
  return (
    <a href={href} className="group flex items-center gap-2 text-xs uppercase tracking-widest text-studio-white/50 hover:text-studio-accent transition-colors">
      <span className="group-hover:-translate-y-1 transition-transform duration-300">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function InstagramIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="1.5" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round" /></svg>;
}

function FacebookIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function YouTubeIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" /></svg>;
}

function FooterLink({ href, label }) {
  return (
    <li>
      <a href={href} className="text-sm text-studio-white/60 hover:text-studio-white transition-colors">
        {label}
      </a>
    </li>
  );
}
