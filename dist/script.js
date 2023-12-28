import React, { useState, useEffect } from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18";
import { FontAwesomeIcon } from "https://esm.sh/@fortawesome/react-fontawesome@latest";
import { faArrows } from "https://esm.sh/@fortawesome/free-solid-svg-icons@latest";
import { faFreeCodeCamp } from "https://esm.sh/@fortawesome/free-brands-svg-icons";

const drumPadsBanks = [
[
// Bank 1
{ id: 'Heater-1', key: 'Q', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', label: 'Heater 1' },
{ id: 'Heater-2', key: 'W', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', label: 'Heater 2' },
{ id: 'Heater-3', key: 'E', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', label: 'Heater 3' },
{ id: 'Heater-4', key: 'A', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', label: 'Heater 4' },
{ id: 'Clap', key: 'S', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', label: 'Clap' },
{ id: 'Open-HH', key: 'D', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', label: 'Open-HH' },
{ id: 'Kick-n\'-Hat', key: 'Z', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', label: 'Kick-n\'-Hat' },
{ id: 'Kick', key: 'X', audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', label: 'Kick' },
{ id: 'Closed-HH', key: 'C', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', label: 'Closed-HH' }],

[
// Bank 2
{ id: 'Chord-1', key: 'Q', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', label: 'Chord-1' },
{ id: 'Chord-2', key: 'W', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', label: 'Chord-2' },
{ id: 'Chord-3', key: 'E', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', label: 'Chord 3' },
{ id: 'Shaker', key: 'A', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', label: 'Shaker' },
{ id: 'Open-HH', key: 'S', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3', label: 'Open-HH' },
{ id: 'Closed-HH', key: 'D', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3', label: 'Closed-HH' },
{ id: 'Punchy-Kick', key: 'Z', audio: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', label: 'Punchy-Kick' },
{ id: 'Side-Stick', key: 'X', audio: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', label: 'Side-Stick' },
{ id: 'Snare', key: 'C', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', label: 'Snare' }]];




const App = () => {
  const [powerOn, setPowerOn] = useState(true);
  const [bankOn, setBankOn] = useState(false);
  const [display, setDisplay] = useState('');
  const [clickedPad, setClickedPad] = useState(null);
  const [volume, setVolume] = useState(0.3);
  const [currentBank, setCurrentBank] = useState(0);

  const drumPads = drumPadsBanks[currentBank];

  const playAudio = (audioURL, label, padId) => {
    if (powerOn) {
      setDisplay(label);
      setClickedPad(padId);

      const audio = new Audio(audioURL);
      audio.volume = volume;
      audio.onended = () => setClickedPad(null);
      audio.play();
    }
  };

  const handleKeyPress = event => {
    const drumPad = drumPads.find(pad => pad.key === event.key.toUpperCase());
    if (drumPad && powerOn) {
      playAudio(drumPad.audio, drumPad.label, drumPad.id);
    }
  };

  const handleVolumeChange = event => {
    if (powerOn) {
      const newVolume = parseFloat(event.target.value);
      setDisplay('Volume: ' + newVolume * 100);
      setVolume(newVolume);
    }
  };

  const togglePower = () => {
    setPowerOn(!powerOn);
    setDisplay(powerOn ? 'Power Off' : '');
  };

  const toggleBank = () => {
    if (powerOn) {
      const nextBank = bankOn ? 0 : 1;
      setCurrentBank(nextBank);
      setDisplay(bankOn ? 'Heater Kit' : 'Smooth Piano Kit');
      setBankOn(!bankOn);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [powerOn, drumPads]);

  return /*#__PURE__*/(
    React.createElement("div", { class: "inner-container", id: "drum-machine" }, /*#__PURE__*/
    React.createElement("div", { class: "pad-bank" },
    drumPads.map((pad) => /*#__PURE__*/
    React.createElement("div", {
      key: pad.id,
      className: "drum-pad",
      style: {
        backgroundColor: clickedPad === pad.id ? 'orange' : 'gray',
        marginTop: clickedPad === pad.id ? '13px' : '10px',
        boxShadow: clickedPad === pad.id ? 'orange 0px 3px' : '3px 3px 5px black',
        height: clickedPad === pad.id ? '77px' : '' },

      id: pad.id,
      onClick: () => playAudio(pad.audio, pad.label, pad.id) },

    pad.key, /*#__PURE__*/
    React.createElement("audio", { className: "clip", id: pad.key, src: pad.audio })))), /*#__PURE__*/



    React.createElement("div", { class: "logo" }, /*#__PURE__*/
    React.createElement("div", { class: "inner-logo " }, "FCC\xA0"), /*#__PURE__*/
    React.createElement("i", { class: "inner-logo" }, /*#__PURE__*/
    React.createElement(FontAwesomeIcon, { icon: faFreeCodeCamp }))), /*#__PURE__*/


    React.createElement("div", { class: "controls-container" }, /*#__PURE__*/
    React.createElement("div", { class: "control" }, /*#__PURE__*/
    React.createElement("p", null, "Power"), /*#__PURE__*/
    React.createElement("div", { class: "select" }, /*#__PURE__*/
    React.createElement("div", {
      class: "inner",
      style: { float: powerOn ? 'right' : 'left' },
      onClick: togglePower }))), /*#__PURE__*/


    React.createElement("p", { id: "display" }, display), /*#__PURE__*/
    React.createElement("div", { class: "volume-slider" }, /*#__PURE__*/
    React.createElement("input", {
      max: "1",
      min: "0",
      step: "0.01",
      type: "range",
      value: volume,
      onChange: handleVolumeChange }), /*#__PURE__*/

    React.createElement("div", { class: "control" }, /*#__PURE__*/
    React.createElement("p", null, "Bank"), /*#__PURE__*/
    React.createElement("div", { class: "select" }, /*#__PURE__*/
    React.createElement("div", {
      class: "inner",
      style: { float: bankOn ? 'right' : 'left' },
      onClick: toggleBank })))))));








};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));