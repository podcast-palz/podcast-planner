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
                  <div className="wrapper">
                     <h3>Podcast Planner</h3>
                  </div>
                  <div className="junoMade">
                     <div className="wrapper">
                        <p>Created at <a href="https://junocollege.com/">Juno College</a> by</p>
                        <ul className="creators">
                           <li>
                              <a href="https://github.com/nkanigsberg">Nathan Kanigsberg</a>
                           </li>
                           <li>
                              <a href="https://github.com/pfreemanc">Paige Freeman-Cyopeck</a>
                           </li>
                           <li>
                              <a href="https://github.com/redawaseem">Reda Waseem</a>
                           </li>
                           <li>
                              <a href="https://github.com/jalexgould">Alex Gould</a>
                           </li>
                        </ul>
                        <p>© Copyright 2020</p>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      )
   }
}

export default Footer; 