import './index.css'

export default function App() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
          <li><a href="#home" className="navbar-link">Home</a></li>
          <li><a href="#features" className="navbar-link">Campaigns</a></li>
          <li><a href="#pricing" className="navbar-link">Create</a></li>
          <li><a href="#contact" className="navbar-link">About</a></li>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <h1 className="hero-h1">
          RAISE VERIFIED<br>
          </br> FUNDS WITH<br>
          </br> <span className="hero-span">
          TRANSPARENCY<br></br>
          & TRUST</span>
        </h1>
        <p className="hero-p">
          Every donation traceable on-chain, every beneficairy verified.
          The future of crowdfunding is herer.
        </p>
      </section>

      {/* button */}
      <div className="button-1">Start a Campaign</div>
      <div className="button-2">Donate Now</div>
     
    </div>
  )
}