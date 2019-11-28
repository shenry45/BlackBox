import React from 'react';

import Hero from '../components/Index/Hero';
import Tagline from '../components/Tagline';
import Genres from '../components/Genres';
import Results from '../components/Results';

const Index = () => {
  return (
    <div>
      <section>
        <Hero />
        <Genres />
        <Tagline />
        <Results />
      </section>
    </div>
  )
}

export default Index;