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
                  </div>
                  <div className="containerDiv">
                     <h3> Podcast Planner - Start Listening Today! </h3>
                     <p className="junoMade">Podcast Planner Made by <span><a href="https://github.com/nkanigsberg">Nathan Kanigsberg</a></span>, <span><a href="https://github.com/pfreemanc">Paige Freeman-Cyopeck</a></span>, <span><a href="https://github.com/redawaseem">Reda Waseem</a></span> & <span><a href="https://github.com/jalexgould">Alex Gould</a></span> at <span><a href="https://junocollege.com/">Juno College 2020</a></span></p>
                  </div>
               </div>
            </footer>
      )
   }
}

export default Footer; 