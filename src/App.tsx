
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Translator } from './components/Translator';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Translator />
        <FeaturesSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
