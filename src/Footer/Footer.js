import React, { Component } from 'react';
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";
import "./index.css";

class Footer extends Component {
   render() {
      return(
            <footer>
               <div className="footerBar">
               <div className="wrapper container">
                  <div>
                  <ScrollUpButton
                     StopPosition={0}
                     ShowAtPosition={130}
                     EasingType='easeOutCubic'
                     AnimationDuration={500}
                     ContainerClassName='ScrollUpButton__Container'
                     TransitionClassName='ScrollUpButton__Toggled'
                     style={{}}
                     ToggledStyle={{}}
                  /> 
                  </div>
                  <div className="containerDiv">
                     <p> Podcast Planner!  Start Lisening Today </p>
                     <p className="junoMade">Podcast Planner Made by Nathan Kanigsberg, Paige Freeman-Cyopeck, Reda Waseem, & Alex Gould at Juno College 2020 </p>
                  </div>
               </div>
               </div>
            </footer>
      )
   }
}

export default Footer; 