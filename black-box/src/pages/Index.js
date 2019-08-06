import React from 'react';

import Hero from '../components/Index/Hero';
import Tagline from '../components/Tagline';

const Index = () => {
  return (
    <div>
      <section>
        <h1>Index Page</h1>
        <p>Your home of stuff</p>
        <Hero />
        <Tagline />
      </section>
    </div>
  )
}

export default Index;