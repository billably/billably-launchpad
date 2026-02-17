const Footer = () => (
  <footer className="border-t border-border/20">
    <div className="container max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <span className="text-lg font-semibold gradient-text">billably</span>
        <p className="text-xs text-surface-deep-foreground/60 mt-1">AI-powered legal operations for founders</p>
      </div>
      <nav className="flex items-center gap-6 text-sm text-surface-deep-foreground/60">
        <a href="#waitlist" className="hover:text-surface-deep-foreground transition-colors">Join the waitlist</a>
        <a href="#about" className="hover:text-surface-deep-foreground transition-colors">About us</a>
        <a href="#terms" className="hover:text-surface-deep-foreground transition-colors">Terms</a>
      </nav>
      <p className="text-xs text-surface-deep-foreground/60">© {new Date().getFullYear()} billably. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
