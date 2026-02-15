const Footer = () => (
  <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
    <div className="container max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <span className="text-lg font-semibold gradient-text">billably</span>
        <p className="text-xs text-muted-foreground mt-1">AI-powered legal operations for founders</p>
      </div>
      <nav className="flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#waitlist" className="hover:text-foreground transition-colors">Join the waitlist</a>
        <a href="#about" className="hover:text-foreground transition-colors">About us</a>
        <a href="#terms" className="hover:text-foreground transition-colors">Terms</a>
      </nav>
      <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} billably. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
