import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Globe from '../../components/Globe/Globe';
import { useLang } from '../../components/Context/LangContext'; // Import the global language context
import '../../components/styles/home.css';

const Home = () => {
  const { language } = useLang();

  // Inline translation dictionary for this page
  const text = {
    en: {
      introParagraph:
        `Explore real-time global problems on our interactive globe and join our mission to spread love by solving one another's problems, inspired by Jesus's teachings of love. "A new command I give you: Love one another. As I have loved you, so you must love one another." - John 13:34. A simple click on the blinking beacon "problem alert" on the globe not only zooms into the precise longitude and latitude of the specific place but also provides detailed information about the specific problem and location, down to the neighborhood experiencing the crisis.`,
      solutionsLink: "Discover innovative solutions addressing global problems."
    },
    ko: {
      introParagraph:
        `인터랙티브 지구본에서 실시간 글로벌 문제를 살펴보고, 서로의 문제를 사랑으로 해결하자는 사명에 동참하세요. 예수님의 사랑 가르침에서 영감을 받은 이 메시지: "새 계명을 너희에게 주노니 서로 사랑하라. 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라." (요한복음 13:34)을 실천합시다. 지구본에 깜박이는 "문제 알림"에 간단히 클릭하면 해당 장소의 위도와 경도로 확대될 뿐 아니라, 위기에 처한 지역과 구체적인 문제에 대한 자세한 정보를 볼 수 있습니다.`,
      solutionsLink: "글로벌 문제에 대응하는 혁신적인 해결책을 만나보세요."
    }
  };

  // Helper function to retrieve text based on current language
  const t = (key) => text[language][key];

  return (
    <div className="home">
      <Navbar />
      <main className="home-content">
        <section className="intro">
          <p>{t("introParagraph")}</p>
        </section>

        <Globe />

        <section className="features">
          <p>
            <a href="/solutions" className="features-link">
              {t("solutionsLink")}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
