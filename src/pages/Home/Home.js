import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import '../../components/styles/home.css'; // Ensure you have a corresponding CSS for general page styling

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <main className="home-content">
        {/* Main content area - could include the globe or other components */}
        <section className="intro">
          <h1>Welcome to Lab4GPS</h1>
          <p>A Journey from the Heavens to Humanity</p>
          <p>
            As you enter the Lab4GPS website, you are greeted by an awe-inspiring view of Earth from space.
            The globe rotates slowly, majestically, as if you're watching it from a satellite orbiting the cosmos.
            This isn't just any digital representation of Earth; it’s a living, breathing canvas where real-time human struggles and stories unfold.
          </p>
        </section>
        {/* Placeholder for the Globe component */}
        {/* <Globe /> */}
        <section className="features">
          <h2>Explore Our Solutions</h2>
          <p>Discover how we address global problems with innovative solutions.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
