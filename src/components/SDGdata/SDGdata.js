// src/components/SDGdata/SDGdata.js

import React from 'react';
import '../styles/SDGdata.css';

/**
 * SDGdata.js
 *
 * This file contains the complete data sources and visualizations information 
 * for TA AI’s Role: Data and Resources Provision. It showcases the text
 * and references exactly as provided, but with images now linked in CSS
 * via background-image for each corresponding class.
 */

const SDGdata = () => {
  return (
    <div className="sdgdata-container">
      {/* Section 1: Latest Data on Poverty */}
      <section className="sdgdata-section">
        <h2 className="sdgdata-heading">
          Here is the latest data on poverty rates across various countries.
        </h2>

        {/* Instead of <img>, use a <div> referencing background-image in CSS */}
        <div
          className="sdgdata-image sdgdata-image-yarn"
          role="img"
          aria-label="Graph of Poverty Rates 2024"
        ></div>

        <p className="sdgdata-paragraph">
          Poverty remains a significant global challenge, with recent data highlighting
          disparities across different regions and countries. As of 2024, approximately
          44% of the world's population—around 3.5 billion people—live on less than
          $6.85 per day, a poverty line relevant for upper-middle-income countries. This
          figure has remained relatively unchanged since the 1990s, largely due to
          population growth.
        </p>
        <p className="sdgdata-ref">World Bank</p>

        <p className="sdgdata-paragraph">
          In low-income countries, poverty rates have worsened compared to pre-pandemic
          levels. The COVID-19 pandemic, coupled with subsequent economic shocks such as
          inflationary pressures following geopolitical conflicts, has hindered recovery
          efforts in these nations. Notably, the world's 26 poorest countries are
          experiencing their most challenging financial situation since 2006, with
          debt-to-GDP ratios reaching an 18-year high of 72%. Half of these countries are
          either in debt distress or at high risk of it.
        </p>
        <p className="sdgdata-ref">Reuters</p>

        <p className="sdgdata-paragraph">
          Sub-Saharan Africa and South Asia are home to the majority of individuals living
          in extreme poverty. A recent report indicates that over 1 billion people live in
          acute poverty, with more than half being children. Nearly 40% of these individuals
          reside in conflict-affected and fragile countries, underscoring the complex
          interplay between poverty and instability.
        </p>
        <p className="sdgdata-ref">AP News</p>

        <p className="sdgdata-paragraph">
          Efforts to combat poverty are further complicated by the varying definitions and
          thresholds used to measure it. The World Bank has updated its global poverty lines
          to reflect changes in the cost of living, setting the extreme poverty line at
          $2.15 per person per day. However, many countries also use national poverty lines,
          which can differ significantly, making cross-country comparisons challenging.
        </p>
        <p className="sdgdata-ref">Wikipedia</p>

        <p className="sdgdata-paragraph">
          Addressing global poverty requires a multifaceted approach, including economic
          development, improved governance, conflict resolution, and targeted social
          programs. The persistence of poverty in certain regions highlights the need for
          sustained international cooperation and innovative strategies to uplift the most
          vulnerable populations.
        </p>
        <h3 className="sdgdata-subheading">
          Recent Reports Highlight Global Poverty Challenges
        </h3>
        <p className="sdgdata-ref">AP News<br />
          More than 1 billion people live in acute poverty. Half are children and many in conflict zones<br />
          83 days ago
        </p>
        <p className="sdgdata-ref">
          Reuters<br />
          World Bank says 26 poorest nations in worst financial shape since 2006<br />
          87 days ago
        </p>
        <h4 className="sdgdata-small-heading">Sources</h4>
      </section>

      {/* Section 2: Visualization on Education and Poverty */}
      <section className="sdgdata-section">
        <h2 className="sdgdata-heading">
          Access this visualization showing the correlation between education levels
          and poverty reduction.
        </h2>

        <div
          className="sdgdata-image sdgdata-image-educdist2014"
          role="img"
          aria-label="Correlation: Education and Poverty"
        ></div>

        <p className="sdgdata-paragraph">
          Education plays a pivotal role in alleviating poverty, with numerous studies
          highlighting a strong inverse relationship between educational attainment and
          poverty rates. Individuals with higher levels of education are less likely to
          experience poverty, as education enhances employment opportunities and earning
          potential.
        </p>
        <p className="sdgdata-paragraph">
          For instance, data from the U.S. Census Bureau indicates that in 2014, the poverty
          rate for individuals aged 25 and older without a high school diploma was 29%,
          compared to only 5% for those with a bachelor's degree or higher.
        </p>
        <p className="sdgdata-ref">Poverty and Inequality Research Center</p>

        <p className="sdgdata-paragraph">
          Visualizations further illustrate this correlation. An analysis using R and Tableau
          demonstrated a strong positive relationship between poverty rates and the number of
          individuals without a high school diploma across U.S. counties. The correlation
          coefficient was found to be close to 1, indicating that as the number of individuals
          without a high school diploma increases, so does the poverty rate.
        </p>
        <p className="sdgdata-ref">GitHub</p>

        <p className="sdgdata-paragraph">
          Additionally, global data visualizations reveal that regions with higher educational
          attainment tend to have lower poverty rates. For example, a visualization from Our
          World in Data shows that countries with higher average years of schooling have a
          smaller share of the population living below the poverty line.
        </p>
        <p className="sdgdata-ref">Our World In Data</p>

        <p className="sdgdata-paragraph">
          These visualizations underscore the critical role of education in poverty reduction,
          emphasizing the need for policies that enhance access to quality education as a means
          to combat poverty effectively.
        </p>
        <h3 className="sdgdata-subheading">
          Visualizing the Link Between Education and Poverty
        </h3>
        <p className="sdgdata-ref">
          Our World In Data<br />
          Share in poverty vs. educational attainment - Our World in Data
          <br />
          GitHub<br />
          angelahrtn/Poverty-Analysis-in-the-US-using-R-and-Tableau<br />
          Poverty and Inequality Research Center<br />
          How does level of education relate to poverty?
        </p>
        <h4 className="sdgdata-small-heading">Sources</h4>
        <p className="sdgdata-paragraph">
          How does level of education relate to poverty?<br />
          Official data breakdown<br />
          The Census Bureau reports poverty rates by educational attainment for people aged
          25 and older. In 2014, the overall poverty rate for people aged 25 and older was 12%.
          The poverty rates by work experience for that age group ranged from 5% to 29%.
        </p>
        <ul className="sdgdata-list">
          <li>5% for people with a bachelor’s degree or higher</li>
          <li>10% for people with some college but no degree</li>
          <li>14% for people with a high school diploma and no college</li>
          <li>29% for people with no high school diploma</li>
        </ul>
        <p className="sdgdata-paragraph">
          By that measure, in 2014 those who had no high school diploma comprise a far greater
          share of the population in poverty than their share of the general population and
          those with a high school diploma and no college comprise are overrepresented to a
          lesser degree. Those with some college but no degree comprise a somewhat lesser
          share of the population in poverty than their share of the general population and
          those with a bachelor’s degree or higher are underrepresented to a much greater
          degree.
        </p>
        <p className="sdgdata-ref">
          Source:<br />
          DeNavas-Walt, Carmen and Bernadette D. Proctor, Income and Poverty in the United
          States: 2014 U.S. Census Bureau. Current Population Reports P60-252, U.S. Government
          Printing Office, Washington, DC, 2015. (PDF) Accessed 10/19/2015
        </p>
      </section>

      {/* Section 3: Reports on Successful Poverty Alleviation */}
      <section className="sdgdata-section">
        <h2 className="sdgdata-heading">
          Here are reports on successful poverty alleviation programs implemented
          in different regions.
        </h2>

        <div
          className="sdgdata-image sdgdata-image-download1"
          role="img"
          aria-label="China's Targeted Poverty Alleviation"
        ></div>

        <p className="sdgdata-paragraph">
          Several regions have implemented successful poverty alleviation programs that
          have significantly improved the livelihoods of their populations. Here are
          some notable examples:
        </p>
        <h3 className="sdgdata-subheading">China's Targeted Poverty Alleviation</h3>
        <p className="sdgdata-paragraph">
          China has lifted over 850 million people out of poverty between 1981 and 2013,
          reducing the percentage of people living under $1.90 per day from 88% to less
          than 2%. This achievement is attributed to tailored programs that cater to the
          unique needs of targeted groups, focusing on economic development, education,
          and infrastructure improvements.
        </p>
        <p className="sdgdata-ref">Borgen Project</p>

        <h3 className="sdgdata-subheading">Pakistan's Ehsaas Programme</h3>
        <div
          className="sdgdata-image sdgdata-image-ehsaas"
          role="img"
          aria-label="Pakistan Ehsaas Programme"
        ></div>
        <p className="sdgdata-paragraph">
          Launched in 2019, the Ehsaas Programme is a comprehensive social safety initiative
          aimed at reducing poverty and inequality in Pakistan. It includes cash transfers,
          scholarships, and nutrition support. The program has been recognized globally for
          its impact, with the World Bank doubling its assistance after observing its progress.
        </p>
        <p className="sdgdata-ref">Wikipedia</p>

        <h3 className="sdgdata-subheading">Village Enterprise in East Africa</h3>
        <div
          className="sdgdata-image sdgdata-image-download2"
          role="img"
          aria-label="Village Enterprise in East Africa"
        ></div>
        <p className="sdgdata-paragraph">
          Operating in countries like Uganda and Kenya, Village Enterprise implements a
          graduation model to move individuals out of extreme poverty. The program provides
          participants with seed capital, training, and mentorship to start sustainable
          businesses. Rigorous evaluations have demonstrated its effectiveness in improving
          income and savings among the ultra-poor.
        </p>
        <p className="sdgdata-ref">Village Enterprise</p>

        <h3 className="sdgdata-subheading">Mexico's Oportunidades Program</h3>
        <div
          className="sdgdata-image sdgdata-image-nihms"
          role="img"
          aria-label="Mexico's Oportunidades Program"
        ></div>
        <p className="sdgdata-paragraph">
          Formerly known as Progresa, this conditional cash transfer program provides financial
          incentives to low-income families for meeting specific health and education
          requirements. It has been credited with reducing poverty and improving health and
          educational outcomes, serving as a model for similar programs worldwide.
        </p>
        <p className="sdgdata-ref">Wikipedia</p>

        <h3 className="sdgdata-subheading">Sauri Millennium Village in Kenya</h3>
        <div
          className="sdgdata-image sdgdata-image-download3"
          role="img"
          aria-label="Sauri Millennium Village Project"
        ></div>
        <p className="sdgdata-paragraph">
          Initiated in 2004, the Sauri Millennium Village project aimed to demonstrate how
          integrated interventions in agriculture, health, education, and infrastructure
          could achieve the Millennium Development Goals. The project led to improvements in
          crop yields, school attendance, and access to clean water, providing valuable
          insights into holistic approaches to poverty reduction.
        </p>
        <p className="sdgdata-ref">Wikipedia</p>

        <p className="sdgdata-paragraph">
          These programs highlight the importance of tailored, context-specific strategies
          in effectively addressing poverty and improving the quality of life for
          disadvantaged populations.
        </p>
      </section>
    </div>
  );
};

export default SDGdata;
