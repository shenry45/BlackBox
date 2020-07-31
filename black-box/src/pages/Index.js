import React from 'react';

import Hero from '../components/Index/Hero';
import Tagline from '../components/Tagline';
import Genres from '../components/Genres';
import Results from '../components/Results';

const Index = () => {
  return (
    <>
      <Hero />
      <Genres />
      <Tagline />
      <Results />
    </>
  )
}

export default Index;