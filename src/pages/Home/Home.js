import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Globe from '../../components/Globe/Globe';
import { useLang } from '../../components/Context/LangContext'; 
import '../../components/styles/home.css';

const Home = () => {
  const { t } = useLang();

  return (
    <div className="home">
      <Navbar />
      <main className="home-content">
        <section className="intro">
          <p>{t("homePage.introParagraph")}</p>
        </section>

        <Globe />

        <section className="features">
          <p>
            <a href="/solutions" className="features-link">
              {t("homePage.solutionsLink")}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
