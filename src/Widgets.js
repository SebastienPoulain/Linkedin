import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>Nouvelles Linkedin</h2>
        <InfoIcon />
      </div>
      {newsArticle("React est au sommet", "Nouvelle populaire - 9099 lecteurs")}
      {newsArticle(
        "Coronavirus en chute libre",
        "Nouvelle populaire - 20232 lecteurs"
      )}
      {newsArticle("Tesla est au sommet", "Voitures - 300 lecteurs")}
      {newsArticle("Le prix des Bitcoins explose", "Crypto - 8000 lecteurs")}
      {newsArticle("Biden nouveau président", "USA - 123 lecteurs")}
      {newsArticle("Le Québec confiné", "Québec - 6503 lecteurs")}
      {newsArticle(
        "Réouverture des commerces non essentiels",
        "Québec - 23982 lecteurs"
      )}
    </div>
  );
}

export default Widgets;
